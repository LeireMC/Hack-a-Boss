const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');
const {
    postComments,
    postPhotos,
} = require('../../repositories/post-repositories');

const getFavorites = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperamos usuario
        const idUser = req.userAuth.id;

        //Recibir los query params para filtrar los post que se quieren monstrar
        const { search, direction } = req.query;

        //Array de opciones válidas para la dirección en la que se ordenan los campos
        const validDirectionOptions = ['DESC', 'ASC'];

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        //Recuperamos idFavorito, todo de post e id.user
        let favorites;

        if (search) {
            [favorites] = await connection.query(
                `
        SELECT p.authorComment, p.hashtag, p.idUser as idPostOwner, f.idPost, f.idUser FROM post p INNER JOIN favorite f ON p.id = f.idPost WHERE f.idUser=? AND p.authorComment LIKE ? OR p.hashtag LIKE ?
        ORDER BY p.createdAt ${orderDirection} `,
                [idUser, `%${search}%`, `%${search}%`]
            );
        } else {
            [favorites] = await connection.query(
                `
        SELECT p.authorComment, p.hashtag, p.idUser as idPostOwner, f.idPost, f.idUser FROM post p INNER JOIN favorite f ON p.id = f.idPost WHERE f.idUser=?
        ORDER BY p.createdAt ${orderDirection} `,
                [idUser]
            );
        }

        //Comprobamos que el usuario tiene post favoritos, sino lanzamos un error
        if (favorites.length < 1) {
            throw generateError(
                `No hay ningun post favorito asociado al usuario con id ${idUser}`,
                404
            );
        }

        //Array que devuelve la respuesta
        const favoritesList = [];

        //Recuperamos fotos y comentarios de cada post

        for (let i = 0; i < favorites.length; i++) {
            const [postOwnerInfo] = await connection.query(
                `SELECT name, username, lastname, privacy, avatar FROM user
            WHERE id = ?`,
                [favorites[i].idPostOwner]
            );
            console.log(postOwnerInfo);
            const photos = await postPhotos(favorites[i].idPost);

            const comments = await postComments(favorites[i].idPost);

            const likes = await likesCounter(favorites[i].idPost);

            //añadimos los datos recuperados al array favoritesList
            favoritesList.push({
                ...favorites[i],
                name: postOwnerInfo[0].name,
                lastname: postOwnerInfo[0].lastname,
                username: postOwnerInfo[0].username,
                avatar: postOwnerInfo[0].avatar,
                privacy: postOwnerInfo[0].privacy,
                comments: comments,
                photos: photos,
                likes: likes,
            });
        }

        //Respuesta con lista de favoritos, con los post, comentarios y fotos

        res.send({
            status: 'ok',
            data: favoritesList,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFavorites;
