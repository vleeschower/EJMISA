import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AgregarCategoria = () => {
    const [nombre, setNombre] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const nuevaCategoria = { nombre};
  
      // Enviar datos al backend
      axios.post('http://localhost:3002/api/categorias', nuevaCategoria)
        .then(response => {
          console.log('Categoria agregada:', response.data);
  
          // Mostrar alerta de éxito
          Swal.fire({
              title: 'Éxito!',
              text: 'Categoria agregada con éxito.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
  
          // Limpiar el formulario después de agregar la categoria
          setNombre('');
        })
        .catch(error => {
          console.error('Error al agregar la categoria:', error);
        });
      };
  
    return (
      <div className="container my-4">
        <h2 className="text-white">Agregar Categoria</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
  
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre de la categoria</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
  
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Agregar Categoria</button>
            <Link to="/admin/categorias" className='btn btn-danger'>
                Cancelar
              </Link>
          </div>
  
        </form>
      </div>
    );
}

export default AgregarCategoria
