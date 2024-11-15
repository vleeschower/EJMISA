import {useEffect} from 'react';
import './contacto.css';
import fotoCONTACTO from '../../images/publico/CONTACTO.jpg'

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar a la parte superior
  }, []); 

  return (
    <div className="container my-5">
      <h2 className="text-auto mb-3">CONTACTO</h2>
      <hr className="mb-4" />

      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <p className="lead">¿Desea ponerse en contacto con nosotros?</p>
          <p>Puede hacerlo en horarios de oficina a los teléfonos:</p>
          <p className="font-weight-bold">
            921 212 5474<br />
            921 225 5429
          </p>
          <p>Sera un gusto atenderle.</p>
          <p>También puede hacerlo mediante los correos:</p>
          <p className="font-weight-bold">
            paty.aguilar@ejmisa.com.mx<br />
            pablo.villalobos@ejmisa.com.mx<br />
            ventas@ejmisa.com.mx
          </p>
        </div>
      </div>

      {/* Imagen */}
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          <img src={fotoCONTACTO} alt="Contacto" className="img-fluid rounded shadow" />
        </div>
      </div>
    </div>
  );
};

export default Contacto;

