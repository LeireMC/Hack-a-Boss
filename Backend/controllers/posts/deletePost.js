const bcrypt = require('bcrypt');

const { deletePhoto, generateError } = require('../../helpers');
const {
    postPhotos,
    deletePhotofromDB,
    deletePostfromDB,
    getPostByIdandUser,
    selectPassword,
} = require('../../repositories/post-repositories');

const deletePost = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere eliminar el post
        const idUser = req.userAuth.id;
        //recuperamos el id del post que queremos eliminar
        const { idPost } = req.params;

        //recuperamos la contraseña del usuario que quiere eliminar el post
        const { password } = req.body;

        const post = await getPostByIdandUser(idPost, idUser);

        //Si no hay ningun post asociado a ese id, se lanza error
        if (post.length === 0) {
            throw generateError(
                'No eres el propietario del post a eliminar o el post no existe'
            );
        }

        //Se comprueba que la contraseña introducida es la correcta
        if (!password) {
            throw generateError(
                'Debes indicar tu password para poder borrar el post.',
                400
            );
        }
        const user = await selectPassword(idUser);

        const isValid = await bcrypt.compare(password, user[0].password);

        if (!isValid) {
            throw generateError(
                'La contraseña es incorrecta. No estás autorizado para eliminar este post.',
                401
            );
        }

        //Si exite el post y la contraseña es correcta, primero eliminamos las fotos del post
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
