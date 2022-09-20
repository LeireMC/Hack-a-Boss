/* const getDB = require('../../db/getDB'); */

const {
    getPostsBySearch,
    getPostsByOrderDirection,
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const getPosts = async (req, res, next) => {
    try {
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
            posts = await getPostsBySearch(orderDirection, search);
        } else {
            posts = await getPostsByOrderDirection(orderDirection);
        }

        //Array que devolverá la respuesta
        const postsInfo = [];

        //Cada post tiene sus imagenes y comentarios-> recorrer con un bucle los post recibidos y buscar sus fotos y comentarios
        for (let i = 0; i < posts.length; i++) {
            const photos = await postPhotos(posts[i].idPost);

            const comments = await postComments(posts[i].idPost);

            //añadimos los datos recuperados al array que devolverá la respuesta
            postsInfo.push({ ...posts[i], photos, comments });
        }

        //Respuesta con la lista de post y sus respectivos comentarios y fotos

        res.send({
            status: 'ok',
            data: postsInfo,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getPosts;
