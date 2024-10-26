import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [correo, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(correo) || !validatePassword(password)) {
      setError('Verifique su correo electrónico y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }), 
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Error al conectar con el servidor.');
      console.error('Error en la solicitud:', error); 
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                  type="email"
                  id="correo"
                  value={correo}
                  onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Ingresar'}
              </button>
            </form>
            <div className="mt-3 text-center">
              <p>
                ¿No tienes una cuenta? <a href="/register">Registrarse como cliente</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;