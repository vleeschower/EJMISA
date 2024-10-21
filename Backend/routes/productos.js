const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Ruta para obtener los productos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un producto
router.post('/', (req, res) => {
    const { producto, descripcion, precio } = req.body;
    const query = 'INSERT INTO productos (producto, descripcion, precio) VALUES (?, ?, ?)';
    db.query(query, [producto, descripcion, precio], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: results.insertId, producto, descripcion, precio });
    });
});

// Ruta para obtener un producto por su ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).send('Error en la base de datos');
      } else {
        if (result.length > 0) {
          res.json(result[0]);  // Enviar el primer resultado como JSON
        } else {
          res.status(404).send('Producto no encontrado');
        }
      }
    });
});
  
// Ruta para editar un producto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { producto, descripcion, precio } = req.body;
    const query = 'UPDATE productos SET producto = ?, descripcion = ?, precio = ? WHERE id = ?';
    db.query(query, [producto, descripcion, precio, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ id, producto, descripcion, precio });
    });
});

// Ruta para eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Producto eliminado' });
    });
});

module.exports = router;
