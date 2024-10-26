import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';

const EditarCategoria = () => {
    const { id_categoria } = useParams();
    const [nombre, setNombre] = useState('');
  
    // Obtener los datos de la categoria
    useEffect(() => {
      axios.get(`http://localhost:3002/api/categorias/${id_categoria}`)
        .then(response => {
          const { nombre } = response.data;
          setNombre(nombre);
        })
        .catch(error => {
          console.error('Error al obtener la categoria:', error);
        });
    }, [id_categoria]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const categoriaActualizada = { nombre };
  
      // Enviar los datos actualizados al backend
      axios.put(`http://localhost:3002/api/categorias/${id_categoria}`, categoriaActualizada)
        .then(response => {
          console.log('Categoria actualizada:', response.data);
  
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Éxito!',
            text: 'Categoria actualizada con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        })
        .catch(error => {
          console.error('Error al actualizar la categoria:', error);
        });
    };
  
    return (
      <div className="container my-4">
        <h2 className="text-white">Editar Categoria</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
  
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del la categoria</label>
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
            <button type="submit" className="btn btn-primary">Actualizar Categoria</button>
            <Link to="/admin/categorias" className='btn btn-danger'>
                Cancelar
              </Link>
          </div>
        </form>
      </div>
    );
}

export default EditarCategoria
