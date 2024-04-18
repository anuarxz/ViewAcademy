const estadisticasData = require('../data/estadisticas');

// Mostrar todos los usuarios
const getAllEstadisticas = (req, res) => {
    res.json(estadisticasData);
};

// Crear un nuevo estadistica
const createEstadistica = (req, res) => {
    const { user, servicio, content, fecha } = req.body;

    // Generar ID de usuario
    const id = estadisticasData.length + 1;

    // Crear nuevo objeto de Usuario
    const newEstadistica = { id, user, servicio, content, fecha };

    // Añadir nuevo usuario al array
    estadisticasData.push(newEstadistica);

    // Mostrar mensaje de éxito
    res.status(201).json({ message: 'Estadistica creada con éxito', estadistica: newEstadistica });
};


module.exports = {
    getAllEstadisticas,
    createEstadistica
};