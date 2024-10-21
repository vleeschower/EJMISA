import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import "./header.css"

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
        <Link to="/" className='title'>EJMISA</Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to="/inicio">Inicio</NavLink>
            </li>
            <li>
                <NavLink to="/nosotros">Nosotros</NavLink>
            </li>
            <li>
                <NavLink to="/contacto">Contacto</NavLink>
            </li>
        </ul>
    </nav>  
  );
};

