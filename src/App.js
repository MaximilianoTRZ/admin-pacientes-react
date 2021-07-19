import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import Footer from "./components/Footer";


function App() {

  /* Citas en Local Storage
  Local Storage almacena solo string (es una base de datos de string)
  Se mantiene almacenado aun cuando se cierra el navegador.*/
  //JSON.parse() Convierte el arreglo en un string facil de manipular
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));//vemos si hay citas en el localStorage
  if (!citasIniciales) {
    citasIniciales=[]; //si no hay citas iniciales entonces inicia como un arreglo vacio.
  }


  //Arreglo de citas
  const [citas, guardarCitas]=useState(citasIniciales); //citasIniciales son el state inicial de citas. (asi arranca con lo que hay en el localStorage)

  //UseEffect para realizar ciertas operaciones cuando el state cambia.
  //UseEffect -> Se ejecuta cuando el componente esta listo pero tambien cuando hay cambios en el componente (cuando se actualiza algo)
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));//vemos si hay citas en el localStorage
    
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas)) //Si hay citasIniciales se las mandamos al localStoage
    } else {
      localStorage.setItem('citas', JSON.stringify([])) //si no hay entonces arranca como un arreglo vacio
    }
  }, [citas] ); //ponemos citas para que se ejecute cada vez que el State de citas cambie.
  //Para asegurarnos de que se ejecute solo una vez, hay que pasarle un arrrglo vacio. 
  //Sino se va a ciclar. Por ejemplo en la consulta a una API.

  //Funcion que tome las citas actuales y agregue una nueva
  const crearCita = cita => {
    guardarCitas([ //Usamos la funcion que modifica el State
      ...citas, //Copia del state actual (arreglo)
      cita //Agregamos la nueva cita al arreglo
    ]);
  }

  //Funcion que elimina una cita por su ID
  const eliminarCita = id =>{
    //Nuevo arreglo con todas las citas que tengan el id diferente al que queremos eliminar
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional Citas
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  //Obtener la fecha
  const fecha = new Date().getFullYear();
  return (
    <Fragment>
    <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario 
          crearCita={crearCita} //prop que le pasamos a formulario (es una funcion)
          />
        </div>
        <div className="one-half column">
          <h3>{titulo/*Mensaje Condicional*/}</h3> 
          {citas.map(cita => ( //cita es el parametro de la arrow function
            <Cita 
            key={cita.id} // (prop) siempre hay que pasar un key cuando listamos algo
            cita={cita} //prop que le pasamos a Cita (es un objeto)
            eliminarCita={eliminarCita} //prop que le pasamos a Cita (es una funcion)
            />
          ))}
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="twelve columns">
        <Footer 
        fecha={fecha}
        />
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
