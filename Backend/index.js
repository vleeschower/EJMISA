const express = require('express');
const cors = require('cors');
const path = require('path');

const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias'); 
const UsersRoutes = require('./routes/usuarios')
const AdminUsuarios = require('./routes/admin_usuarios')
const compraRouter = require('./routes/compra')
const pedidosRouter = require('./routes/pedidos');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para servir imágenes de forma pública
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes_productos')));

// Usar las rutas
app.use('/api/productos', productosRouter);
app.use('/api/categorias', categoriasRouter); 
app.use('/api/admin_usuarios', AdminUsuarios);
app.use('/api/compra', compraRouter);
app.use('/api/pedidos', pedidosRouter); 

//ruta registro y login
app.use('/api/usuarios', UsersRoutes);
app.use('/api/compras', comprasRouter); // Asigna la ruta para compras

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
