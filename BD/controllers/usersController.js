const usersData = require('../data/users');
const bcrypt = require('bcryptjs');

// Mostrar todos los usuarios
const getAllUsers = (req, res) => {
    const hashedUsers = usersData.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }));
    res.json(hashedUsers);
};

// Mostrar todos los alumnos
const getAllAlumnos = (req, res) => {
    const hashedUsers = usersData
        .filter(user => user.rol === 'alumno')
        .map(user => ({
            ...user
        }));
    res.json(hashedUsers);
};

// Mostrar todos los profesores
const getAllProfesores = (req, res) => {
    const hashedUsers = usersData
        .filter(user => user.rol === 'profesor')
        .map(user => ({
            ...user
        }));
    res.json(hashedUsers);
};

// Mostrar usuario por ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = usersData.find(user => user.id === parseInt(id));
    if (user) {
        const hashedUser = { ...user, password: bcrypt.hashSync(user.password, 10) };
        res.json(hashedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Iniciar sesión
const login = (req, res) => {
    const { email, password } = req.body;
    const user = usersData.find(user => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ message: 'Inicio de sesión con éxito', rol_usuario: user.rol });
    } else {
        res.status(401).json({ message: 'Credenciales no válidas' });
    }
};

// Cerrar sesión
const signup = (req, res) => {
    const { name, email, password } = req.body;
    const id = usersData.length + 1;
    const newUser = { id, name, email, password };
    usersData.push(newUser);
    res.status(201).json({ message: 'Cierre de sesión con éxito' });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const { name, email, password } = req.body;

    // Comprobar si el email ya existe
    const existingUser = usersData.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'El email ya existe' });
    }

    // Generar ID de usuario
    const id = usersData.length + 1;

    // Hashear contraseña antes de guardarla
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear nuevo objeto de Usuario
    const newUser = { id, name, email, password: hashedPassword };

    // Añadir nuevo usuario al array
    usersData.push(newUser);

    // Mostrar mensaje de éxito
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
};

module.exports = {
    getAllUsers,
    getAllAlumnos,
    getAllProfesores,
    getUserById,
    login,
    signup,
    createUser
};