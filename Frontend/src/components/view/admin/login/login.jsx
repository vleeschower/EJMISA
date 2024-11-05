import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './login.css';

const Login = () => {
  const [logincorreo, setLoginCorreo] = useState('');
  const [loginpassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const loginUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3002/api/usuarios/login', {
      logincorreo: logincorreo,
      loginpassword: loginpassword
    }).then((response) => {
      if (response.data.message === 'Usuario no encontrado' || logincorreo === '' || loginpassword === '') {
        setLoginStatus('Usuario no existente');
      } else {
        const role = response.data.role;
        
        if (role === 'admin') {
          navigate('/admin/inicio'); 
        } else if (role === 'client') {
          navigate('/inicio'); 
        }
      }
      
      onSubmit();
    }).catch((error) => {
      console.error("Error en el login:", error);
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 400);
    }
  }, [loginStatus]);
//para el envio
  const onSubmit = () => {
    setLoginCorreo('');
    setLoginPassword('');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            {loginStatus && (
              <div className={`alert alert-danger ${statusHolder}`}>
                {loginStatus}
              </div>
            )}
            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label htmlFor="logincorreo" className="form-label">Correo</label>
                <input
                  type="email"
                  id="logincorreo"
                  value={logincorreo}
                  onChange={(e) => setLoginCorreo(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginpassword" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="loginpassword"
                  value={loginpassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar Sesión
              </button>
            </form>
            <div className="mt-3 text-center">
              <p>¿No tienes una cuenta? <a href="/register">Registrarse</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

