const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



async function uploadFile2(archivo, indice) {

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
            "content": "Eres un asistente escolar que procesa datos académicos de alumnos. A partir de los siguientes datos de alumnos,genera una descripción detallada para cada uno de ellos explicando en qué aspectos van bien y en cuáles tienen que trabajar más.Tu respuesta tiene que ser detallada y ordenada.Un ejemplo de tu respuesta sería :  El alumno Juan Pérez tiene un buen rendimiento en matemáticas, pero tiene que mejorar en lengua.  El alumno María García tiene un buen rendimiento en lengua, pero tiene que mejorar en matemáticas.  El alumno Pedro López tiene un buen rendimiento en matemáticas, pero tiene que mejorar en lengua.  El alumno Ana Martínez tiene un buen rendimiento en lengua, pero tiene que mejorar en matemáticas.  El alumno Luis Sánchez tiene un buen rendimiento en matemáticas, pero tiene que mejorar en lengua.  El alumno Carmen Rodríguez tiene un buen rendimiento en lengua, pero tiene que mejorar en matemáticas."
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

module.exports = { uploadFile2};
