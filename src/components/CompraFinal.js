import React from "react";
import '../components/Carrito.css';
import { Link } from "react-router-dom";

export const CompraFinal = () => {
  return (
    <div>
      <div>
        <div className="alert alert-success text-center animate__animated animate__fadeInLeft">
          La transacción se a realizado con exito, Gracias por comprar en{" "}
          <span className="text-dark">React</span>
          <span className="text-primary">Shop</span>!
        </div>
   
        <Link to="/">
        <button className="btn btn-outline-dark mx-5 ">Volver al inicio</button>
        </Link>
        
      </div>
    </div>
  );
};
