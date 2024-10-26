const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Ruta para obtener los productos con categoria
router.get('/', (req, res) => {
    const query = 'SELECT p.id, p.producto, p.descripcion, p.precio, c.nombre FROM productos p JOIN categoria c ON p.id_categoria = c.id_categoria';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un producto
router.post('/', (req, res) => {
    const { producto, descripcion, precio, id_categoria } = req.body;
    const query = 'INSERT INTO productos (producto, descripcion, precio, id_categoria) VALUES (?, ?, ?, ?)';
    db.query(query, [producto, descripcion, precio, id_categoria], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: results.insertId, producto, descripcion, precio, id_categoria });
    });
});

// Ruta para obtener un producto por su ID y categoria
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT p.id, p.producto, p.descripcion, p.precio, p.id_categoria, c.nombre FROM productos p JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id = ?';
  
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
    const { producto, descripcion, precio, id_categoria } = req.body;
    const query = 'UPDATE productos SET producto = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id = ?';
    db.query(query, [producto, descripcion, precio, id_categoria,id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ id, producto, descripcion, precio, id_categoria });
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
