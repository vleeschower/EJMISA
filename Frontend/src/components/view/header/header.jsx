import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import logo from '../../images/publico/iconoEJMISA.png';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Nuevo estado para el menú desplegable de categorías

    // Función para manejar el clic en los enlaces y cerrar el menú
    const handleNavLinkClick = () => {
        setMenuOpen(false);
    };

    // Función para manejar el clic en el botón de Productos y mostrar el menú desplegable
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
                            <NavLink to="/inicio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/nosotros" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
                                Nosotros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
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
                        <li className="nav-item">
                            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
                                Iniciar Sesión
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>
                                Registrarse
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
