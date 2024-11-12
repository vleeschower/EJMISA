import { useEffect, useState } from 'react';
import './productos.css';

const ProductosClientes = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState({});
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductos();
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
      alert('¡Por favor, regístrate para agregar un producto!');
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
      alert('¡Por favor, regístrate para quitar un producto!');
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
    console.log('Usuario cerró sesión');
  };

  const handleBuy = async () => {
    if (total === 0) {
      alert('¡No has agregado ningún producto al carrito!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/compras/comprar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: 1, // Ajusta el ID del usuario según tu lógica de autenticación
          productosSeleccionados,
          total,
        }),
      });

      const data = await response.json();
      if (data.message === 'Compra registrada exitosamente') {
        setCompraExitosa(true);
        setProductosSeleccionados({});
        setTotal(0);
      } else {
        alert('Hubo un problema al realizar la compra');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un problema al realizar la compra');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-auto mb-3">PRODUCTOS</h2>
      <hr className="mb-4" />

      <button onClick={handleLogin} className="btn btn-success mx-1">Comenzar Compra</button>
      <button onClick={handleLogout} className="btn btn-danger mx-1">Parar Compra</button>

      {compraExitosa && (
        <div className="alert alert-success text-center">
          ¡Compra exitosa!
        </div>
      )}

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

export default ProductosClientes;
