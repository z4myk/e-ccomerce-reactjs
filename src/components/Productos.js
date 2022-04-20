import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Spinner, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
export const Productos = (props) => {
  const { id } = useParams();
  const [productoIndividual, setProductoIndividual] = useState(null);
  const { isAuthenticated} = useAuth0();
  useEffect(() => {
    props.getOnlyOneData(id, setProductoIndividual);
  }, []);

  return (
    <>
    {!isAuthenticated ? (<div className="alert alert-warning text-center p-4"><i class="fas fa-exclamation-circle text-danger"></i> Inicie sesion para poder guardar productos al carrito</div>): (<span></span>)}
    <div className="container mb-5 pb-5">
      {productoIndividual !== null ? (
        <div className=" justify-content-center my-3 mx-3" key={productoIndividual.id} >
          <h2 className="text-lead text-center my-3">
            {productoIndividual.title}
          </h2>
          <hr className="text-primary" />
          <div className="row">
            <div className="col-md-6">
              <img src={productoIndividual.image} className="w-75" />
            </div>
            <div className="col-md-6">
              <p>
                <span className="">
                  Categoria: <br />{" "}
                </span>
                {productoIndividual.category}

              </p>
              <p>
                Descripción: <br /> {productoIndividual.description}
              </p>
             <p><FontAwesomeIcon icon={faStar} className="text-warning"/> {productoIndividual.rating.rate}</p>
              <p>
                Precio: ${productoIndividual.price}
                <span className="text-success"> USD</span>
              </p>
              {isAuthenticated ? (
              <Button className="w-100 my-3 mb-5" variant="outline-success" onClick={() => props.addCart(productoIndividual.id)}>
                    Agregar al carrito
                  </Button>

              ): (
                <Button className="w-100 my-3 mb-5" variant="outline-success disabled">
                Agregar al carrito
              </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 text-center my-5 text-primary">
        Cargando...
        <br />
        <Spinner animation="grow" />
      </div>
      )}
    </div>
    </>
  );
};
