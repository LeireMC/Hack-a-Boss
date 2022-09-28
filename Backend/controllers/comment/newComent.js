const { validate, generateError } = require('../../helpers');
const getDB = require('../../db/getDB');
const {
    createComent,
    selectCommentById,
} = require('../../repositories/comment-repositories');

const newComent = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Recuperamos los datos del body de la request
        const { body } = req.body;
        if (!body) {
            throw generateError('No has introducido ningún comentario', 400);
        }

        //Recuperamos el id del post
        const { idPost } = req.params;

        //Recuperamos el id del usuario
        const userId = req.userAuth.id;

        //Si nos indica el comentario, insertamos los datos en la base de datos y recuperamos el id del post
        const commentId = await createComent(body, idPost, userId);

        const comment = await selectCommentById(commentId);

        res.send({
            status: 'Ok',
            message: 'Comment creado con éxito!',
            data: comment,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newComent;
