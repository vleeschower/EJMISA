import React from 'react'

const AdminInicio = () => {
  return (
    <div className='px-3'>
      <div className='container-fluid'>
        <div className='row g-3 my-2'>

          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>100</h3>
                <p className='fs-5'>Productos</p>
              </div>
              <i className='bi bi-basket p-3 fs-1'></i>
            </div>
          </div>

          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>10</h3>
                <p className='fs-5'>Pedidos</p>
              </div>
              <i className='bi bi-cart-plus p-3 fs-1'></i>
            </div>
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default AdminInicio
