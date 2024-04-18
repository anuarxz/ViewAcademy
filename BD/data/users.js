const bcrypt = require('bcryptjs');

const usersData = [
  {
    id: 1,
    name: "Alumno",
    email: "alumno@example.com",
    password: bcrypt.hashSync("alumno", 10),
    rol: "alumno"
  },
  {
    id: 2,
    name: "Profesor",
    email: "profesor@example.com",
    password: bcrypt.hashSync("profesor", 10),
    rol: "profesor"
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 10),
    rol: "admin"
  }
];

module.exports = usersData;