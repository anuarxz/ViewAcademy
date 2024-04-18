const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticaController');

// Obtener todos los usuarios
router.get('/', estadisticasController.getAllEstadisticas);

router.post('/create', estadisticasController.createEstadistica);

module.exports = router;