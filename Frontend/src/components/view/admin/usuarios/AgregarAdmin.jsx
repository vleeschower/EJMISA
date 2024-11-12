import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const AgregarAdmin = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const nuevoAdmin = { nombre, correo, password};
  
      // Enviar datos al backend
      axios.post('http://localhost:3002/api/admin_usuarios', nuevoAdmin)
        .then(response => {
          console.log('Administrador agregado:', response.data);
  
          // Mostrar alerta de éxito
          Swal.fire({
              title: 'Éxito!',
              text: 'Administrador agregado con éxito.',
              icon: 'success',
              confirmButtonColor: '#30449e',
              confirmButtonText: 'Ok'
            });
  
          // Limpiar el formulario después de agregar admin
          setNombre('');
          setCorreo('');
          setPassword('');

          // Redirigir a la lista de productos
          navigate('/admin/usuarios');
        })
        .catch(error => {
          console.error('Error al agregar al administrador:', error);
        });
      };
  
    return (
      <div className="container my-4">
        <h2 className="text-white">Agregar Administrador</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
  
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
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
            <button type="submit" className="btn btn-primary">Agregar Administrador</button>
            <Link to="/admin/usuarios" className='btn btn-danger'>
                Cancelar
              </Link>
          </div>
  
        </form>
      </div>
    );
}

export default AgregarAdmin
