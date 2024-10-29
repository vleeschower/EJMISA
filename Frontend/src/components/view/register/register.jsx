import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3002/api/usuarios/register', {
      nombre: nombre,
      correo: correo,
      password: password
    }).then(() => {
      navigate('/');
      setCorreo('');
      setNombre('');
      setPassword('');
    }).catch((error) => {
      console.error("Error al registrar el usuario:", error);
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Registrarse</h3>
            <form onSubmit={createUser}>
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
                  type="password"
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
  );
};

export default Register;

