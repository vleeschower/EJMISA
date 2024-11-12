import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import fotoEJMISA from '/src/components/images/publico/fotoEJMISA.jpg';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const registerUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3002/api/usuarios/register', {
      nombre: nombre,
      correo: correo,
      password: password
    }).then((response) => {
      if (response.data.message === 'Usuario agregado') {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Ahora puedes iniciar sesión',
          confirmButtonText: 'OK',
          confirmButtonColor: '#30449e'
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar el usuario',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#30449e'
        });
      }
    }).catch((error) => {
      console.error('Error en el registro:', error);
    });
  };

  return (
    <div className="login-background"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.637), rgba(0, 0, 0, 0.637)), 
                          url(${fotoEJMISA})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="card shadow-lg p-4">
              <h3 className="text-center mb-4">Registrarse</h3>
              <form onSubmit={registerUser}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="form-control"
                    placeholder="Ingrese su nombre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="form-control"
                    placeholder="Ingrese su correo"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Registrarse
                </button>
              </form>
              <div className="mt-3 text-center">
                <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
