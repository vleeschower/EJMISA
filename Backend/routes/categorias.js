const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Ruta para obtener todas las categorías
router.get('/', (req, res) => {
  const query = 'SELECT * FROM categoria';
  db.query(query, (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.json(results);
  });
});

// Ruta para agregar una categoria
router.post('/', (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO categoria (nombre) VALUES (?)';
    db.query(query, [nombre], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id_categoria: results.insertId, nombre });
    });
});

// Ruta para obtener una categoria por su ID
router.get('/:id_categoria', (req, res) => {
    const id_categoria = req.params.id_categoria;
    const query = 'SELECT * FROM categoria WHERE id_categoria = ?';
  
    db.query(query, [id_categoria], (err, result) => {
      if (err) {
        res.status(500).send('Error en la base de datos');
      } else {
        if (result.length > 0) {
          res.json(result[0]);  // Enviar el primer resultado como JSON
        } else {
          res.status(404).send('Categoria no encontrada');
        }
      }
    });
});
  
// Ruta para editar un producto
router.put('/:id_categoria', (req, res) => {
    const { id_categoria } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE categoria SET nombre = ? WHERE id_categoria = ?';
    db.query(query, [nombre, id_categoria], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ id_categoria, nombre });
    });
});

// Ruta para eliminar categoria
router.delete('/:id_categoria', (req, res) => {
    const { id_categoria } = req.params;
    const query = 'DELETE FROM categoria WHERE id_categoria = ?';
    db.query(query, [id_categoria], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Categoria eliminada' });
    });
});

module.exports = router;
