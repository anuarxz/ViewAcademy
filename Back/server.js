const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {llamadaAsistenteApiPost} = require('./calls');
const app = express();
const routes = require('./routes');
const PORT = 3000;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors({
    allowedHeaders: ['Content-Type'],
  }));


app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});