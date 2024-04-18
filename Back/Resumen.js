const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



async function uploadFile4(archivo, indice) {

    const rutaAbsoluta = path.resolve(archivo); // Obtiene la ruta absoluta del archivo

    if (!fs.existsSync(archivo)) {
        console.error('El archivo no se encuentra en la ruta especificada.');
        return;
    }

    const file = fs.createReadStream(rutaAbsoluta);

    const formData = {
        file: file,
        index: indice,
        name: indice,
        description: indice,
        owner: indice,
        type: 'pdf',
        visibility: 'private',
        modelVectorization: 'text-embedding-ada-002-1',
        renderizarImagenes: 'false',
        vectorizarFile: 'false'
    };

    try {
        const response = await axios.post('apiUrl', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-API-KEY': 'apiKey'
            }
        });
        respuesta = await sendConversation2(indice);
        respuesta = respuesta.slice(4);
        return respuesta; 
    } catch (error) {
        console.error('Error al subir archivo:', error.response);
        return Promise.reject(error);
    }
}

async function sendConversation2(indice) {
    var requestBody = {
        "model": "gpt-35-turbo-0301",
        "uuid": indice,
        "message": {
            "role": "user",
            "content": "Tienes un rol de resumir textos, hazme un resumen claro, conciso y que refleje correctamente el contenido del texto original. La respuesta solo tendrá el resumen."
        },
        "index": indice,
        "vectorization_model": "text-embedding-ada-002-1",
        "temperature": 0.05,
        "origin": "escueladata",
        "tokens": 1000,
        "folder": "root",
        "account": "WatsonX-VN",
        "user": "prueba6@gmail.com"
    };

    try {
        var response = await axios.post('apiUrl', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'apiKey'
            }
        });
        return response.data.content; 
    } catch (error) {
        console.error('Error al enviar la solicitud de conversación:', error.response.status);
        return Promise.reject(error);
    }
}

module.exports = { uploadFile4};
