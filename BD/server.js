require('dotenv').config();

const express = require('express');
const usersRouter = require('./routes/usersRoutes');
const estadisticasRouter = require('./routes/estadisticasRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.use('/estadisticas', estadisticasRouter);
// app.options('/users/login', cors({
//   allowedHeaders: ['Content-Type'],
// }));

// app.options('*', cors({
//   allowedHeaders: ['Content-Type'],
// }));


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});