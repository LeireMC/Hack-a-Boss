const getDB = require('./getDB');

async function main() {
    // Crear la variable que albergará la conexion con la base de datos
    let connection;

    try {
        // Abrir una conexion con la base de datos
        connection = await getDB();

        // Eliminar las tablas de la base de datos si existen
        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS comment');
        await connection.query('DROP TABLE IF EXISTS favorite');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS photo');
        await connection.query('DROP TABLE IF EXISTS post');
        await connection.query('DROP TABLE IF EXISTS follower');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Tablas eliminadas!');

        // Crear las tablas de la base de datos
        console.log('Creando tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(200) NOT NULL,
            lastname VARCHAR(100),
            avatar VARCHAR(255),
            bio VARCHAR(500),
            url VARCHAR(255),
            privacy ENUM ('private', 'public') DEFAULT 'public',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS follower (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idUser) REFERENCES user (id)
                    ON DELETE CASCADE,
                idFollower INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idFollower) REFERENCES user (id)
                    ON DELETE CASCADE
                )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS post (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            authorComment VARCHAR(500) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            hashtag VARCHAR (255),
            idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS photo (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost) REFERENCES post (id)
            ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost) REFERENCES post (id)
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user (id)
            ON DELETE CASCADE)
        `);

        await connection.query(`
      CREATE TABLE IF NOT EXISTS favorite (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost) REFERENCES post (id)
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user (id)
            ON DELETE CASCADE
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            body VARCHAR (500) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost) REFERENCES post (id)
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user (id)
            ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas!');
    } catch (error) {
        console.error(error.message);
    } finally {
        // Si o si al final del try catch, ejecuta el codigo dentro del finally

        // Siempre al final cerraremos la conexion con la base de datos
        if (connection) connection.release();

        // Finalizamos la ejecucion del script
        process.exit();
    }
}

// Ejecutamos la funcion
main();
