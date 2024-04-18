const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Obtener todos los usuarios
router.get('/', usersController.getAllUsers);

// Obtener todos los alumnos
router.get('/alumnos', usersController.getAllAlumnos);

// Obtener todos los profesores
router.get('/profesores', usersController.getAllProfesores);

// Obtener usuario por ID
router.get('/:id', usersController.getUserById);

// Iniciar sesión
router.post('/login', usersController.login);

// Cerrar sesión
router.post('/signup', usersController.signup);

// Crear usuario
router.post('/create', usersController.createUser);

module.exports = router;