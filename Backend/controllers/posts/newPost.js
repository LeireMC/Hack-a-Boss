const { validate, generateError, savePhoto } = require('../../helpers');
const getDB = require('../../db/getDB');
const { newPostSchema } = require('../../schemas/newPostSchema');
const {
    createPost,
    insertPhoto,
} = require('../../repositories/post-repositories');

const newPost = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Validar los datos recibidos por el body
        await validate(newPostSchema, req.body);

        //Recuperamos los datos del body de la request
        const { authorComment, hashtag } = req.body;

        if (hashtag.split(',').length > 10) {
            throw generateError('No puedes incluir más de 10 hashtags', 400);
        }

        if (!(req.files && req.files.post_photo)) {
            throw generateError('Tienes que subir al menos una imagen', 400);
        }

        if (req.files.post_photo.length > 5) {
            throw generateError('No puedes subir más de 5 fotografías', 400);
        }
        //Recuperamos el id del usuario
        const userId =
            '2'; /* cambiar cuando este los controllers de usuario a req.userAuth.id; */

        //Si nos indica el comentario, insertamos los datos en la base de datos y recuperamos el id del post
        const postId = await createPost(authorComment, hashtag, userId);

        console.log(postId);
        //Añadimos en una variable los datos d elas fotos obtenidos de la request
        const postPhotos = req.files.post_photo;

        //Creamos el array donde almacenaremos los nombres de las fotos una vez guardadas
        /* let photosName = [];

        //Ponemos un name a cada photo y guardamos cada foto en la carpeta static
        for (let i = 0; i < postsPhotos.length; i++) {
            console.log(postsPhotos[i].data);
            const photoName = await savePhoto(postsPhotos[i], 1);

            await connection.query(
                `INSERT INTO photo (name, idPost)
            VALUES (?,?)`,
                [photoName, postId]
            );

            photosName.push(photoName);
        } */

        const photosNames = await insertPhoto(postPhotos, postId);
        console.log(photosNames);

        res.send({
            status: 'Ok',
            message: 'Post creado con éxito!',
            data: { id: postId, authorComment, hashtag, photosNames },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newPost;
