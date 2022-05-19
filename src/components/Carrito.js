import React, { useState, useEffect } from "react";
import "../components/Carrito.css";
import "animate.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Carrito = ({ cart, setCart, clearCart, redirect, cantidad, addCart, setCantidad}) => {
  const { isAuthenticated } = useAuth0();

  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    totalCart();
  }, [cart]);

  const deleteCart = (product) => {
    const productExist = cart.find((item) => item.id === product.id)
    if(productExist.cantidad === 1){
      setCart(cart.filter((item) => item.id !== product.id));
    }else{
      setCart(cart.map((item) => item.id === product.id ? {...productExist, cantidad: item.cantidad - 1} : item))
    }

  };

  const totalCart = () => {
    let resultado = 0;
    cart.map((item) => (resultado += (item.price * item.cantidad)));
    setTotal(resultado);
  };

  const increase = (product) => {
    const productExist = cart.find((item) => item.id === product.id)
    setCart(cart.map((item) => item.id === product.id ? {...productExist, cantidad: productExist.cantidad + 1}
      : item
    ))

    
  }
  
  const decrease = () => {
    
    setCantidad(cantidad - 1)
    if(cantidad <= 1){
      setCantidad(1)
     }
    
  }

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
          {cart.map((item) => (
            <div className=" animate__animated animate__fadeInLeft">
              <hr />
              <div className="my-4 border px-3 rounded " key={item.id}>
                <div className="container">
                  <img className="imagenCart my-2" src={item.image} alt={item.title} />
                  <p className="mx-3 text-center">{item.title}</p>
                  <p className="text-center">
                    ${item.price}
                    <span className="text-success"> USD</span>
                  </p>
          <p className="text-center">Cantidad: {item.cantidad}</p>
                  <div className="row align-items-center">
                    <button
                      className="btn btn-outline-danger my-1"
                      onClick={() => deleteCart(item)}
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
          <div className="col-md-8 col-sm-12 animate__animated animate__fadeIn ">
            <h3 className="text-center">Información de la compra</h3>
            <hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Productos</th>
                  <th scope="col">Cantidad</th>

                  <th scope="col">Precio($)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ title, price, cantidad }) => (
                  <tr>
                    <td>{title}</td>
                <td>{cantidad}</td>
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
