import React, {Fragment, useState} from 'react'
import {v4 as uuid} from 'uuid'; //para generar los id de las citas (el key de cada una)
//import uuid from 'uuid/v4'; salia asi en el video pero no anduvo.
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    
    //Crear State de Citas (state local)
    const [cita, actualizarCita] = useState({
        //objeto
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    }); 

    //State para los mensajes de la validacion del formulario.
    const [error, actualizarError]=useState(false); //valor inicar el un boolean
     
    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    //Recive como parametro el evento
    const actualizarState = (e) =>{
        actualizarCita({
            ...cita,    //SPREAD OPERATOR sirve para arreglos y objetos 
            [e.target.name]: e.target.value
        });
    };

    //Extraer los valores (object distructuring)
    //se hace para no tener que escibir cita.mascota etc
    const {mascota, propietario, fecha, hora, sintomas}= cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e =>{
        e.preventDefault(); //Hace que se cancele el evento si se puede cancelar, sin que deje de funcionar el resto de la pagina

        //Validar el formulario
        if (mascota.trim() === '' || propietario.trim()==='' || fecha.trim() === '' || hora.trim() === '' ||
        sintomas.trim() === '') {
            //trim() -> elimina los espacios en blanco al principio o al final del string
            actualizarError(true); //cambiamos el error a true porque hubo un error
            return; //PARA QUE NO SE SIGA EJECUTANDO EL CODIGO DESPUES DE ESTA VALIDACION. (si es que hay un error).
        }

        //Eliminar el mensaje de error previo
        actualizarError(false);

        //Asignar un ID
        cita.id = uuid(); //genera un id unico para la cita

        //Crear la cita (colocarla en el state principal)
        crearCita(cita);
        //Reiniciar el form
        actualizarCita({ //Funcion que modifica el State de formulario. Lo reiniciamos para que se pueda llenar otro.
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return ( 
        <Fragment>
            <h3>Crear Cita</h3>

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState} //Funcion que toma lo que vamos escribiendo
                    value={mascota} //para reiniciar el formulario
                />
            
                <label>Nombre Dueño de la Mascota</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño"
                    onChange={actualizarState}
                    value={propietario} //para reiniciar el formulario
                />

                <label>Fecha</label>
                <input 
                    type="Date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha} //para reiniciar el formulario
                />

                <label>Hora</label>
                <input 
                    type="Time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}//para reiniciar el formulario
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas" 
                    className="u-full-width"
                    onChange={actualizarState} 
                    value={sintomas}//para reiniciar el formulario
                ></textarea>

                {//operador ternario para mostrar el mensaje de error (funciona como un if-else)
                error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                : null }

                <button
                    type="submit"
                    className="u-full-width button-primary" 
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

//Documentando con PropTypes
Formulario.propTypes={
    crearCita: PropTypes.func.isRequired // isRequired -> es Obligatorio.
}
 
export default Formulario;