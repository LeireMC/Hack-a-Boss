const { unlink } = require('fs/promises');
const path = require('path'); // dependencia que nos sirve para crear rutas absolutas
/* const sharp = require('sharp');
const uuid = require('uuid'); */

// Creamos la ruta absoluta a la carpeta de avatares
const avatarsDir = path.join(__dirname, 'static/avatars');

//Creamos la ruta absoluta a la carpeta de productos
const postsDir = path.join(__dirname, 'static/posts');

//Función que genera un error
function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

//Función que valida un schema
async function validate(schema, data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
}

//Función para borrar imágenes
async function deletePhoto(photoName, type) {
    try {
        let photoPath;

        if (type === 0) {
            photoPath = path.join(avatarsDir, photoName);
        } else if (type === 1) {
            photoPath = path.join(postsDir, photoName);
        }

        await unlink(photoPath);
    } catch (error) {
        throw new Error(
            'Se ha producido un error al eliminar la imagen del servidor. Por favor intenta de nuevo.'
        );
    }
}

module.exports = {
    generateError,
    deletePhoto,
    validate,
};
