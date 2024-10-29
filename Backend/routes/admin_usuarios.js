const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Ruta para obtener los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT u.id_usuario, u.nombre, u.correo, u.password, r.rol FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un administrador
router.post('/', (req, res) => {
    const { nombre, correo, password } = req.body;
    const id_rol = 1;
    const query = 'INSERT INTO usuarios (nombre, correo, password, id_rol) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, correo, password, id_rol], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id_usuario: results.insertId, nombre, correo, password, id_rol });
    });
});

// Ruta para obtener info de usuarios con rol
router.get('/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
    const query = 'SELECT u.id_usuario, u.nombre, u.correo, u.password, r.rol FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol WHERE u.id_usuario = ?';
  
    db.query(query, [id_usuario], (err, result) => {
      if (err) {
        res.status(500).send('Error en la base de datos');
      } else {
        if (result.length > 0) {
          res.json(result[0]);  // Enviar el primer resultado como JSON
        } else {
          res.status(404).send('Usuario no encontrado');
        }
      }
    });
});
  
// Ruta para editar info de usuario
router.put('/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, correo, password } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id_usuario = ?';
    db.query(query, [nombre, correo, password, id_usuario], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ id_usuario, nombre, correo, password  });
    });
});

// Ruta para eliminar un admin
router.delete('/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(query, [id_usuario], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;