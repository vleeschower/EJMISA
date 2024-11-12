import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole'); // Obteniendo el rol desde localStorage

  // Verificar si el rol es "admin" para permitir el acceso
  if (userRole === 'admin') {
    return children;
  } else {
    return <Navigate to="/login" />; // Redirige al login si no hay rol o no es admin
  }
};

export default ProtectedRoute;
