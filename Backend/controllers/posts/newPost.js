const { validate, generateError } = require('../../helpers');
const { newPostSchema } = require('../../schemas/newPostSchema');
const {
    createPost,
    insertPhoto,
    insertLike,
} = require('../../repositories/post-repositories');

const newPost = async (req, res, next) => {
    try {
        console.log(req.body);
        //Validar los datos recibidos por el body
        await validate(newPostSchema, req.body);

        //Recuperamos los datos del body de la request
        const { authorComment, hashtag } = req.body;

        if (hashtag && hashtag.split(',').length > 10) {
            throw generateError('No puedes incluir más de 10 hashtags', 400);
        }

        console.log(req.files);

        if (!(req.files && req.files.post_photo)) {
            throw generateError('Tienes que subir al menos una imagen', 400);
        }

        if (req.files.post_photo.length > 5) {
            throw generateError('No puedes subir más de 5 fotografías', 400);
        }
        //Recuperamos el id del usuario

        const idUser = req.userAuth.id;

        //Si nos indica el comentario, insertamos los datos en la base de datos y recuperamos el id del post
        const postId = await createPost(authorComment, hashtag, idUser);

        //Añadimos en una variable los datos de las fotos obtenidos de la request
        let postPhotos;

        if (Array.isArray(req.files.post_photo)) {
            postPhotos = req.files.post_photo;
        } else {
            postPhotos = [req.files.post_photo];
        }

        //Renombramos y guardamos las fotos en el servidor y las añadimos a la BBDD
        const photosNames = await insertPhoto(postPhotos, postId);

        //Añadimos el valor false a la tabla like

        await insertLike(postId, idUser);

        res.send({
            status: 'Ok',
            message: 'Post creado con éxito!',
            data: {
                id: postId,
                authorComment,
                hashtag,
                photosNames,
                liked: false,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newPost;
