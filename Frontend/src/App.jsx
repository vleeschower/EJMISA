import { Route, Routes} from "react-router-dom";
import "./App.css"

import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Inicio from "./components/view/inicio/inicio"
import Nosotros from "./components/view/nosotros/nosotros"
import Contacto from "./components/view/contacto/contacto"

import Login from "./components/view/admin/login/login"
import Register from "./components/view/register/register";

import AdminInicio from "./components/view/admin/inicio/AdminInicio";
import Productos from "./components/view/admin/productos/Productos";
import AgregarProducto from "./components/view/admin/productos/AgregarProducto";
import EditarProducto from "./components/view/admin/productos/EditarProducto";
import Categorias from "./components/view/admin/categorias/Categorias";
import EditarCategoria from "./components/view/admin/categorias/EditarCategoria";
import AgregarCategoria from "./components/view/admin/categorias/AgregarCategoria";

function App() {

  return (
    <div className="App">
    <Routes>
    
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>

      <Route path="/admin" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<AdminLayout />}>
        <Route path="/admin/inicio" element={<AdminInicio />} />
        <Route path="/admin/productos" element={<Productos />} />
        <Route path="/admin/AgregarProducto" element={<AgregarProducto />} />
        <Route path="/admin/EditarProducto/:id" element={<EditarProducto />} />
        <Route path="/admin/categorias" element={<Categorias />} />
        <Route path="/admin/EditarCategoria/:id_categoria" element={<EditarCategoria />} />
        <Route path="/admin/AgregarCategoria" element={<AgregarCategoria />} />

      </Route>

    </Routes>
  </div>
  );
}

export default App;


