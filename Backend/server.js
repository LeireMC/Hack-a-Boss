require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//Variable servidor
const port = process.env.SERVER_PORT;

//Creamos el servidor
const app = express();

//Configuramos cors
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    })
);

//Deserializamos el body en formato raw para poder leer los datos
app.use(express.json());

//Leemos los archivos estáticos
app.use(express.static('static'));

// Middleware de Morgan que dará más información de las peticiones al servidor
app.use(morgan('dev'));

// Middleware que permite al servidor leer los archivos en formato form-data
app.use(fileUpload());

////////MIDDLEWARES////////

////////USER CONTROLLERS////////

////////POST CONTROLLERS////////

////////PHOTOS CONTROLLERS////////

////////COMMENTS CONTROLLERS////////

////////FOLLOWERS CONTROLLERS////////

////////LIKES CONTROLLERS////////

////////FAVORITES CONTROLLERS////////

////////ENDPOINTS USERS////////

// Registra un usuario
/* app.post('/register', newUser); */

// Login de usuario
/* app.post('/login', loginUser); */

// Recuperar datos de un usuario
/* app.get('/users/:idUser', getUser); */

// Modifica datos de usuario (name, username, lastname, avatar, bio, url, password, email, privacy)
/* app.put('/users/:idUser', isAuth, canEditUser, modifyUser); */

// Eliminar al usuario
/* app.delete('/users/:idUser', isAuth, canEditUser, deleteUser); */

////////ENDPOINTS POST////////

// Nuevo post (fotos, comentario autor, hastags)
/* app.post('/posts/new', isAuth, newPost); */

// Lista todos los post
/* app.get('/posts', getPosts); */

// Lista un post
/* app.get('/posts/:idPost', getPost); */

// Eliminar un post
/* app.delete('/posts/:idPost', isAuth, canEditPost, deletePost); */

////////ENDPOINTS PHOTOS////////
// Lista todas las fotos
/* app.get('/photos', getPhotos); */

////////ENDPOINTS COMMENTS////////
// Nuevo comentario
/* app.post('/comments/new', isAuth, newComment); */

// Lista todos los commentarios
/* app.get('/comments', getComments); */

////////ENDPOINTS FOLLOWERS////////
// Recupera datos de un follower
/* app.get('/follower/:idUser', isAuth, getFollower); */

// Añade nuevo follower
/* app.post('/follower/new', isAuth, addFollower); */

// Elimina follower
/* app.delete('/follower/:idUser', isAuth, deleteFollower); */

////////ENDPOINTS LIKES////////
// Recupera likes
/* app.get('/likes', isAuth, getLikes); */

// Añade nuevo like
/* app.post('/likes/new', isAuth, addLike); */

// Elimina like
/* app.delete('/likes/:idLike', isAuth, deleteLike); */

////////ENDPOINTS FAVORITES////////
// Recupera fovoritos
/* app.get('/favorites', isAuth, getFavorites); */

// Añade nuevo like
/* app.post('/favorites/new', isAuth, addFavorite); */

// Elimina like
/* app.delete('/favorites/:idFavorite', isAuth, deleteFavorite); */

// Middleware de ERROR
app.use((error, req, res, next) => {
    console.error(error);

    // Asignamos el codigo del error->creaMOS una propiedad httpStatus en los endpoint donde asignaMOS el codigo correspondiente, si no existe daremos el 500
    res.status(error.httpStatus || 500);

    // Enviamos la respuesta con el error
    res.send({
        status: 'Error',
        message: error.message,
    });
});

// Middleware de NOT FOUND - Rutas que no encuentre
app.use((req, res) => {
    res.status(404);

    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

// Ponemos el servidor a la escucha en el puerto 4000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
