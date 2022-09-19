const {
    checkLikes,
    userLikes,
    userUnlikes,
    userLikesFirst,
} = require('../../repositories/likes-repositories');

const userLikesPost = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere hacer like
        const userId = req.userAuth.id;

        //recuperamos el id del post
        const { postId } = req.params;

        //Miramos en la base de datos si este post tiene o no like
        const checkLike = await checkLikes(postId, userId);

        console.log(checkLike.length === 0);

        //Si nunca le ha hecho like el usuario, creamos la fila correspondiente
        if (checkLike.length === 0) {
            await userLikesFirst(postId, userId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true },
            });
        }

        //Si no tiene like(0), lo cambiamos(1)
        else if (checkLike[0].liked === 0) {
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
