const { token } = require('morgan');
const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const {
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const userProfile = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [[user]] = await connection.query(
            `SELECT id, name, username, email, lastname, avatar, bio, privacy, url FROM user WHERE id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError(
                'No existe el usuario que estás buscando.',
                404
            );
        }

        const [userPosts] = await connection.query(
            `SELECT id, authorComment, hashtag FROM post
            WHERE idUser = ?`,
            [idUser]
        );

        //Array que devolverá la respuesta
        const postsInfo = [user, userPosts];

        //Cada post tiene sus imagenes y comentarios-> recorrer con un bucle los post recibidos y buscar sus fotos y comentarios
        for (let i = 0; i < userPosts.length; i++) {
            const photos = await postPhotos(userPosts[i].id);

            const comments = await postComments(userPosts[i].id);

            //añadimos los datos recuperados al array que devolverá la respuesta
            postsInfo.push({ ...userPosts[i], photos, comments });
        }

        //Respuesta con la lista de post y sus respectivos comentarios y fotos

        res.send({
            status: 'ok',
            data: postsInfo,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userProfile;
