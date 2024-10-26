const express = require('express');
const cors = require('cors');
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias'); 
const UsersRoutes = require('./routes/usuarios')

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api/productos', productosRouter);
app.use('/api/categorias', categoriasRouter); 

//ruta registro y login
app.use('/api/usuarios', UsersRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

