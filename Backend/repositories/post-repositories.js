const { savePhoto } = require('../helpers');
const getDB = require('../db/getDB');

//Función que añade a la tabla post los datos recibidos
async function createPost(authorComment, hashtag, userId) {
    let connection;
    try {
        connection = await getDB();

        const [{ insertId }] = await connection.query(
            `INSERT INTO post (authorComment, hashtag, createdAt, idUser)
                VALUES (?, ?, ?, ?)`,
            [authorComment, hashtag, new Date(), userId]
        );

        return insertId;
    } finally {
        if (connection) connection.release();
    }
}

//Función que guarda las fotos recibidas en el servidor y en la BBDD
async function insertPhoto(postPhotos, postId) {
    let connection;
    try {
        connection = await getDB();

        //Creamos el array que devolverá los nombres de las fotos
        let photosNames = [];
        console.log(postPhotos);
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
    } finally {
        if (connection) connection.release();
    }
}

async function insertLike(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO likes (liked, idPost, idUser)
                VALUES (?, ?, ?)`,
            [0, postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los post en base a una búsqueda
async function getPostsBySearch(posts, orderDirection, search) {
    let connection;
    try {
        connection = await getDB();

        [posts] = await connection.query(
            `
        SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
        FROM post INNER JOIN user ON post.idUser = user.id
        WHERE authorComment LIKE ? OR hashtag LIKE ?
        ORDER BY post.createdAt ${orderDirection}`,
            [`%${search}%`, `%${search}%`]
        );

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve todos los post
async function getPostsByOrderDirection(posts, orderDirection) {
    let connection;
    try {
        connection = await getDB();

        [posts] = await connection.query(`
            SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
            FROM post INNER JOIN user ON post.idUser = user.id
            ORDER BY post.createdAt ${orderDirection}`);

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve un post por ID
async function getPostById(post, idPost) {
    let connection;
    try {
        connection = await getDB();

        [post] = await connection.query(
            `SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.avatar
            FROM post INNER JOIN user ON (post.idUser = user.id)
            WHERE post.id = ?`,
            [idPost]
        );

        return post;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve las fotos de un post
async function postPhotos(idPost) {
    let connection;
    try {
        connection = await getDB();

        const [photos] = await connection.query(
            `SELECT name FROM photo
        WHERE idPost = ?`,
            [idPost]
        );

        return photos;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los comentarios de un post
async function postComments(idPost) {
    let connection;
    try {
        connection = await getDB();

        const [comments] = await connection.query(
            `SELECT comment.body FROM comment
            WHERE idPost = ?`,
            [idPost]
        );
        return comments;
    } finally {
        if (connection) connection.release();
    }
}

//Función que elimina la foto de la base de datos
async function deletePhotofromDB(idPost) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`DELETE FROM photo WHERE idPost = ?`, [idPost]);
    } finally {
        if (connection) connection.release();
    }
}

//Función que elimina el post de la base de datos
async function deletePostfromDB(idPost) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`DELETE FROM post WHERE id = ?`, [idPost]);
    } finally {
        if (connection) connection.release();
    }
}

//Eliminamos el post de la base de datos

module.exports = {
    createPost,
    insertPhoto,
    insertLike,
    getPostsBySearch,
    getPostsByOrderDirection,
    postPhotos,
    postComments,
    getPostById,
    deletePhotofromDB,
    deletePostfromDB,
};
