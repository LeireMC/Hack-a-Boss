const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getPost = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperamos la id del post de los params
        const { idPost } = req.params;

        //Seleccionamos de la base de datos los datos del post

        const [post] = await connection.query(
            `SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
            FROM post INNER JOIN user ON (post.idUser = user.id)
            WHERE post.id = ?`,
            [idPost]
        );

        //Comprobamos que el post existe, sino lanzamos un error
        if (post.length < 1) {
            throw generateError('El post seleccionado no existe', 404);
        }

        //Seleccionamos las fotos asociadas a ese post
        const [photos] = await connection.query(
            `SELECT name FROM photo
            WHERE idPost = ?`,
            [idPost]
        );

        //Seleccionamos los comentarios asociados a ese post
        const [comments] = await connection.query(
            `SELECT comment.body FROM comment
            WHERE idPost = ?`,
            [idPost]
        );
        console.log(post, photos, comments);
        //Creamos el array en el que devolveremos la respuesta
        const postInfo = [];

        //Pusheamos los datos del post junto a los de las fotos y los comentarios
        postInfo.push(...post, photos, comments);
        console.log(postInfo, photos[0].name);

        //mandamos la respuesta
        res.send({ status: 'ok', postInfo: postInfo });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPost;
