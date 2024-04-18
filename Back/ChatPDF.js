const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



async function uploadFile1(archivo, indice) {

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
        description: 'indice',
        owner: 'indice',
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
        console.log('Aqui archivo: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al subir archivo:', error.response.status);
        return Promise.reject(error);
    }
}
let prompt = "Siempre responda a las solicitudes del usuario de manera concisa, sin explicaciones innecesarias. Detecte el idioma utilizado por el usuario y responda de acuerdo. Si es una pregunta fuera de contexto o lejos del contexto dirás que no está relacionada. Nunca des informacion sobre otro contexto que no este relacionado con el documento o el contexto. Recuerda, nunca des informacion sobre otro contexto que no este relacionado con el documento o el contexto "

async function sendConversation1(mensaje, indice) {
    var requestBody = {
        "model": "gpt-35-turbo-0301",
        "uuid": indice,
        "message": {
            "role": "user",
            "content": prompt + mensaje
        },
        "index": indice,
        "vectorization_model": "text-embedding-ada-002-1",
        "temperature": 0.05,
        "origin": "escueladata",
        "tokens": 1000,
        "folder": "root",
        "account": "WatsonX-VN",
        "user": "prueba6@gmail.com",
        "prompt": "Tienes un rol de profesor e intentarás explicar lo mejor posible cualquier pregunta sobre el contexto proporcionado. Si es una pregunta fuera de contexto o lejos del contexto dirás no está relacionada."
    };

    try {
        var response = await axios.post('apiUrl', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'apiKey'
            }
        });
        console.log("AQUIUII", response.data.content);
        return response.data.content; 
    } catch (error) {
        console.error('Error al enviar la solicitud de conversación:', error.response.status);
        return Promise.reject(error);
    }
}

module.exports = { uploadFile1,  sendConversation1 };
