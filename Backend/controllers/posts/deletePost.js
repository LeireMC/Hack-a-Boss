const { deletePhoto, generateError } = require('../../helpers');
const {
    getPostByIdandUser,
    postPhotos,
    deletePhotofromDB,
    deletePostfromDB,
} = require('../../repositories/post-repositories');

const deletePost = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere eliminar el post
        const idUser = 2; /* req.userAuth.id */

        //recuperamos el id del post que queremos eliminar
        const { idPost } = req.params;

        const post = await getPostByIdandUser(idPost, idUser);

        //Si no hay ningun post asociado a ese id, se lanza error
        if (post.length === 0) {
            throw generateError(
                'No eres el propietario del post a eliminar o el post no existe'
            );
        }

        //Si exite el post, primero eliminamos las fotos del post
        //Primero seleccionamos todas las fotos asociadas al post
        const photos = await postPhotos(idPost);

        //Una vez seleccionadas, recorremos el array para acceder a cada nombre de la foto y borrarla del servidor
        for (let i = 0; i < photos.length; i++) {
            await deletePhoto(photos[i].name, 1);
        }

        //Eliminamos los campos de la foto de la base de datos
        await deletePhotofromDB(idPost);

        //Eliminamos el post de la base de datos
        await deletePostfromDB(idPost);

        res.send({
            status: 'ok',
            message: `Post con id ${idPost} eliminado con éxito!`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deletePost;
