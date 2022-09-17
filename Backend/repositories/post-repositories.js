const { validate, generateError, savePhoto } = require('../helpers');
const getDB = require('../db/getDB');
const { newPostSchema } = require('../schemas/newPostSchema');

async function createPost(authorComment, hashtag, userId) {
    let connection;

    connection = await getDB();

    const [{ insertId }] = await connection.query(
        `INSERT INTO post (authorComment, hashtag, createdAt, idUser)
            VALUES (?, ?, ?, ?)`,
        [authorComment, hashtag, new Date(), userId]
    );

    return insertId;
}

async function insertPhoto(postPhotos, postId) {
    let connection;

    connection = await getDB();

    //Creamos el array que devolverá los nombres de las fotos
    let photosNames = [];

    //Ponemos un name a cada photo y guardamos cada foto en la carpeta static
    for (let i = 0; i < postPhotos.length; i++) {
        console.log(postPhotos[i].data);
        const photoName = await savePhoto(postPhotos[i], 1);

        await connection.query(
            `INSERT INTO photo (name, idPost)
            VALUES (?,?)`,
            [photoName, postId]
        );

        photosNames.push(photoName);
    }

    return photosNames;
}

module.exports = { createPost, insertPhoto };
