import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './productos.css';

const Tuercas = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState({});
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Crear instancia de navigate
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar a la parte superior
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/productos'); // Cambia esta URL si es necesario
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleAddProduct = (producto) => {
    if (!isAuthenticated) {
      alert('¡Por favor, regístrate para agregar un producto!'); // Alerta en lugar de mensaje
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
    if (!isAuthenticated) {
      alert('¡Por favor, regístrate para quitar un producto!'); // Alerta en lugar de mensaje
      return;
    }

    const cantidadActual = productosSeleccionados[producto.id] || 0;
    if (cantidadActual > 0) {
      const nuevaCantidad = cantidadActual - 1;
      setProductosSeleccionados({
        ...productosSeleccionados,
        [producto.id]: nuevaCantidad,
      });
      setTotal(total - producto.precio);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log('Usuario autenticado');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProductosSeleccionados({});
    setTotal(0);
    console.log('Usuario cerrado sesión');
  };

  const handleBuy = () => {
    if (total === 0) {
      alert('¡No has agregado ningún producto al carrito!');
      return;
    }

    // Navegar a la página de confirmar compra
    navigate('/confirmar-compra', {
      state: { productosSeleccionados, total } // Pasar el estado a la nueva página
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-auto mb-3">TUERCAS</h2>
      <hr className="mb-4" />

      {/* Botones de iniciar y cerrar sesión */}
      <button onClick={handleLogin} className="btn btn-success mx-1">Comenzar Comprar</button>
      <button onClick={handleLogout} className="btn btn-danger mx-1">Parar Compra</button>

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
                <button
                  className="boton-agregar"
                  onClick={() => handleAddProduct(producto)}
                  disabled={!isAuthenticated}
                >
                  Agregar
                </button>
                <button
                  className="boton-quitar"
                  onClick={() => handleRemoveProduct(producto)}
                  disabled={!isAuthenticated || !productosSeleccionados[producto.id]}
                >
                  Quitar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de comprar fijado en la parte inferior con un estilo compacto */}
      <div className="fixed-bottom p-3">
        <div className="comprar-container">
          <h3>Total: ${total}</h3>
          <button onClick={handleBuy} className="btn btn-primary" disabled={total === 0}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tuercas;
