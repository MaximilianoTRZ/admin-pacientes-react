import React from 'react'
import PropTypes from 'prop-types'

const Cita = ({cita, eliminarCita}) =>( //return implicito con los parentesis
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Sintomas: <span>{cita.sintomas}</span></p>

        <button
            className="button eliminar u-full-width"
            onClick={ () => eliminarCita(cita.id)}
        >Eliminar &times;</button>
    </div>
  );

  //Documentando con PropTypes
  Cita.propTypes={ //La key no se documenta.
    cita: PropTypes.object.isRequired,  // isRequired -> es Obligatorio.
    //eliminarCita: PropTypes.func.isRequired  // isRequired -> es Obligatorio.
  }
 
export default Cita;