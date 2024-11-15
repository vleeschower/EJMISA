import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './dashboard.css'
import { Link } from 'react-router-dom';

const Dashboard = ({ handleLinkClick }) => {
  const handleClick = () => {
    if (window.innerWidth < 768) { // Cambia el tamaño según tus necesidades
      handleLinkClick(); // Cierra el menú si la pantalla es pequeña
    }
  };

  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className="bi bi-tools me-3 fs-4"></i>
        <span className='brand-name fs-4'>EJMISA</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>

        <Link to="/admin/inicio" className='list-group-item py-2' onClick={handleClick}>
          <i className='bi bi-house fs-3 me-3'></i>
          <span>Inicio</span>
        </Link>

        <Link to="/admin/productos" className='list-group-item py-2' onClick={handleClick}>
          <i className='bi bi-basket fs-3 me-3'></i>
          <span>Productos</span>
        </Link>

        <Link to="/admin/categorias" className='list-group-item py-2' onClick={handleClick}>
          <i className='bi bi-tag fs-3 me-3'></i>
          <span>Categorias</span>
        </Link>

        <Link to="/admin/usuarios" className="list-group-item py-2" onClick={handleClick}>
          <i className="bi bi-people fs-3 me-3"></i>
          <span>Usuarios</span>
        </Link>

        <Link to="/admin/pedidos" className="list-group-item py-2" onClick={handleClick}>
          <i className="bi bi-cart fs-3 me-3"></i>
          <span>Pedidos</span>
        </Link>

      </div>

    </div>
      
  );
};

export default Dashboard;


