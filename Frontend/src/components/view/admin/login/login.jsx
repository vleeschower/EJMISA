import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [correo, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Correo</label>
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
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


