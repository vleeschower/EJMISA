const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenes_productos/');  // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para la imagen
  }
});

const upload = multer({ storage: storage });

// Ruta para obtener los productos con categoria
router.get('/', (req, res) => {
    const query = 'SELECT p.id, p.producto, p.descripcion, p.precio, p.imagen, c.nombre FROM productos p JOIN categoria c ON p.id_categoria = c.id_categoria';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un producto con imagen
router.post('/', upload.single('imagen'), (req, res) => {
    const { producto, descripcion, precio, id_categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const query = 'INSERT INTO productos (producto, descripcion, precio, id_categoria, imagen) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [producto, descripcion, precio, id_categoria, imagen], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: results.insertId, producto, descripcion, precio, id_categoria, imagen });
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
router.put('/:id', upload.single('imagen'), (req, res) => {
    const { id } = req.params;
    const { producto, descripcion, precio, id_categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;

     // Si hay una nueva imagen, primero eliminamos la anterior
    if (imagen) {
      db.query('SELECT imagen FROM productos WHERE id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        const oldImage = results[0]?.imagen;
        if (oldImage) fs.unlinkSync(`imagenes_productos/${oldImage}`); // Elimina la imagen anterior
      });
    }

    const query = imagen
    ? 'UPDATE productos SET producto = ?, descripcion = ?, precio = ?, id_categoria = ?, imagen = ? WHERE id = ?'
    : 'UPDATE productos SET producto = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id = ?';

    const params = imagen ? [producto, descripcion, precio, id_categoria, imagen, id] : [producto, descripcion, precio, id_categoria, id];

    db.query(query, params, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ id, producto, descripcion, precio, id_categoria, imagen });
    });
});

// Ruta para eliminar un producto y su imagen
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Primero, selecciona la imagen para eliminarla del sistema de archivos
  db.query('SELECT imagen FROM productos WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });

    const imagen = results[0]?.imagen;
    if (imagen) fs.unlinkSync(`imagenes_productos/${imagen}`); // Elimina la imagen

    // Después, elimina el producto de la base de datos
    db.query('DELETE FROM productos WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Producto eliminado' });
    });
  });
});

module.exports = router;
