import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import logo from '../../images/publico/iconoEJMISA.png'

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/nosotros" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Nosotros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/contacto" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

