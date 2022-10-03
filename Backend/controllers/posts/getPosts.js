const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');

const {
    getPublicPostsBySearch,
    getPublicPostsByOrderDirection,
    getPostsBySearch,
    getPostsByOrderDirection,
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const getPosts = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        //Recibir los query params para filtrar los post que se quieren monstrar
        const { search } = req.query;

        //Realizar consulta a la Base de Datos para recuperar los post
        let posts;
        if (!token) {
            if (search) {
                posts = await getPublicPostsBySearch(search);
            } else {
                posts = await getPublicPostsByOrderDirection();
            }
        } else {
            //si existe 'search', la consulta se hará añadiendo la bíusqueda
            if (search) {
                posts = await getPostsBySearch(search);
            } else {
                posts = await getPostsByOrderDirection();
            }
        }

        if (posts.length === 0) {
            throw generateError(
                'No hay ningun post relacionado con ese término que estás buscando'
            );
        }

        //Array que devolverá la respuesta
        const postsInfo = [];

        //Cada post tiene sus imagenes y comentarios-> recorrer con un bucle los post recibidos y buscar sus fotos y comentarios
        for (let i = 0; i < posts.length; i++) {
            const photos = await postPhotos(posts[i].idPost);

            const comments = await postComments(posts[i].idPost);

            const likes = await likesCounter(posts[i].idPost);

            //añadimos los datos recuperados al array que devolverá la respuesta
            postsInfo.push({ ...posts[i], photos, comments, likes });
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
