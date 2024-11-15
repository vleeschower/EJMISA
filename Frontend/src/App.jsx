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
import ConfirmacionCompra from "./components/view/productos/ConfirmacionCompra";
import Perfil from "./components/view/admin/perfil/perfil";
import Cliente from "./components/view/cliente/cliente";
import Pedidos from "./components/view/admin/pedidos/pedidos";

import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route path="/productos/confirmar-compra" element={<ConfirmacionCompra categoriaId="ConfirmacionCompra" />} />
          <Route path="/perfil" element={<Cliente /> } />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<AdminLayout />}>
          <Route path="/admin/inicio" element={ <ProtectedRoute><AdminInicio /></ProtectedRoute>} />
          <Route path="/admin/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
          <Route path="/admin/AgregarProducto" element={<ProtectedRoute><AgregarProducto /></ProtectedRoute>} />
          <Route path="/admin/EditarProducto/:id" element={<ProtectedRoute><EditarProducto /></ProtectedRoute>} />
          <Route path="/admin/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
          <Route path="/admin/EditarCategoria/:id_categoria" element={<ProtectedRoute><EditarCategoria /></ProtectedRoute>} />
          <Route path="/admin/AgregarCategoria" element={<ProtectedRoute><AgregarCategoria /></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          <Route path="/admin/AgregarAdmin" element={<ProtectedRoute><AgregarAdmin /></ProtectedRoute>} />
          <Route path="/admin/EditarUsuario/:id_usuario" element={<ProtectedRoute><EditarUsuario /></ProtectedRoute>} />
          <Route path="/admin/Perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/admin/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
