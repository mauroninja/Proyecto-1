// Contenedor 1: aplicación Node.js (Express)
const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Hola desde el contenedor de la aplicación Node.js',
    contenedor: os.hostname(),
    fecha: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ estado: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App escuchando en el puerto ${PORT}`);
});
