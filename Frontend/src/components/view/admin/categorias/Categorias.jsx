import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Categorias = () => {
    const [Categoria, setCategorias] = useState([]);

    // Obtener las categorias desde la API
    useEffect(() => {
      axios.get('http://localhost:3002/api/categorias')
        .then(response => {
          setCategorias(response.data);
        })
        .catch(error => {
          console.error('Error al obtener las categorias:', error);
        });
    }, []);
  
     // Función para eliminar una categoria
     const eliminarCategoria = (id_categoria) => {
      // Muestra la alerta de confirmación
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#30449e',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, procede a eliminar ela categoria
          axios.delete(`http://localhost:3002/api/categorias/${id_categoria}`)
            .then(response => {
              console.log(response.data);
              // Actualizar la lista de categorias
              setCategorias(Categoria.filter(Categoria => Categoria.id_categoria !== id_categoria));
              Swal.fire(
                '¡Eliminado!',
                'La categoria ha sido eliminada.',
                'success'
              );
            })
            .catch(error => {
              console.error('Error al eliminar la categoria:', error);
            });
        }
      });
    };
  
    return (
      <div className='px-3'>
        <div className='container-fluid'>
  
        <div className="row my-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h2 className="text-white">Categorias</h2>
              <Link to="/admin/AgregarCategoria" className='btn btn-primary'>
                Agregar Categoria
              </Link>
            </div>
          </div>
      
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bg-white shadow-sm rounded p-3">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Categoria</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
  
                    {Categoria.map((Categoria) => (
                      <tr key={Categoria.id_categoria}>
                        <td>{Categoria.nombre}</td>
                        <td>
                          <Link to={`/admin/EditarCategoria/${Categoria.id_categoria}`} className='btn btn-warning text-white'>
                            Editar
                          </Link>
                        </td>
                        <td>
                          <button className='btn btn-danger' onClick={() => eliminarCategoria(Categoria.id_categoria)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    )
}

export default Categorias
