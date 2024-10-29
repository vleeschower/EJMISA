import React, {useEffect} from 'react'
import './nosotros.css'
import foto2 from '../../images/publico/foto2.jpg'
import tornilleria from '../../images/publico/tornilleria.jpg'

const Nosotros = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar a la parte superior
  }, []); 

  return (
    <div className="container-fluid my-5">

      <div className='container mt-0'>
        <div className='row align-items-center'>
          <div className='col-12 col-md-6 text-start'>
            <h2>NOSOTROS</h2>
            <hr className='mb-5'/>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h2 className='mb-3'>EJMISA</h2>
          <h2 className='fw-normal mb-3'>ESPARRAGOS, JUNTAS Y MATERIALES INDUSTRIALES</h2>

          {/* Imagen */}
          <div className="row my-5">
            <div className="col-md-6 mx-auto">
              <img src={foto2} alt="Contacto" className="img-fluid rounded shadow-sm" />
            </div>
          </div>
          <p className="text-secondary">Estamos ubicados en Coatzacoalcos, Veracruz y nos dedicamos a la distribución y comercialización de espárragos, tornillos, tuercas, arandelas planas, arandela de presión, pijas, tuercas de seguridad, empaques, lámina de neopreno, y demás materiales industriales.</p>
        </div>
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-lg-10 col-md-12">
          <table className="table table-bordered text-center table-hover w-100">
            <tbody>
              <tr>
                <td className="p-3 fw-bold">NUESTRO COMPROMISO CON TODOS NUESTROS CLIENTES ES, OFRECERLES LA MEJOR CALIDAD Y SERVICIO A PRECIOS COMPETITIVOS.</td>
              </tr>
              <tr>
                <td className="p-3">Conocemos las necesidades de la industria y por ello contamos con el inventario necesario para satisfacerlas y atenderlas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='container mt-5'>
        <div className='row align-items-center'>
          <div className='col-12 col-md-6 text-start'>
            <h2>EJMISA</h2>
            <hr className='mb-5'/>
            <p className="text-secondary">Con nosotros encontraras: Espárragos, tornillos, tuercas, arandela plana, arandela de presión, pijas, tuercas de seguridad en acero inoxidable, empaques, cintas de teflón, cinta de asbesto , cinta de fibra de vidrio, empaque cuadrado tipo buna, empaque cuadrado tipo viton, empaque cuadrado de epdm, orings de neopreno, viton epdm nitrilo, etc. redondos de neopreno, viton, epdm, nitrilo, etc. empaquetadura sección cuadrada de grafito, empaquetadura sección cuadrada de teflón, empaquetadura sección cuadrada de kevlar, lamina de neopreno, lamina de nitrilo, lamina de viton, lamina de hule sbr, lamina de asbesto grafitado, lamina libre de asbesto, lamina con fibra de carbón, loctite, taquetes de expansión, clavos, pijas.</p>
          </div>
          <div className='col-12 col-md-6'>
            <div className=' p-4 mt-5 bg-body'>
              <img src={tornilleria} alt="tornilleria" className='img-fluid' />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Nosotros
