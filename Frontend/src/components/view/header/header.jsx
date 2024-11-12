import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import Swal from 'sweetalert2';
import logo from '../../images/publico/iconoEJMISA.png'

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Verifica si el usuario está autenticado revisando localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!user);
    }, []);

     // Función para manejar el clic en los enlaces y cerrar el menú
     const handleNavLinkClick = () => {
        setMenuOpen(false);
    };

    const logout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#30449e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión', 
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('userRole');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                navigate('/');
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
            <Link to="/" className='navbar-brand'>
                <img src={logo} alt="EJMISA Logo" className="logo" />
            </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    aria-controls="navbarNav" 
                    aria-expanded={menuOpen} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink 
                                to="/inicio" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={handleNavLinkClick}
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/nosotros" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={handleNavLinkClick}
                            >
                                Nosotros
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink 
                                to="/contacto" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={handleNavLinkClick}
                            >
                                Contacto
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/productos" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={handleNavLinkClick}
                            >
                                Productos
                            </NavLink>
                        </li>

                        {/* Mostrar estas opciones solo si el usuario no está autenticado */}
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/login" 
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        onClick={handleNavLinkClick}
                                    >
                                        Iniciar Sesión
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/register" 
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        onClick={handleNavLinkClick}
                                    >
                                        Registrarse
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            // Si el usuario está autenticado, mostrar opciones como el perfil y logout
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/perfil" 
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        onClick={handleNavLinkClick}
                                    >
                                        <i className="bi bi-person"></i> Perfil
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link cursor-pointer" 
                                        onClick={logout}
                                    >
                                        <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                                    </a>
                                </li>
                            
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};