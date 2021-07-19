import React from 'react';

//El return queda implicito
const Footer = ({fecha}) =>(
        <footer>
            <p> MTRZ Devs - Todos los derechos reservados &copy; {fecha}</p>
        </footer>
);
 
export default Footer;