const { generateError } = require('../../helpers');

const {
    checkLikes,
    userLikes,
    userUnlikes,
    userLikesFirst,
    likesCounter,
} = require('../../repositories/likes-repositories');
const { getPostById } = require('../../repositories/post-repositories');

const userLikesPost = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere hacer like
        const userId = req.userAuth.id;

        //recuperamos el id del post
        const { postId } = req.params;

        //comprobamos que existe el post al que se quiere hacer like
        const post = await getPostById(postId);

        if (post.length === 0) {
            throw generateError('El post al que quieres dar like no existe');
        }

        //Miramos en la base de datos si este post tiene o no like
        const checkLike = await checkLikes(postId, userId);

        //Si nunca le ha hecho like el usuario, creamos la fila correspondiente
        if (checkLike.length === 0) {
            await userLikesFirst(postId, userId);

            const numLikes = await likesCounter(postId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true, numLikes },
            });
        }

        //Si no tiene like(0), lo cambiamos(1)
        else if (checkLike[0].liked === 0) {
            await userLikes(postId, userId);

            const numLikes = await likesCounter(postId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true, numLikes },
            });
        } else {
            //Si tiene like(1), lo cambiamos(0)
            await userUnlikes(postId, userId);

            const numLikes = await likesCounter(postId);
            res.send({
                status: 'ok',
                message: 'like borrado con exito!',
                data: { userId, postId, liked: false, numLikes },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = userLikesPost;
