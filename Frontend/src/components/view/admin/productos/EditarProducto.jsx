import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  // Obtener los datos del producto al cargar el componente
  useEffect(() => {
    axios.get(`http://localhost:3002/api/productos/${id}`)
      .then(response => {
        const { producto, descripcion, precio } = response.data;
        setProducto(producto);
        setDescripcion(descripcion);
        setPrecio(precio);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productoActualizado = { producto, descripcion, precio };

    // Enviar los datos actualizados al backend
    axios.put(`http://localhost:3002/api/productos/${id}`, productoActualizado)
      .then(response => {
        console.log('Producto actualizado:', response.data);

        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Éxito!',
          text: 'Producto actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  return (
    <div className="container my-4">
      <h2 className="text-white">Editar Producto</h2>
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
          <button type="submit" className="btn btn-primary">Actualizar Producto</button>
          <Link to="/admin/productos" className='btn btn-danger'>
              Cancelar
            </Link>
        
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;
