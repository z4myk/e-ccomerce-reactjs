import React, { useState, useEffect } from "react";
import "../components/Carrito.css";
import "animate.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Carrito = ({ cart, setCart, clearCart, redirect }) => {
  const { isAuthenticated } = useAuth0();

  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    totalCart();
  }, [cart]);

  const deleteCart = (id) => {
    let borrarCarrito = cart.filter((item) => item.id !== id);
    setCart(borrarCarrito);
  };

  const totalCart = () => {
    let resultado = 0;
    cart.map((item) => (resultado += item.price));
    setTotal(resultado);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div className="alert alert-warning text-center p-4">
          <i class="fas fa-exclamation-circle text-danger"></i> Inicie sesión
          para guardar productos al carrito
        </div>
      ) : (
        <span></span>
      )}

      {cart.length === 0 ? (
        <div>
          <div className="alert alert-warning text-center animate__animated animate__fadeInRight">
            Tu carrito esta vacío 😞
          </div>{" "}
          <h3 className="text-center text-primary">Carrito({cart.length})</h3>
        </div>
      ) : null}

      <div className="py-1 mb-5 pb-5 row my-4 container ">
        <div className="col-md-4">
          {cart.length === 0 ? null : (
            <h3 className="text-center">Carrito({cart.length})</h3>
          )}
          {cart.map(({ id, image, title, price }) => (
            <div>
              <hr />
              <div className="my-4 border px-3 rounded " key={id}>
                <div className="container">
                  <img className="imagenCart" src={image} alt={title} />
                  <p className="mx-3 text-center">{title}</p>
                  <p className="text-center">
                    ${price}
                    <span className="text-success"> USD</span>
                  </p>
                  <div className="row align-items-center">
                    <button
                      className="btn btn-outline-danger my-1"
                      onClick={() => deleteCart(id)}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length === 0 ? (
          <span></span>
        ) : (
          <div className="col-md-8 col-sm-12">
            <h3 className="text-center">Información de la compra</h3>
            <hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Productos</th>

                  <th scope="col">Precio($)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ title, price }) => (
                  <tr>
                    <td>{title}</td>

                    <td>${price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {total ? (
              <div className="my-4">
                <p className="text-center">
                  Precio Final: ${total}
                  <span className="text-success"> USD</span>
                </p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => clearCart(cart)}
                >
                  Comprar
                  {redirect === true
                    ? navigate("/carrito/Compra-finalizada")
                    : null}
                </button>
              </div>
            ) : (
              <span></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
