const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getFavorites = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperamos usuario
        const idUser = req.userAuth.id;

        //Recuperamos idFavorito, todo de post e id.user
        let favorites;

        [favorites] = await connection.query(
            `
        SELECT p.authorComment, p.hashtag, p.idUser as idPostOwner, f.idPost, f.idUser FROM post p INNER JOIN favorite f ON p.id = f.idPost WHERE f.idUser=?
            `,
            [idUser]
        );

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
            const [photos] = await connection.query(
                `SELECT name FROM photo
            WHERE idPost = ?`,
                [favorites[i].idPost]
            );

            const [comments] = await connection.query(
                `SELECT comment.body FROM comment
                WHERE idPost = ?`,
                [favorites[i].idPost]
            );

            //añadimos los datos recuperados al array favoritesList
            favoritesList.push({ ...favorites[i], comments, photos });
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
