const express = require('express');
const router = express.Router();
const db = require('../dbconeccion'); // Asegúrate de que la ruta sea correcta

// Ruta para realizar la compra
router.post('/comprar', async (req, res) => {
    const { usuarioId, productosSeleccionados, total } = req.body;

    // Verificar que los datos estén completos
    if (!usuarioId || !productosSeleccionados || !total) {
        return res.status(400).json({ error: 'Datos de compra incompletos' });
    }
    console.log('Datos recibidos:', { usuarioId, productosSeleccionados, total });

    try {
        // Crear una nueva compra en la tabla `compras`
        const [result] = await db.query(
            'INSERT INTO compras (usuario_id, total) VALUES (?, ?)',
            [usuarioId, total]
        );
        const compraId = result.insertId;
        console.log('Compra registrada con ID:', compraId);

        // Insertar los detalles de cada producto en la tabla `detalles_compra`
        for (const [productoId, cantidad] of Object.entries(productosSeleccionados)) {
            // Verificar que el `productoId` y `cantidad` sean válidos
            if (!productoId || !cantidad || cantidad <= 0) {
                console.warn(`Datos inválidos para el producto ID: ${productoId}`);
                continue;
            }

            // Obtener el precio del producto desde la tabla `productos`
            const [productoResult] = await db.query(
                'SELECT precio FROM productos WHERE id = ?',
                [productoId]
            );

            // Verificar que el producto existe
            if (productoResult.length === 0) {
                console.warn(`Producto con ID ${productoId} no encontrado`);
                continue;
            }

            const productoPrecio = productoResult[0].precio;

            // Insertar el detalle de la compra en la tabla `detalles_compra`
            await db.query(
                'INSERT INTO detalles_compra (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
                [compraId, productoId, cantidad, productoPrecio]
            );
            console.log(`Detalle agregado para producto ID: ${productoId} con cantidad: ${cantidad} y precio: ${productoPrecio}`);
        }

        // Enviar respuesta de éxito al cliente
        res.status(200).json({ message: 'Compra registrada exitosamente', compraId });

    } catch (error) {
        // Manejar errores en el proceso de registro de la compra
        console.error('Error al registrar la compra:', error);
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
});

module.exports = router;
