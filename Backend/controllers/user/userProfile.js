const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');
const {
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const userProfile = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const token = req.headers.authorization;

        const { idUser } = req.params;

        const { search } = req.query;

        let user;
        if (!token) {
            [user] = await connection.query(
                `SELECT id, name, username, email, lastname, avatar, bio, privacy, url FROM user WHERE id = ? AND privacy = 'public'`,
                [idUser]
            );

            if (user.length === 0) {
                throw generateError(
                    'No existe el usuario que estás buscando o no tienes permisos para ver su perfil.',
                    404
                );
            }
        } else {
            [user] = await connection.query(
                `SELECT id, name, username, email, lastname, avatar, bio, privacy, url FROM user WHERE id = ?`,
                [idUser]
            );
        }

        if (user.length === 0) {
            throw generateError(
                'No existe el usuario que estás buscando.',
                404
            );
        }

        let userPosts;

        if (search) {
            [userPosts] = await connection.query(
                `SELECT id, authorComment, hashtag FROM post
                    WHERE (idUser = ?) AND (authorComment LIKE ? OR hashtag LIKE ?)
                    ORDER BY createdAt DESC`,
                [idUser, `%${search}%`, `%${search}%`]
            );
        } else {
            [userPosts] = await connection.query(
                `SELECT id, authorComment, hashtag FROM post
                    WHERE idUser = ? ORDER BY createdAt DESC`,
                [idUser]
            );
        }

        const postsInfo = [];

        for (let i = 0; i < userPosts.length; i++) {
            const photos = await postPhotos(userPosts[i].id);

            const comments = await postComments(userPosts[i].id);

            const likes = await likesCounter(userPosts[i].id);

            postsInfo.push({ ...userPosts[i], photos, comments, likes });
        }

        user.push(postsInfo);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userProfile;
