import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './productos.css';

const ProductosClientes = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState({});
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCart, setShowCart] = useState(false); // Controla la visibilidad del carrito flotante

  useEffect(() => {
    fetchProductos();

    const user = localStorage.getItem('user');
    console.log('Usuario en localStorage:', user);
    setIsAuthenticated(!!user); // Verifica si el usuario está en localStorage
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleAddProduct = (producto) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Por favor, inicia sesión para agregar un producto al carrito.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const nuevaCantidad = (productosSeleccionados[producto.id] || 0) + 1;
    setProductosSeleccionados({
      ...productosSeleccionados,
      [producto.id]: nuevaCantidad,
    });
    setTotal(total + producto.precio);
  };

  const handleRemoveProduct = (producto) => {
    const cantidadActual = productosSeleccionados[producto.id] || 0;
    if (cantidadActual > 1) {
      setProductosSeleccionados({
        ...productosSeleccionados,
        [producto.id]: cantidadActual - 1,
      });
      setTotal(total - producto.precio);
    } else {
      const updatedSelection = { ...productosSeleccionados };
      delete updatedSelection[producto.id];
      setProductosSeleccionados(updatedSelection);
      setTotal(total - producto.precio);
    }
  };

  const handleBuy = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Por favor, inicia sesión para realizar una compra.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    if (total === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: '¡No has agregado ningún producto al carrito!',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    // Obtener el usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Usuario obtenido:', user);
    const id_usuario = user ? user.id_usuario : null;
  
    if (!id_usuario) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
        text: 'No se pudo obtener el usuario para realizar la compra.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    // Crear el arreglo de productos
    const productosParaCompra = Object.keys(productosSeleccionados).map(id => {
      const producto = productos.find(prod => prod.id === parseInt(id));
      return { id_producto: producto.id, cantidad: productosSeleccionados[id] };
    });
  
    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:3002/api/compra/compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario, productos: productosParaCompra }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Si la compra es exitosa, vaciar el carrito y mostrar mensaje
        setProductosSeleccionados({});
        setTotal(0);
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa',
          text: '¡Gracias por tu compra!',
          confirmButtonText: 'Aceptar',
        });
        setShowCart(false);
      } else {
        // Mostrar error en caso de fallo
        Swal.fire({
          icon: 'error',
          title: 'Error en la compra',
          text: data.message || 'Hubo un problema al realizar la compra.',
          confirmButtonText: 'Aceptar',
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Función para manejar la apertura del carrito
  const openCart = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Necesitas iniciar sesión para ver el carrito y terminar la compra.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setShowCart(true); // Abre el carrito si está autenticado
  };

  return (
    <div className="container my-5">
      <h2 className="text-auto mb-3">PRODUCTOS</h2>
      <hr className="mb-4" />

      <div className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card hover-effect my-4 mx-2 shadow">
            <img src={`http://localhost:3002/imagenes/${producto.imagen}`} alt={producto.producto} />
            <h4 className="text-warning my-1">{producto.producto}</h4>
            <p className="text-secondary">{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p className="text-secondary">Categoría: {producto.nombre}</p>
            <div className="producto-cantidad">
              <span>Cantidad: {productosSeleccionados[producto.id] || 0}</span>
              <div className="botones">
                <button className="boton-agregar" onClick={() => handleAddProduct(producto)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para abrir el carrito flotante */}
      <button className="btn btn-secondary fixed-bottom m-3 fw-bolder" onClick={openCart}>
        Ver Carrito / Terminar Compra
      </button>

      {/* Carrito flotante */}
      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <h4>Carrito de Compras</h4>
            <button className="close-cart" onClick={() => setShowCart(false)}>
              X
            </button>
            <ul className='p-0'>
              {Object.keys(productosSeleccionados).map((id) => {
                const producto = productos.find((prod) => prod.id === parseInt(id));
                const cantidad = productosSeleccionados[id];
                return (
                  <li key={id} className="cart-item m-2">
                    <span className='m-1'>{producto.producto}</span>
                    <span className='m-1'>Precio: ${producto.precio}</span>
                    <span className='m-1'>Cantidad: {cantidad}</span>
                    <button onClick={() => handleAddProduct(producto)}>+</button>
                    <button onClick={() => handleRemoveProduct(producto)}>-</button>
                  </li>
                );
              })}
            </ul>
            <h4>Total: ${total}</h4>
            <button className="btn btn-primary" onClick={handleBuy}>
              Terminar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosClientes;
