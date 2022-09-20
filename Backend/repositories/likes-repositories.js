const getDB = require('../db/getDB');

//Función que nos dice si el post tiene like o no
async function checkLikes(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        //Verificamos que en la Base de Datos no hay ningun like asociado a ese post y ese user
        const [checkLike] = await connection.query(
            `
        SELECT * FROM likes WHERE idPost = ? AND idUser=?`,
            [postId, userId]
        );

        return checkLike;
    } finally {
        if (connection) connection.release();
    }
}

//Función que crea nueva fila para un primer like de un usuario a un post
async function userLikesFirst(postId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `INSERT INTO likes (idPost, liked, idUser)
        VALUES (?,?,?)`,
            [postId, 1, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que pone la propiedad liked de la tabla likes en true(1)
async function userLikes(postId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`UPDATE likes SET liked = 1 WHERE idPost=?`, [
            postId,
        ]);
    } finally {
        if (connection) connection.release();
    }
}

//Función que pone la propiedad liked de la tabla likes en false(0)
async function userUnlikes(postId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`UPDATE likes SET liked = 0 WHERE idPost=?`, [
            postId,
        ]);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { checkLikes, userLikes, userUnlikes, userLikesFirst };

