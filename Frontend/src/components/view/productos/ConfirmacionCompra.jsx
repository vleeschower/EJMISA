import { useLocation } from 'react-router-dom';

const ConfirmacionCompra = () => {
  const location = useLocation();
  const { productosSeleccionados, total } = location.state || { productosSeleccionados: {}, total: 0 };

  const productos = Object.keys(productosSeleccionados).map(id => {
    const cantidad = productosSeleccionados[id];
    return { id, cantidad };
  });

  return (
    <div className="container my-5">
      <h2>Confirmación de Compra</h2>
      <hr />
      <h3>Total a Pagar: ${total}</h3>
      <h4>Productos:</h4>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            Producto ID: {producto.id}, Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmacionCompra;
