import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './dashboard.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className="bi bi-tools me-3 fs-4"></i>
        <span className='brand-name fs-4'>EJMISA</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>

        <Link to="/admin/inicio" className='list-group-item py-2'>
          <i className='bi bi-house fs-3 me-3'></i>
          <span>Inicio</span>
        </Link>

        <Link to="/admin/productos" className='list-group-item py-2'>
          <i className='bi bi-basket fs-3 me-3'></i>
          <span>Productos</span>
        </Link>
      </div>

    </div>
      
  );
};

export default Dashboard;


