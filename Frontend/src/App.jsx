import { Route, Routes} from "react-router-dom";
import "./App.css"

import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Inicio from "./components/view/inicio/inicio";
import Nosotros from "./components/view/nosotros/nosotros";
import Contacto from "./components/view/contacto/contacto";

import Login from "./components/view/admin/login/login";
import Register from "./components/view/register/register";

import AdminInicio from "./components/view/admin/inicio/AdminInicio";
import Productos from "./components/view/admin/productos/Productos";
import AgregarProducto from "./components/view/admin/productos/AgregarProducto";
import EditarProducto from "./components/view/admin/productos/EditarProducto";
import Categorias from "./components/view/admin/categorias/Categorias";
import EditarCategoria from "./components/view/admin/categorias/EditarCategoria";
import AgregarCategoria from "./components/view/admin/categorias/AgregarCategoria";
import Usuarios from "./components/view/admin/usuarios/usuarios";
import EditarUsuario from "./components/view/admin/usuarios/EditarUsuario";
import AgregarAdmin from "./components/view/admin/usuarios/AgregarAdmin";
import ProductosClientes from "./components/view/productos/productos";
import Tuercas from "./components/view/productos/Tuercas";
import ConfirmacionCompra from "./components/view/productos/ConfirmacionCompra";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos" element={<ProductosClientes />} />
          {/* <Route path="/productos/tuercas" element={<Tuercas categoriaId="tuercas" />} /> //navegar en otra pagina  */}
          <Route path="/productos/confirmar-compra" element={<ConfirmacionCompra categoriaId="ConfirmacionCompra" />} /> //navegar en otra pagina 
          // Dentro de tu componente App en las rutas
          <Route path="/tuercas" element={<Tuercas />} /> //pagina siguiente

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<AdminLayout />}>
          <Route path="/admin/inicio" element={<AdminInicio />} />
          <Route path="/admin/productos" element={<Productos />} />
          <Route path="/admin/AgregarProducto" element={<AgregarProducto />} />
          <Route path="/admin/EditarProducto/:id" element={<EditarProducto />} />
          <Route path="/admin/categorias" element={<Categorias />} />
          <Route path="/admin/EditarCategoria/:id_categoria" element={<EditarCategoria />} />
          <Route path="/admin/AgregarCategoria" element={<AgregarCategoria />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/AgregarAdmin" element={<AgregarAdmin />} />
          <Route path="/admin/EditarUsuario/:id_usuario" element={<EditarUsuario />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
