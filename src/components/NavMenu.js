import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { Link} from "react-router-dom";
import '../components/inicio.css';
export const NavMenu = ({getDataCategory}) => {

  const [categorias, setCategorias] = useState(null);



  useEffect(() => {
  getDataCategory(setCategorias);
   
  },[]);

  return (
    <>
      <Navbar bg="light shadow-lg" expand="lg" >
        <Container fluid>
          <Navbar.Brand href="#">
            <span>tienda</span><span className="text-primary text-lead">DIGITAL</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/"  className="menucategorias">Inicio</Link>
              </Nav.Link>
                {categorias
                  ? categorias.map((category) => (
                    <Nav.Link key={category}>
                      <Link to={`productos/categoria/${category}`}  className="menucategorias mx-2">
                      {category}
                      </Link>
                      </Nav.Link>
                    ))
                  : "Cargando..."}
              <Nav.Link className="me-auto">
                <Link to="/carrito"><i className="fas fa-shopping-cart text-success me-auto my-2"></i></Link>
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
