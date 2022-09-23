const { generateError } = require('../../helpers');

const {
    checkLikes,
    userLikes,
    userUnlikes,
    userLikesFirst,
    likesCounter,
} = require('../../repositories/likes-repositories');
const { getPostById } = require('../../repositories/post-repositories');

const getNumLikes = async (req, res, next) => {
    try {
        //recuperamos el id del post
        const { postId } = req.params;

        //comprobamos que existe el post del que se quiere recuperar los likes
        const post = await getPostById(postId);

        if (post.length === 0) {
            throw generateError(`El post con id ${postId} no existe`);
        }

        //Si existe, recuperamos le numero de likes del post

        const numLikes = await likesCounter(postId);

        res.send({
            status: 'ok',
            data: numLikes,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNumLikes;
