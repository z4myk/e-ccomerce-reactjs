import React from "react";
import { Card, Button, Spinner, FormControl } from "react-bootstrap";
import { Link} from "react-router-dom";
import '../components/inicio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
export const Inicio = (props) => {
 

  
  
  return (
    
    <div className="container">
    
      <h2 className="small-text my-3 text-center my-4">Destacados del mes</h2>
      <hr className="text-success" />

      <div className="d-flex flex-wrap">
        {props.productos ? (
          props.productos.map(({ image, title, price, id, category, rating}) => (
            <div className=" my-3 mx-3 cardsMovement mb-5"  key={id}>
              <Card style={{ width: "15rem"}}  >
                <Card.Img variant="top" src={image} className="w-75 mx-4 my-1" />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text className="text-muted">{category}</Card.Text>
                  <Card.Text><FontAwesomeIcon icon={faStar} className="text-warning"/> {rating.rate}</Card.Text>
                  <Card.Text>${price}<span className="text-success"> USD</span></Card.Text>
                  <Link to={`productos/${id}`}>
                  <Button className="w-100" variant="outline-primary">
                    Ver más
                  </Button> 
                  </Link>
                 
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="w-100 text-center mt-5 text-primary">
            Cargando...
            <br />
            <Spinner animation="grow" />
          </div>
        )}
      </div>
    </div>
  );
};
