import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los pedidos:', error);
      });
  }, []);

  const handleEstadoChange = (id_ventas, nuevoEstado) => {
    axios.put(`http://localhost:3002/api/pedidos/${id_ventas}`, { estado: nuevoEstado })
      .then(() => {
        setPedidos(pedidos.map(pedido => 
          pedido.pedido === id_ventas ? { ...pedido, estado: nuevoEstado } : pedido
        ));
      })
      .catch(error => {
        console.error('Error al actualizar el estado del pedido:', error);
      });
  };

  // Función para manejar el clic en "Ver detalles"
  const verDetalles = (id_ventas) => {
    axios.get(`http://localhost:3002/api/pedidos/detalle/${id_ventas}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          Swal.fire({
            title: 'Detalles del Pedido',
            html: `
              <ul>
                ${response.data.map(detalle => `
                  <li>
                    Producto: ${detalle.producto} <br/>
                    Cantidad: ${detalle.cantidad} <br/>
                    Precio unitario: $${detalle.precio_unitario} <br/>
                    Subtotal: $${detalle.sub_total}
                  </li>
                `).join('')}
              </ul>
            `,
            confirmButtonText: 'Cerrar'
          });
        } else {
          console.error('No se encontraron detalles para este pedido.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los detalles del pedido:', error);
      });
  };

  return (
    <div className='px-3'>
      <div className='container-fluid'>
        <div className="row my-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="text-white">Pedidos</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="table-responsive bg-white shadow-sm rounded p-3">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Pedido</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length > 0 ? pedidos.map((pedido, index) => (
                    <tr key={index}>
                      <td>{pedido.pedido}</td>
                      <td>{pedido.usuario}</td>
                      <td>
                        <select 
                          value={pedido.estado} 
                          onChange={(e) => handleEstadoChange(pedido.pedido, e.target.value)}
                          className="form-select"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En proceso">En proceso</option>
                          <option value="Listo para recoger">Listo para recoger</option>
                        </select>
                      </td>
                      <td>${pedido.total}</td>
                      <td>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => verDetalles(pedido.pedido)}
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="text-center">Sin pedidos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
