const { token } = require('morgan');
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

        //Recibir los query params para filtrar los post que se quieren monstrar
        const { search, direction } = req.query;

        //Array de opciones válidas para la dirección en la que se ordenan los campos
        const validDirectionOptions = ['DESC', 'ASC'];

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

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
        console.log(user);
        if (user.length === 0) {
            throw generateError(
                'No existe el usuario que estás buscando.',
                404
            );
        }

        //Realizar consulta a la Base de Datos para recuperar los post
        let userPosts;

        //si existe 'search', la consulta se hará añadiendo la bíusqueda
        if (search) {
            [userPosts] = await connection.query(
                `SELECT id, authorComment, hashtag FROM post
                    WHERE idUser = ? AND authorComment LIKE ? OR hashtag LIKE ?
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

        //Array que devolverá la respuesta
        const postsInfo = [];

        //Cada post tiene sus imagenes y comentarios-> recorrer con un bucle los post recibidos y buscar sus fotos y comentarios
        for (let i = 0; i < userPosts.length; i++) {
            const photos = await postPhotos(userPosts[i].id);

            const comments = await postComments(userPosts[i].id);

            const likes = await likesCounter(userPosts[i].id);

            //añadimos los datos recuperados al array que devolverá la respuesta
            postsInfo.push({ ...userPosts[i], photos, comments, likes });
        }

        user.push(postsInfo);

        //Respuesta con la lista de post y sus respectivos comentarios y fotos

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
