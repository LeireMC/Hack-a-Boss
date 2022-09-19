const { token } = require('morgan');
const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const userProfile = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [[user]] = await connection.query(
            `SELECT id, name, username, email, lastname, avatar, bio, privacy, url FROM user WHERE id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError(
                'No existe el usuario que estás buscando.',
                404
            );
        }

        res.send({
            status: 'Ok',
            data: user,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userProfile;
