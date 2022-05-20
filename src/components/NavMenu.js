import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/inicio.css";
import { useAuth0 } from "@auth0/auth0-react";
export const NavMenu = ({ getDataCategory, cart }) => {
  const { isAuthenticated, user } = useAuth0();

  const [categorias, setCategorias] = useState(null);

  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    getDataCategory(setCategorias);

  }, [cart]);

  return (
    <>
      <Navbar bg="dark shadow-lg" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="">
            <span className="">React</span>
            <span className="text-primary text-lead">Shop</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" me-auto container-fluid my-2 my-lg-0"
              // style={{ maxHeight: "200px" }}
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
                        className="menucategorias"
                      >
                        {category}
                      </Link>
                    </Nav.Link>
                  ))
                : "Cargando..."}
                <span className="ms-auto "></span>
              <Nav.Link  className="">
                <Link to="/carrito" >
                  <i className="fas fa-shopping-cart fa-1x"></i>
                <span class="badge">{cart.length > 0 ? cart.length : cart.length[0] }</span>
                </Link>
              </Nav.Link>

                <Nav.Link>
                  <Link to="/favoritos">
                <i class="fas fa-heart heart"></i>
                  </Link>
                </Nav.Link>
              {isAuthenticated ? (
                <Link to="/configuracion">
                  <img
                    width={50}
                    height={50}
                    className="rounded "
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
                    Iniciar Sesión
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
