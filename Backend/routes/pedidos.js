const express = require('express');
const router = express.Router();
const db = require('../dbconeccion'); 

// Ruta para obtener los pedidos de un usuario
router.get('/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  console.log('ID Usuario:', id_usuario);

  const query = `
    SELECT v.id_ventas AS pedido, v.total, v.estado
  FROM ventas v
  WHERE v.id_usuario = ?
  `;

  db.query(query, [id_usuario], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Ruta para obtener los detalles de un pedido
router.get('/detalle/:id_ventas', (req, res) => {
    const { id_ventas } = req.params;
    
    const query = `
      SELECT dv.id_producto, p.producto, dv.cantidad, dv.precio_unitario, dv.sub_total
      FROM detalles_ventas dv
      JOIN productos p ON dv.id_producto = p.id
      WHERE dv.id_ventas = ?
    `;
    
    db.query(query, [id_ventas], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });

  // Ruta para obtener todos los pedidos de todos los usuarios
router.get('/', (req, res) => {
    const query = `
      SELECT v.id_ventas AS pedido, v.total, v.estado, u.nombre AS usuario
      FROM ventas v
      JOIN usuarios u ON v.id_usuario = u.id_usuario
    `;
  
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);  // Respuesta con todos los pedidos de todos los usuarios
    });
  });

  // Ruta para actualizar el estado de un pedido 
  router.put('/:id_ventas', (req, res) => { 
    const { id_ventas } = req.params; 
    const { estado } = req.body; 
    const query = ` 
    UPDATE ventas SET estado = ? WHERE id_ventas = ? 
    `; 
    db.query(query, [estado, id_ventas], (error, results) => { 
        if (error) { 
            return res.status(500).json({ error: error.message }); 
        } res.json({ message: 'Estado del pedido actualizado con éxito' }); 
    }); 
});

module.exports = router;
