const {
    checkFollower,
    unselectFollower,
    selectFollower,
} = require('../../repositories/followers-repositories');

const selectFollowerUSer = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere marcar un follower
        const userId = req.userAuth.id;

        //Recuperamos el id del usuario que será marcado como follower  ;
        const { followerId } = req.params;

        console.log(followerId);

        //Miramos en la base de datos si este usuario ya figura en los seguidos
        const checkFollow = await checkFollower(followerId, userId);

        //Si no lo sigue, lo añadimos
        if (checkFollow.length === 0) {
            await selectFollower(followerId, userId);

            res.send({
                status: 'ok',
                message: 'Has empezado a seguir a este usuario!',
                data: { userId, followerId, follow: true },
            });
        } else {
            //Si ya lo seguia, lo desmarcamos
            await unselectFollower(followerId, userId);
            res.send({
                status: 'ok',
                message: 'Se ha eliminado este usuario de tus seguidos!',
                data: { userId, followerId, follow: false },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = selectFollowerUSer;
