const { validate, generateError, savePhoto } = require('../../helpers');
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

        if (!(req.files && req.files.post_photo)) {
            throw generateError('Tienes que subir al menos una imagen', 400);
        }

        if (req.files.post_photo.length > 5) {
            throw generateError('No puedes subir más de 5 fotografías', 400);
        }
        console.log(req.files.post_photo.length > 5);
        //Recuperamos el id del usuario
        const idReqUser =
            '2'; /* cambiar cuando este los controllers de usuario a req.userAuth.id; */

        //Si nos indica el comentario, insertamos los datos en la base de datos
        const [{ insertId }] = await connection.query(
            `INSERT INTO post (authorComment, hashtag, createdAt, idUser)
            VALUES (?, ?, ?, ?)`,
            [authorComment, hashtag, new Date(), idReqUser]
        );

        //Añadimos en una variable los datos d elas fotos obtenidos de la request
        const postsPhotos = req.files.post_photo;

        //Creamos el array donde almacenaremos los nombres de las fotos una vez guardadas
        let photosName = [];

        //Ponemos un name a cada photo y guardamos cada foto en la carpeta static
        for (let i = 0; i < postsPhotos.length; i++) {
            console.log(postsPhotos[i].data);
            const photoName = await savePhoto(postsPhotos[i], 1);

            await connection.query(
                `INSERT INTO photo (name, idPost)
            VALUES (?,?)`,
                [photoName, insertId]
            );

            photosName.push(photoName);
        }

        res.send({
            status: 'Ok',
            message: 'Post creado con éxito!',
            data: { id: insertId, authorComment, hashtag, photosName },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newPost;
