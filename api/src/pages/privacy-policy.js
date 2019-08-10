import React from 'react'
import { Row, Col } from 'antd/lib/grid'

import Layout from '../components/Layout'

export default class Name extends React.Component {
  render () {
    return (
      <Layout withoutMenus>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 9, offset: 9 }}>
            <h1>DECLARACIÓN DE PRIVACIDAD</h1>
            <h2>SECCIÓN 1 - ¿QUÉ HACEMOS CON TU INFORMACIÓN?</h2>
            <p>
              Cuando usas nuestra aplicación, nosotros recolectamos la información personal que nos das tales como nombre, dirección y correo electrónico.
            </p>

            <p>
              Cuando navegas en nuestra app o sitio web, también recibimos de manera automática la dirección de protocolo de internet de tu computadora (IP) con el fin de proporcionarnos información que nos ayuda a conocer acerca de su navegador y sistema operativo.
            </p>

            <p>
              Email marketing: Con tu permiso, podremos enviarte correos electrónicos acerca de nuestra tienda, nuevos productos y otras actualizaciones
            </p>

            <h2>SECTION 2 - CONSENTIMIENTO</h2>
            <h3>¿Cómo obtienen mi consentimiento?</h3>
            <p>
              Cuando nos provees tu información personal para realizar una compra (si fuera el caso), usar la aplicación a través de Facebook, implicamos que aceptas la recolección y uso por esa razón específica solamente.
            </p>

            <p>
              Si te pedimos tu información personal por una razón secundaria, como marketing, te pediremos directamente tu expreso consentimiento, o te daremos la oportunidad de negarte.
            </p>

            <h3>¿Cómo puedo anular mi consentimiento?</h3>

            <p>
              Si luego de haber aceptado cambias de opinión, puedes anular tu consentimiento para que te contactemos, por la recolección, uso o divulgación de tu información, en cualquier momento, contactándonos a brayan@lucesbeautiful.com o escribiéndonos a: Luces Beautiful 19 calle 1-30 zona 3, Guatemala, GU, 01003, Guatemala
            </p>

            <h2>SECCIÓN 3 - DIVULGACIÓN</h2>
            <p>
              Podemos divulgar tu información personal si se nos requiere por ley o si violas nuestros Términos de Servicio.
            </p>

            <h2>SECCIÓN 4 - SERVICIOS DE TERCERAS PARTES</h2>

            <p>
              En general, los proveedores de terceras partes utilizados por nosotros solo recopilarán, usarán y divulgarán tu información en la medida que sea necesaria para que les permita desempeñar los servicios que nos proveen.
            </p>

            <p>
              Sin embargo, algunos proveedores de servicios de terceros, tales como redes sociales, tienen sus propias políticas de privacidad con respecto a la información que estamos obligados a proporcionarles.
            </p>

            <p>
              Para estos proveedores, te recomendamos que leas las políticas de privacidad para que puedas entender la manera en que tu información personal será manejada.
            </p>

            <p>
              En particular, recuerda que algunos proveedores pueden estar ubicados o contar con instalaciones que se encuentran en una jurisdicción diferente a ti o nosotros.  Así que si deseas proceder con una transacción que involucra los servicios de un proveedor a terceros, tu información puede estar sujeta a las leyes de la jurisdicción (jurisdicciones) en que se encuentra el proveedor de servicios o sus instalaciones.
            </p>

            <p>
              A modo de ejemplo, si te encuentras en Canadá y tu transacción es procesada por una pasarela de pago con sede en Estados Unidos, entonces tu información personal utilizada para completar la transacción puede ser sujeto de divulgación en virtud de la legislación de Estados Unidos, incluyendo la Ley Patriota.
            </p>

            <p>
              Una vez que abandonas el sitio web de nuestra tienda o te rediriges a un sitio o aplicación de terceros, ya no estás siendo regulados por la presente Política de Privacidad o los Términos de Servicio de nuestra página web.
            </p>

            <h3>Enlaces</h3>

            <p>
              Cuando haces clic en enlaces de nuestra web, puede que seas redirigido fuera de nuestro sitio. No somos reponsables por las prácticas de privacidad de otros sitios y te recomendamos leer sus normas de privacidad.
            </p>

            <h3>SECCIÓN 5 - SEGURIDAD</h3>

            <p>
              Para proteger tu información personal, tomamos precauciones razonables y seguimos las mejores prácticas de la industria para asegurarnos de que no haya pérdida de manera inapropiada, mal uso, acceso, divulgación, alteración o destrucción de la misma.
            </p>

            <p>
              Si nos proporcionas la información de tu tarjeta de crédito, dicha información es encriptada mediante la tecnología Secure Socket Layer (SSL) y se almacena con un cifrado AES-256.  Aunque ningún método de transmisión a través de Internet o de almacenamiento electrónico es 100% seguro, seguimos todos los requisitos de PCI-DSS e implementamos normas adicionales aceptadas por la industria.
            </p>

            <h2>SECCIÓN 6 - EDAD DE CONSENTIMIENTO</h2>

            <p>
              Al utilizar este sitio/app, declaras que tienes al menos la mayoría de edad en tu estado o provincia de residencia, o que tienes la mayoría de edad en tu estado o provincia de residencia y que nos has dado tu consentimiento para permitir que cualquiera de tus dependientes menores use este sitio.
            </p>

            <h2>SECCIÓN 7 - CAMBIOS A ESTA POLÍTICA DE PRIVACIDAD</h2>

            <p>
              Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento, así que por favor revísala frecuentemente.  Cambios y aclaraciones entrarán en vigencia inmediatamente después de su publicación en el sitio web.  Si hacemos cambios materiales a esta política, notificaremos aquí que ha sido actualizada, por lo que cual estás enterado de qué información recopilamos, cómo y bajo qué circunstancias, si las hubiere, la utilizamos y/o divulgamos.
            </p>

            <p>
              Si nuestra tienda es adquirida o fusionada con otra empresa, tu información puede ser transferida a los nuevos propietarios, para que podamos seguir vendiéndote productos.
            </p>

            <h2>PREGUNTAS E INFORMACIÓN DE CONTACTO</h2>

            <p>
              Si quieres: acceder, corregir, enmendar o borrar cualquier información personal que poseamos sobre ti, registrar una queja, o simplemente quieres más información contacta a nuestro Oficial de Cumplimiento de Privacidad <a href='mailto:brayan@lucesbeautiful.com'>brayan@lucesbeautiful.com</a> o por correo postal a Luces Beautiful
            </p>

            [Re: Brayan Salazar]

            [19 calle 1-30 zona 3, Guatemala, GU, 01003, Guatemala]
          </Col>
        </Row>
      </Layout>
    )
  }
}
