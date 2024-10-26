const express = require('express');
const router = express.Router();
const db = require('../dbconeccion');

//cliente:
//para seguridad de la contraseña que ingrese 
router.post('/register', async (req, res) => {
    const { nombre, correo, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id_rol = 2;

        db.query(
            'INSERT INTO usuarios (nombre, correo, password, id_rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, hashedPassword, id_rol],
            (error, results) => {
                if (error) return res.status(500).json({ error: 'Error en el registro, verifique sus datos' });
                res.status(201).json({ texto: 'Registro exitoso' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

//para administradores y clientes con la validación de rol parte de login
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    const id_rol = 1

    db.query(
        'SELECT * FROM usuarios WHERE correo = ?',
        [correo],
        async (error, results) => {
            if (error || results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

            const usuario = results[0];
            const passwordCoincide = await bcrypt.compare(password, usuario.password);

            if (passwordCoincide) {
                res.status(200).json({
                    texto: 'Ingreso exitoso',
                    usuario: { id: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.id_rol }
                });
            } else {
                res.status(401).json({ error: 'Ingreso incorrecto' });
            }
        }
    );
});

module.exports = router;