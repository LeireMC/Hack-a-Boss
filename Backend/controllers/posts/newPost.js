const { validate, generateError } = require('../../helpers');
const getDB = require('../../db/getDB');
const { newPostSchema } = require('../../schemas/newPostSchema');

const newPost = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Recuperamos los datos del body de la request
        const { authorComment, hashtag } = req.body;

        //Validar los datos recibidos por el body
        await validate(newPostSchema, req.body);

        if (!authorComment) {
            throw generateError(
                'Debes escribir un comentario sobre tu fotografía',
                400
            );
        }

        //Recuperamos el id del usuario
        const idReqUser = req.userAuth.id;

        //Si nos indica el comentario, insertamos los datos en la base de datos
        const [{ insertId }] = await connection.query(
            `INSERT INTO post (authorComment, hashtag, createdAt, idUser)
            VALUES (?, ?, ?, ?, ?)`,
            [authorComment, hashtag, new Date(), idReqUser]
        );

        res.send({
            status: 'Ok',
            message: 'Post creado con éxito!',
            data: { id: insertId, authorComment, hashtag },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newPost;
