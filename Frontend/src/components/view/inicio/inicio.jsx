import React from 'react';
import './inicio.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoEJMISA from '../../images/publico/fotoEJMISA.jpg';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="container-fluid p-0">
      {/* Sección con imagen de fondo */}
      <div
        className="position-relative hero-section"
        style={{ backgroundImage: `url(${fotoEJMISA})` }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white text-center">
          <h1 className="display-1 fw-bold">EJMISA</h1>
          <p className="lead">ESPARAGOS, JUNTAS Y MATERIALES INDUSTRIALES</p>
          <a href="#" className="btn btn-warning btn-lg px-5 py-3 mt-4 text-white">NUESTROS PRODUCTOS</a>
        </div>
      </div>

      {/* Sección de íconos de contacto */}
      <div className="container text-center my-5">
        <div className="row">
          <div className="col">
            <Link to="/contacto" className="text-decoration-none text-dark">
              <i className="bi bi-envelope fs-3 me-3"></i>
              <p>EMAIL</p>
            </Link>
          </div>
          <div className="col">
            <Link to="/contacto" className="text-decoration-none text-dark">
              <i className="bi bi-geo-alt fs-3 me-3"></i>
              <p>DIRECCIÓN</p>
            </Link>
          </div>
          <div className="col">
            <Link to="/contacto" className="text-decoration-none text-dark">
              <i className="bi bi-telephone fs-3 me-3"></i>
              <p>NÚMERO DE TELÉFONO</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

