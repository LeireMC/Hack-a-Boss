const { deletePhoto, generateError } = require('../../helpers');
const {
    getPostById,
    postPhotos,
    deletePhotofromDB,
    deletePostfromDB,
} = require('../../repositories/post-repositories');

const deletePost = async (req, res, next) => {
    try {
        //recuperamos el id del post que queremos eliminar
        const { idPost } = req.params;
        let post;
        post = await getPostById(post, idPost); /* await connection.query(
            `
        SELECT * FROM post where id=?`,
            [idPost]
        ); */

        //Si no hay ningun post asociado a ese id, se lanza error
        if (post.length === 0) {
            throw generateError('No existe ningun post asociado a ese id');
        }

        //Si exite el post, primero eliminamos las fotos del post
        //Primero seleccionamos todas las fotos asociadas al post
        const photos = await postPhotos(idPost); /* await connection.query(
            `SELECT name FROM photo WHERE idPost = ?`,
            [idPost]
        ); */

        //Una vez seleccionadas, recorremos el array para acceder a cada nombre de la foto y borrarla del servidor
        for (let i = 0; i < photos.length; i++) {
            await deletePhoto(photos[i].name, 1);
        }

        //Eliminamos los campos de la foto de la base de datos
        await deletePhotofromDB(idPost);
        /*  await connection.query(`DELETE FROM photo WHERE idPost = ?`, [idPost]); */

        //Eliminamos el post de la base de datos
        await deletePostfromDB(idPost);
        /* await connection.query(`DELETE FROM post WHERE id = ?`, [idPost]); */

        res.send({
            status: 'ok',
            message: `Post con id ${idPost} eliminado con éxito!`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deletePost;
