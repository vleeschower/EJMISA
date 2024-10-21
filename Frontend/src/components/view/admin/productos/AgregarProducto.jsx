import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const AgregarProducto = () => {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = { producto, descripcion, precio };

    // Enviar datos al backend
    axios.post('http://localhost:3002/api/productos', nuevoProducto)
      .then(response => {
        console.log('Producto agregado:', response.data);

        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Éxito!',
            text: 'Producto agregado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

        // Limpiar el formulario después de agregar el producto
        setProducto('');
        setDescripcion('');
        setPrecio('');
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
    };

  return (
    <div className="container my-4">
      <h2 className="text-white">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
        <div className="mb-3">
          <label htmlFor="producto" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Agregar Producto</button>

          <Link to="/admin/productos" className='btn btn-danger'>
              Cancelar
            </Link>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
