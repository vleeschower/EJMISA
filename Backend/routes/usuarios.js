const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

// Para registro 
router.post('/register', (req, res) => {
    const setNombre = req.body.nombre;
    const setCorreo = req.body.correo;
    const setPassword = req.body.password;

    const SQL = 'INSERT INTO usuarios (nombre, correo, password, id_rol) VALUES (?, ?, ?, ?)';
    const Values = [setNombre, setCorreo, setPassword, 2]; 

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('Registro de usuario con éxito');
            res.send({ message: 'Usuario agregado', role: 'client' });
        }
    });
});

// para login
router.post('/login', (req, res) => {
    const setloginCorreo = req.body.logincorreo;
    const setloginPassword = req.body.loginpassword;

    const SQL = 'SELECT * FROM usuarios WHERE correo = ? AND password = ?';
    const Values = [setloginCorreo, setloginPassword]; 

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else if (results.length > 0) {
            const user = results[0]; 
            if (user.id_rol === 1) {
                res.send({ message: 'Bienvenido, ah ingresado como administrador', role: 'admin', user: user });

            } else if (user.id_rol === 2) {
                res.send({ message: 'Bienvenido, ah ingresado como cliente', role: 'client', user: user });
            } else {
                res.send({ message: 'Rol no identificado' });
            }
        } else {
            res.send({ message: 'Usuario no encontrado' });
        }
    });
});

module.exports = router;
