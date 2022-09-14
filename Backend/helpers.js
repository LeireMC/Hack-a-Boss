//Función que genera un error
function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}




//Función para borrar imágenes
async function deletePhoto (photoName, type){
    try {
        let photoPath;

        if (type === 0){
        photoPath = path.join(avatarsDir, photoName);
       
        } else if (type === 1) {
        photoPath = path.join(postsDir, photoName);
        }

        await unlink(photoPath);

    } catch (error) {
        throw new Error ('Se ha producido un error al eliminar la imagen del servidor. Por favor intenta de nuevo.');
    }
};






module.exports = {
    generateError,
    deletePhoto
};