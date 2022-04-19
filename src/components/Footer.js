import React from 'react'
import '../components/inicio.css'
export const Footer = () => {
    return (
        <div className="bg-dark p-3 text-light footer mt-5" >
            <div className="d-flex justify-content-between my-3 container flex-wrap" >
                    <p className="lead">tienda<span className="text-primary">DIGITAL</span></p>
                    <p className="text-secondary">Creado por Sebastián Mosquera con ❤️</p>
                    <p className="text-secondary">© 2022 Todos los derechos reservados.</p>
            </div>
                    <hr className="text-light"/>
        </div>
    )
}
