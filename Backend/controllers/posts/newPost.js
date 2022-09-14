const validate = require('../../helpers');
const getDB = require('../../db/getDB');
const { newPostSchema } = require('../../schemas/newPostSchema');

const newPost = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        //Recuperamos los datos del body de la request
        const { authorComments, hastagsh } = req.body;

        //Validar los datos recibidos por el body
        await validate(newPostSchema, req.body);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newPost;
