import React from 'react';
import { Link } from 'react-router-dom';

const AdminInicio = () => {
  return (
    <div className='container-fluid px-3'>
      <div className='row g-3 my-2'>

        <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-1'>
          <Link to="/admin/productos" className='text-decoration-none'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-between align-items-center rounded'>
              <div>
                <h3 className='fs-4'>Productos</h3>
              </div>
              <i className='bi bi-basket p-3 fs-1'></i>
            </div>
          </Link>
        </div>

        <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-1'>
          <Link to="/admin/categorias" className='text-decoration-none'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-between align-items-center rounded'>
              <div>
                <h3 className='fs-4'>Categorías</h3>
              </div>
              <i className='bi bi-tag p-3 fs-1'></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminInicio;