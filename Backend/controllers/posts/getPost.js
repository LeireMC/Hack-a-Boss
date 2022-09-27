const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');
const {
    getPostById,
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const getPost = async (req, res, next) => {
    try {
        //Recuperamos la id del post de los params
        const { idPost } = req.params;

        //Seleccionamos de la base de datos los datos del post

        let post;
        post = await getPostById(idPost);

        //Comprobamos que el post existe, sino lanzamos un error
        if (post.length < 1) {
            throw generateError('El post seleccionado no existe', 404);
        }

        //Seleccionamos las fotos asociadas a ese post
        const photos = await postPhotos(idPost);

        //Seleccionamos los comentarios asociados a ese post
        const comments = await postComments(idPost);

        //Seleccionamos el numero de likes correspondientes a ese post
        const likes = await likesCounter(idPost);
        //Creamos el array en el que devolveremos la respuesta
        const postInfo = [];

        //Pusheamos los datos del post junto a los de las fotos y los comentarios
        postInfo.push(...post, photos, comments, likes);

        //mandamos la respuesta
        res.send({ status: 'ok', data: postInfo });
    } catch (error) {
        next(error);
    }
};

module.exports = getPost;
