const getDB = require('../db/getDB');

async function createComent(body, idPost, userId) {
    let connection;

    connection = await getDB();

    const [{ insertComment }] = await connection.query(
        `INSERT INTO comment (body, createdAt, idUser, idPost)
            VALUES (?, ?, ?, ?)`,
        [body, new Date(), userId, idPost]
    );

    return insertComment;
}

module.exports = { createComent };
