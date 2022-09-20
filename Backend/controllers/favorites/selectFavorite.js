const {
    checkFavorites,
    deleteFavoritePost,
    insertFavoritePost,
} = require('../../repositories/favorites-repositories');

const selectFavorite = async (req, res, next) => {
    try {
        //recuperamos el id del usuario que quiere marcar favorito
        const userId = req.userAuth.id;
        console.log(req.userAuth.id);
        //recuperamos el id del post que será marcado como favorito
        const { postId } = req.params;

        //Miramos en la base de datos si este post tiene o no like
        const checkFavorite = await checkFavorites(postId, userId);

        //Si no es favorito, lo añadimos
        if (checkFavorite.length === 0) {
            await insertFavoritePost(postId, userId);

            res.send({
                status: 'ok',
                message: 'Favorito añadido con exito!',
                data: { userId, postId, favorite: true },
            });
        } else {
            //Si es favorito lo desmarcamos
            await deleteFavoritePost(postId, userId);
            res.send({
                status: 'ok',
                message: 'Se ha eliminado este post de tus favoritos!',
                data: { userId, postId, favorite: false },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = selectFavorite;
