import React, {useEffect} from 'react';
import './inicio.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoEJMISA from '../../images/publico/fotoEJMISA.jpg';
import fotoTornillo from '../../images/publico/tornillos.jpg'
import fotoEspa from '../../images/publico/esparragos.jpg'
import fotoJunta from '../../images/publico/juntas.jpg'
import foto2 from '../../images/publico/foto2.jpg'
import neopreno from '../../images/publico/neopreno.jpg'
import laminas from '../../images/publico/laminas.jpg'
import tuerca from '../../images/publico/tuerca.jpg'
import fondoT from '../../images/publico/cropped-tornillos.jpg'
import { Link} from 'react-router-dom';

const Inicio = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar a la parte superior
  }, []); 

  return (
    <div className="container-fluid p-0">
      {/* Sección con imagen de fondo */}
      <div
        className="position-relative hero-section text-white text-center"
        style={{ backgroundImage: `url(${fotoEJMISA})` }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-1 fw-bold">EJMISA</h1>
          <p className="lead">ESPARRAGOS, JUNTAS Y MATERIALES INDUSTRIALES</p>
          <a href="/productos" className="btn btn-warning btn-lg px-4 py-3 mt-4 text-white">NUESTROS PRODUCTOS</a>
        </div>
      </div>

      <div className='container text-center my-5'>
        <h2>Conocemos las necesidades de la industria y por ello contamos con el inventario necesario para satisfacerlas y atenderlas.</h2>
        <hr className='mb-5 mx-auto'/>
        
        <div className='row'>
          <div className='col-12 col-md-4 mb-3'>
            <div className='shadow p-4 mb-4 bg-body rounded hover-effect'>
              <img src={fotoTornillo} alt="Tornilleria" className='img-fluid' />
              <h2 className='text-warning my-3'>TORNILLERÍA</h2>
              <p className="text-secondary">Arandela plana, de presión, pijas, tuercas, etc.</p>
            </div>
          </div>

          <div className='col-12 col-md-4 mb-3'>
            <div className='shadow p-4 mb-4 bg-body rounded hover-effect'>
              <img src={fotoEspa} alt="espárragos" className='img-fluid' />
              <h2 className='text-warning my-3'>ESPÁRRAGOS</h2>
              <p className="text-secondary">Grado B7, B16, tipo 304, 316, acero inoxidable y mas.</p>
            </div>
          </div>

          <div className='col-12 col-md-4 mb-3'>
            <div className='shadow p-4 mb-4 bg-body rounded hover-effect'>
              <img src={fotoJunta} alt="juntas espirometálicas" className='img-fluid' />
              <h2 className='text-warning my-3'>JUNTAS ESPIROMETÁLICAS</h2>
              <p className="text-secondary">Amplio surtido todo tipo de Juntas</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-0'>
        <div className='row align-items-center'>
          <div className='col-12 col-md-6 text-start'>
            <h2>En EJMISA</h2>
            <hr className='mb-5'/>
            <p className="text-secondary">ESPARRAGOS, JUNTAS Y MATERIALES INDUSTRIALES, S.A. Nos dedicamos a la distribución y comercialización de espárragos, tornillos, tuercas, arandelas planas, arandela de presión, pijas, tuercas de seguridad, empaques, lámina de neopreno, y demás materiales industriales.</p>
          </div>
          <div className='col-12 col-md-6'>
            <div className=' p-4 my-5 bg-body'>
              <img src={foto2} alt="juntas espirometálicas" className='img-fluid' />
            </div>
          </div>
        </div>
      </div>

      <div className='container text-center my-5'>
        <h2 className='mt-5'>Estamos comprometidos con nuestros clientes, ofreciéndoles la mejor calidad y servicio a precios competitivos.</h2>
        <hr className='mb-5 mx-auto'/>
        <p className='mb-5 text-secondary'>Con nosotros encontraras: Espárragos, tornillos, tuercas, arandela plana, arandela de presión, pijas, tuercas de seguridad en acero inoxidable, empaques, cintas de teflón, cinta de asbesto , cinta de fibra de vidrio, empaque cuadrado tipo buna, empaque cuadrado tipo viton, empaque cuadrado de epdm, orings de neopreno, viton epdm nitrilo, etc. redondos de neopreno, viton, epdm, nitrilo, etc. empaquetadura sección cuadrada de grafito, empaquetadura sección cuadrada de teflón, empaquetadura sección cuadrada de kevlar, lamina de neopreno, lamina de nitrilo, lamina de viton, lamina de hule sbr, lamina de asbesto grafitado, lamina libre de asbesto, lamina con fibra de carbón, loctite, taquetes de expansión, clavos, pijas.
        </p>
        
        <div className='row justify-content-center'>
          <div className='col-12 col-md-3 mb-4'>
            <div className='position-relative'>
              <img src={neopreno} alt="neopreno" className='img-fluid hover-effect' />
              <div className='overlay'>
                <h2 className='text-white'>NEOPRENO</h2>
              </div>
            </div>
          </div>

          <div className='col-12 col-md-3 mb-4'>
            <div className='position-relative'>
              <img src={laminas} alt="laminas" className='img-fluid hover-effect' />
              <div className='overlay'>
                <h2 className='text-white'>LAMINAS LIBRES DE ASBESTO</h2>
              </div>
            </div>
          </div>

          <div className='col-12 col-md-3 mb-4'>
            <div className='position-relative'>
              <img src={tuerca} alt="tuerca" className='img-fluid hover-effect' />
              <div className='overlay'>
                <h2 className='text-white'>TUERCAS</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección con imagen de fondo */}
      <div
        className="position-relative hero-section text-white text-center"
        style={{ backgroundImage: `url(${fondoT})`, maxHeight: '400px' }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <h3 className="fw-bold text-white">Descubre nuestro inventario, listo para entrega inmediata</h3>
          <a href="/productos" className="btn btn-warning btn-lg px-4 py-3 mt-4 text-white">VER PRODUCTOS</a>
        </div>
      </div>

      {/* Sección de íconos de contacto */}
      <div className="container text-center my-5">
        <div className="row">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Link to="/contacto" className="text-decoration-none text-dark d-flex flex-column align-items-center rounded hover-effect">
              <i className="bi bi-envelope fs-3 me-2"></i>
              <p>EMAIL</p>
            </Link>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Link to="/contacto" className="text-decoration-none text-dark d-flex flex-column align-items-center rounded hover-effect">
              <i className="bi bi-geo-alt fs-3 me-2"></i>
              <p>DIRECCIÓN</p>
            </Link>
          </div>
          <div className="col-12 col-md-4">
            <Link to="/contacto" className="text-decoration-none text-dark d-flex flex-column align-items-center rounded hover-effect">
              <i className="bi bi-telephone fs-3 me-2"></i>
              <p>TELÉFONO</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

