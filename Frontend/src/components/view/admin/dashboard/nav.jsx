import React from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse'

const Nav = ({Toggle}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className='container-fluid d-flex align-items-center justify-content-between'>

        <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle} style={{ cursor: 'pointer' }} ></i>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation"><i className='bi bi-justify fs-4'></i></button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text_white" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">EJMISA</a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" href="#"><i className="bi bi-person"></i> Perfil</a>
                <a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right"></i> Salir</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

