import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/inicio.css";
import { useAuth0 } from "@auth0/auth0-react";
export const NavMenu = ({ getDataCategory }) => {
  const { isAuthenticated, logout, user } = useAuth0();

  const [categorias, setCategorias] = useState(null);

  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    getDataCategory(setCategorias);
  }, []);

  return (
    <>
      <Navbar bg="dark shadow-lg" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand href="#" className="">
            <span className="">React</span>
            <span className="text-primary text-lead">Shop</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" me-auto m-end my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/" className="menucategorias">
                  Inicio
                </Link>
              </Nav.Link>
              {categorias
                ? categorias.map((category) => (
                    <Nav.Link key={category}>
                      <Link
                        to={`productos/categoria/${category}`}
                        className="menucategorias mx-5 "
                      >
                        {category}
                      </Link>
                    </Nav.Link>
                  ))
                : "Cargando..."}

              <Nav.Link className="">
                <Link to="/carrito">
                  <i className="fas fa-shopping-cart fa-1x "></i>
                </Link>
              </Nav.Link>

              {isAuthenticated ? (
                <Link to="/configuracion">
                  <img
                    width={50}
                    height={50}
                    className="rounded mx-3"
                    src={user.picture}
                    alt={user.name}
                  />
                </Link>
              ) : (
                <Nav.Link>
                  <Link
                    to=""
                    className="btn btn-outline-primary"
                    onClick={() => loginWithRedirect()}
                  >
                    Iniciar Sesion
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
