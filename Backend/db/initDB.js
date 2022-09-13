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
        await connection.query('DROP TABLE IF EXISTS post_receives_ht');
        await connection.query('DROP TABLE IF EXISTS hashtag');
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
            lastname_1 VARCHAR(100),
            lastname_2 VARCHAR(100),
            avatar VARCHAR(255),
            bio TEXT,
            url VARCHAR(255),
            privacy ENUM ('private', 'public') DEFAULT 'public',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                `);

        await connection.query(`
            CCREATE TABLE IF NOT EXISTS follower (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idUser) REFERENCES user (id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                idFollower INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idFollower) REFERENCES user (id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
                )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS hashtag (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            ht1 VARCHAR(50) NOT NULL,
            ht2 VARCHAR(50),
            ht3 VARCHAR(50),
            ht4 VARCHAR(50),
            ht5 VARCHAR(50),
            ht6 VARCHAR(50),
            ht7 VARCHAR(50),
            ht8 VARCHAR(50),
            ht9 VARCHAR(50),
            ht10 VARCHAR(50)
            )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS post_receives_ht (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idHt INT UNSIGNED NOT NULL,
            FOREIGN KEY (idHt ) REFERENCES hashtag (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS post_receives_ht (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idHt INT UNSIGNED NOT NULL,
            FOREIGN KEY (idHt ) REFERENCES hashtag (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
            )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS photo (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser ) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            name VARCHAR(255)
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser ) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
            )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS favorite (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser ) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
            )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            body TINYTEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            idPost INT UNSIGNED NOT NULL,
            FOREIGN KEY (idPost ) REFERENCES post (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser ) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas!');

        // Insertar algunos datos de ejemplo

        /* console.log('Insertando datos de prueba...');

        await connection.query(
            `INSERT INTO user (username, email, password, createdAt)
            VALUES ('userPrueba01', 'emailprueba@gmail.com', '123456', ?)`,
            [new Date()]
        );

        await connection.query(
            `INSERT INTO product (name, precio, description, createdAt, idUser)
            VALUES ('Videocamara', 20.10, 'Esto es una camara', '2022-08-09 17:00:00', 1),
            ('Game Boy', 100.10, null, '2022-08-12 17:00:00', 1),
            ('Teclado mecanico', 250, 'Teclado', '2021-10-29 17:00:00', 1),
            ('Guantes ElBronx', 85.99, 'Guantes duros', '2012-06-09 17:00:00', 1)`
        );

        await connection.query(
            `INSERT INTO product_photo (name, idProduct)
            VALUES ('foto.jpg', 1),
            ('foto.jpg', 1),
            ('foto.jpg', 2),
            ('foto.jpg', 4),
            ('foto.jpg', 3)`
        );

        console.log('Datos de prueba insertados con éxito!'); */
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
