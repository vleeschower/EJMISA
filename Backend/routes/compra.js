const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Ruta para realizar una compra
router.post('/compra', (req, res) => {
  const { id_usuario, productos } = req.body; // productos es un array con {id_producto, cantidad}

  if (!id_usuario || !productos || productos.length === 0) {
    return res.status(400).json({ message: 'Faltan datos para la compra' });
  }

  // Verificar si el usuario existe en la base de datos
  db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Calcular el total de la compra
    let totalCompra = 0;
    const detallesVenta = [];

    // Usar un bucle para obtener los precios de los productos
    const getPrecioProducto = (id) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT precio FROM productos WHERE id = ?', [id], (err, result) => {
          if (err) return reject(err);
          const precio = result[0]?.precio;
          resolve(precio);
        });
      });
    };

    // Promesas para obtener los precios y calcular el total
    const calcularTotal = async () => {
      for (const producto of productos) {
        const { id_producto, cantidad } = producto;
        try {
          const precio = await getPrecioProducto(id_producto);
          if (precio) {
            const sub_total = precio * cantidad;
            totalCompra += sub_total;
            detallesVenta.push({ id_producto, cantidad, precio, sub_total });
          }
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      }

      // Insertar la venta en la tabla ventas
      const queryVenta = 'INSERT INTO ventas (id_usuario, total, estado) VALUES (?, ?, ?)';
      db.query(queryVenta, [id_usuario, totalCompra, 'Pendiente'], (err, resultVenta) => {
        if (err) return res.status(500).json({ error: err.message });

        const id_ventas = resultVenta.insertId;

        // 3. Insertar los detalles de la venta en detalles_ventas
        detallesVenta.forEach(detalle => {
          const { id_producto, cantidad, precio, sub_total } = detalle;
          const queryDetalle = 'INSERT INTO detalles_ventas (id_ventas, id_producto, cantidad, precio_unitario, sub_total) VALUES (?, ?, ?, ?, ?)';
          db.query(queryDetalle, [id_ventas, id_producto, cantidad, precio, sub_total], (err) => {
            if (err) return res.status(500).json({ error: err.message });
          });
        });

        res.status(201).json({ message: 'Compra realizada con éxito', id_ventas });
      });
    };

    calcularTotal();
  });
});

module.exports = router;