const { validate, generateError } = require('../../helpers');
const getDB = require('../../db/getDB');
const { createComent } = require('../../repositories/comment-repositories');

const newComent = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Recuperamos los datos del body de la request
        const { body } = req.body;

        //Recuperamos el id del post
        const { idPost } = req.params;
        //Recuperamos el id del usuario
        console.log(req.params);
        /* const userId = req.userAuth.id; */
        const userId = 2;
        //Si nos indica el comentario, insertamos los datos en la base de datos y recuperamos el id del post
        const comment = await createComent(body, idPost, userId);

        console.log(comment);

        res.send({
            status: 'Ok',
            message: 'Comment creado con éxito!',
            data: { body },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newComent;
