const getDB = require('../../db/getDB');

const getPosts = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Recibir los query params para filtrar los post que se quieren monstrar
        const { search, direction } = req.query;

        //Array de opciones válidas para la dirección en la que se ordenan los campos
        const validDirectionOptions = ['DESC', 'ASC'];

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        //Realizar consulta a la Base de Datos para recuperar los post
        let posts;

        //si existe 'search', la consulta se hará añadiendo la bíusqueda
        if (search) {
            [posts] = await connection.query(
                `
            SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
            FROM post INNER JOIN user ON post.idUser = user.id
            WHERE authorComment LIKE ? OR hashtag LIKE ?
            ORDER BY post.createdAt ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [posts] = await connection.query(`
            SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
            FROM post INNER JOIN user ON post.idUser = user.id
            ORDER BY post.createdAt ${orderDirection}`);
        }

        //Array que devulverá la respuesta
        const postsInfo = [];

        //Cada post tiene sus imagenes y comentarios-> recorrer con un bucle los post recibidos y buscar sus fotos y comentarios
        for (let i = 0; i < posts.length; i++) {
            const [photos] = await connection.query(
                `SELECT name FROM photo
            WHERE idPost = ?`,
                [posts[i].idPost]
            );

            const [comments] = await connection.query(
                `SELECT comment.body FROM comment
                WHERE idPost = ?`,
                [posts[i].idPost]
            );

            //añadimos los datos recuperados al array que devolverá la respuesta
            postsInfo.push({ ...posts[i], photos, comments });
        }

        //Respuesta con la lista de post y sus respectivos comentarios y fotos

        res.send({
            status: 'ok',
            postsInfo: postsInfo,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPosts;
