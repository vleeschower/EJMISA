import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Cliente = () => {
  const [userInfo, setUserInfo] = useState(null);  
  const [nombre, setNombre] = useState('');   
  const [correo, setCorreo] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza a la parte superior

    const user = localStorage.getItem('user'); // Verifica si hay un usuario en el localStorage

    if (!user) {
      return <Navigate to="/login" />; // Si no hay usuario, redirige al login
    }

    const userData = JSON.parse(user);
    const { id_usuario } = userData;

    axios.get(`http://localhost:3002/api/admin_usuarios/${id_usuario}`)
      .then(response => {
        const { nombre, correo, password } = response.data;
        setUserInfo(response.data);
        setNombre(nombre);
        setCorreo(correo);
        setPassword(password);
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
      });

       // Obtener los pedidos del usuario
        axios.get(`http://localhost:3002/api/pedidos/${id_usuario}`)
        .then(response => {
          console.log('Pedidos:', response.data);
          setPedidos(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los pedidos:', error);
        });

  }, []);

   // Función para manejar el clic en "Ver detalles"
   const verDetalles = (id_ventas) => {
    axios.get(`http://localhost:3002/api/pedidos/detalle/${id_ventas}`)
      .then(response => {
        console.log('Detalles del pedido:', response.data); // Verifica los datos recibidos 
        if (response.data && response.data.length > 0){
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
        console.error('No se encontraron detalles para este pedido.'); }
      })
      .catch(error => {
        console.error('Error al obtener los detalles del pedido:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3002/api/admin_usuarios/${userInfo.id_usuario}`, { nombre, correo, password })
      .then(() => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Perfil actualizado con éxito.',
          icon: 'success',
          confirmButtonColor: '#30449e',
          confirmButtonText: 'Ok'
        }).then(() => {
          localStorage.setItem('user', JSON.stringify({
            ...userInfo,
            nombre,
            correo,
            password
          }));
        });
      })
      .catch(error => {
        console.error('Error al actualizar el perfil:', error);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-auto mb-3">Mi Perfil</h2>
      <hr className="mb-4" />

      {/* Formulario para editar la información del cliente */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="bg-light shadow-lg rounded p-4 border border-primary">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Actualizar Perfil</button>
          </form>
        </div>
      </div>

      {/* Formulario para mostrar los pedidos */}
      <div className="mt-5">
        <h2 className="text-auto mb-3">Mis pedidos</h2>
        <hr className="mb-4" />
        <table className="table table-bordered table-success mt-3">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
          {pedidos.length > 0 ? pedidos.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.pedido}</td>
              <td>{pedido.estado}</td>
              <td>${pedido.total}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => verDetalles(pedido.pedido)}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="text-center">Sin pedidos</td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cliente;
