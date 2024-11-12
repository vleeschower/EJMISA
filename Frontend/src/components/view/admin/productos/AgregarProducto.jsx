import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [id_categoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  //obtener categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('producto', producto);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('id_categoria', id_categoria);
    if (imagen) formData.append('imagen', imagen);

    try {
      await axios.post('http://localhost:3002/api/productos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Mostrar alerta de éxito
      Swal.fire({
        title: 'Éxito!',
        text: 'Producto agregado con éxito.',
        icon: 'success',
        confirmButtonColor: '#30449e',
        confirmButtonText: 'Ok',
      });

      // Limpiar el formulario después de agregar el producto
      setProducto('');
      setDescripcion('');
      setPrecio('');
      setIdCategoria('');
      setImagen(null);

      // Redirigir a la lista de productos
      navigate('/admin/productos');

    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-white">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">

        <div className="mb-3">
          <label htmlFor="producto" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select
            className="form-control"
            id="categoria"
            value={id_categoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
          >
            <option value="" hidden>Seleccione una categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Agregar Producto</button>
          <Link to="/admin/productos" className='btn btn-danger'>
              Cancelar
            </Link>
        </div>

      </form>
    </div>
  );
};

export default AgregarProducto;