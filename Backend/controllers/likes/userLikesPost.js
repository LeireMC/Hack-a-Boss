const {
    checkLikes,
    userLikes,
    userUnlikes,
} = require('../../repositories/likes-repositories');

const userLikesPost = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere hacer like
        const userId = req.userAuth.id;

        //recuperamos el id del post
        const { postId } = req.params;

        //Miramos en la base de datos si este post tiene o no like
        const checkLike = await checkLikes(postId, userId);

        //Si no tiene like(0), lo cambiamos(1)
        if (checkLike[0].liked === 0) {
            await userLikes(postId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true },
            });
        } else {
            //Si tiene like(1), lo cambiamos(0)
            await userUnlikes(postId);
            res.send({
                status: 'ok',
                message: 'like borrado con exito!',
                data: { userId, postId, liked: false },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = userLikesPost;
