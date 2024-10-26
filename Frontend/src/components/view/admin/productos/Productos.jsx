import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  // Obtener los productos desde la API
  useEffect(() => {
    axios.get('http://localhost:3002/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

   // Función para eliminar un producto
   const eliminarProducto = (id) => {
    // Muestra la alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procede a eliminar el producto
        axios.delete(`http://localhost:3002/api/productos/${id}`)
          .then(response => {
            console.log(response.data);
            // Actualizar la lista de productos
            setProductos(productos.filter(producto => producto.id !== id));
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error al eliminar el producto:', error);
          });
      }
    });
  };

  return (
    <div className='px-3'>
      <div className='container-fluid'>

      <div className="row my-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="text-white">Productos</h2>
            <Link to="/admin/AgregarProducto" className='btn btn-primary'>
              Agregar Producto
            </Link>
          </div>
        </div>
    
        <div className="row">
          <div className="col-12">
            <div className="table-responsive bg-white shadow-sm rounded p-3">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>

                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.producto}</td>
                      <td>{producto.descripcion}</td>
                      <td>$ {producto.precio}</td>
                      <td>{producto.nombre}</td>
                      <td>
                        <Link to={`/admin/EditarProducto/${producto.id}`} className='btn btn-warning text-white'>
                          Editar
                        </Link>
                      </td>
                      <td>
                        <button className='btn btn-danger' onClick={() => eliminarProducto(producto.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Productos
