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

module.exports = {
    generateError,
    validate,
};
