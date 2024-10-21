const express = require('express');
const cors = require('cors');
const productosRouter = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Usar las rutas de productos
app.use('/api/productos', productosRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

