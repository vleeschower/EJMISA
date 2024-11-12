import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditarUsuario = () => {
    const { id_usuario } = useParams();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    // Obtener los datos del usuario
    useEffect(() => {
      axios.get(`http://localhost:3002/api/admin_usuarios/${id_usuario}`)
        .then(response => {
          const { nombre, correo, password } = response.data;
          setNombre(nombre);
          setCorreo(correo);
          setPassword(password);
        })
        .catch(error => {
          console.error('Error al obtener al usuario:', error);
        });
    }, [id_usuario]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const UsuarioActualizado = { nombre, correo, password };
  
      // Enviar los datos actualizados al backend
      axios.put(`http://localhost:3002/api/admin_usuarios/${id_usuario}`, UsuarioActualizado)
        .then(response => {
          console.log('Usuario actualizado:', response.data);
  
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Éxito!',
            text: 'Usuario actualizado con éxito.',
            icon: 'success',
            confirmButtonColor: '#30449e',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed){
              navigate('/admin/usuarios');
            }
          });
        })
        .catch(error => {
          console.error('Error al actualizar el usuario:', error);
        });
    };
  
    return (
      <div className="container my-4">
        <h2 className="text-white">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
  
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del usuario</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
            <Link to="/admin/usuarios" className='btn btn-danger'>
                Cancelar
              </Link>
          </div>
        </form>
      </div>
    );
}

export default EditarUsuario
