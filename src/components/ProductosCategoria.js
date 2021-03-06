import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '../components/inicio.css'
export const ProductosCategoria = ({getSpecificCategory, favorito, addFavorite, removeFavorite}) => {
  const { category } = useParams();

  const [productoCategoria, setProductoCategoria] = useState(null);

  useEffect(() => {
  getSpecificCategory(category, setProductoCategoria);
  }, [category]);

  return (
    <div>
      <h1 className="text-center my-4">{category}</h1>
      <hr className="text-primary container" />
      <div className="d-flex flex-wrap container mb-5 responsiveMobile">
        {productoCategoria !== null ? (
          productoCategoria.map(({ title, image, id, price, rating }) => (
            <div className="  my-3 mx-3 mb-5 " key={id}>
              <Card style={{ width: "15rem" }} className="shadow-lg">
                <Card.Img variant="top" src={image}  />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text><FontAwesomeIcon icon={faStar} className="text-warning"/> {rating.rate}</Card.Text>
                  <Card.Text className="d-flex justify-content-between">
                    ${price} USD
                    {favorito.find((item) => item.id === id) ? (
                      <i
                        class="fas fa-heart text-danger heartProducts"
                        onClick={() => removeFavorite(id)}
                      ></i>
                    ) : (
                      <i
                        class="fas fa-heart text-secondary heartProducts"
                        onClick={() => addFavorite(id)}
                      ></i>
                    )}
                   
                  </Card.Text>
                  <Link to={`/productos/${id}`}>
                    <Button className="w-100" variant="outline-primary">
                      Ver m??s
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))

        ) : ( 
          <div className="w-100 text-center my-5 text-primary">
            Cargando...
            <br />
            <Spinner animation="grow" />
          </div>

        )}
      </div>
    </div>
  );
};
