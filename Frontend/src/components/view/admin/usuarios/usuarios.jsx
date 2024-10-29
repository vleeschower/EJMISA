import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Obtener los usuarios desde la API
  useEffect(() => {
    axios.get('http://localhost:3002/api/admin_usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

   // Función para eliminar un usuario
   const eliminarUsuario = (id_usuario) => {
    // Muestra la alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procede a eliminar el producto
        axios.delete(`http://localhost:3002/api/admin_usuarios/${id_usuario}`)
          .then(response => {
            console.log(response.data);
            // Actualizar la lista de productos
            setUsuarios(usuarios.filter(usuarios => usuarios.id_usuario !== id_usuario));
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error al eliminar el usuario:', error);
          });
      }
    });
  };

  return (
    <div className='px-3'>
      <div className='container-fluid'>

      <div className="row my-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="text-white">Usuarios</h2>
            <Link to="/admin/AgregarAdmin" className='btn btn-primary'>
              Agregar Administrador
            </Link>
          </div>
        </div>
    
        <div className="row">
          <div className="col-12">
            <div className="table-responsive bg-white shadow-sm rounded p-3">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                    <th>Rol</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>

                  {usuarios.map((usuarios) => (
                    <tr key={usuarios.id_usuario}>
                      <td>{usuarios.nombre}</td>
                      <td>{usuarios.correo}</td>
                      <td>{usuarios.password}</td>
                      <td>{usuarios.rol}</td>
                      <td>
                        <Link to={`/admin/EditarUsuario/${usuarios.id_usuario}`} className='btn btn-warning text-white'>
                          Editar
                        </Link>
                      </td>
                      <td>
                        <button className='btn btn-danger' onClick={() => eliminarUsuario(usuarios.id_usuario)}>
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

export default Usuarios
