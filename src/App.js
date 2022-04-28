import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Productos } from "./components/Productos";
import { NavMenu } from "./components/NavMenu";
import { Footer } from "./components/Footer";
import { ProductosCategoria } from "./components/ProductosCategoria";
import { Carrito } from "./components/Carrito";
import Swal from "sweetalert2";
import { Perfil } from "./components/Perfil";
import { CompraFinal } from "./components/CompraFinal";

function App() {
  const [productos, setProductos] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorito, setFavorito] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const getOnlyOneData = async (id, state) => {
    const request = await fetch(`https://fakestoreapi.com/products/${id}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const response = await request.json();
    state(response);
  };

  const getData = async () => {
    const request = await fetch("https://fakestoreapi.com/products", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const response = await request.json();
    setProductos(response);
  };

  const getDataCategory = async (state) => {
    const request = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const response = await request.json();
    state(response);
  };

  const getSpecificCategory = async (category, state) => {
    const request = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const response = await request.json();
    state(response);
  };

  const addCart = (id) => {
    const agregarCarrito = productos.filter((item) => item.id === id);
    if (agregarCarrito) {
      setCart([...cart, ...agregarCarrito]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El producto se agrego con exito!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      setCart(null);
    }
  };

  const clearCart = (cart) => {
    Swal.fire({
      title: "¿Estas seguro de confirmar su compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setRedirect(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "La compra se a completado con exito!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 1200,
        });
        cart = [];
        setCart(cart);
        setRedirect(false);
      }
    });
  };


  const addFavorite = (id) => {
    const addFav = productos.filter((item) => item.id === id );
    setFavorito([...favorito, ...addFav]);
  }
  const removeFavorite = (id) => {
    const deleteFav = favorito.filter((item) => item.id !== id);
    setFavorito(deleteFav);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavMenu
          productos={productos}
          getDataCategory={getDataCategory}
          getSpecificCategory={getSpecificCategory}
          cart={cart}
          setCart={setCart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                setProductos={setProductos}
                addCart={addCart}
                productos={productos}
                addFavorite={addFavorite}
                favorito={favorito}
                removeFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={
              <Productos getOnlyOneData={getOnlyOneData} addCart={addCart} addFavorite={addFavorite} removeFavorite={removeFavorite} favorito={favorito} />
            }
          />
          <Route
            path="/productos/categoria/:category"
            element={
              <ProductosCategoria getSpecificCategory={getSpecificCategory} />
            }
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                cart={cart}
                setCart={setCart}
                clearCart={clearCart}
                redirect={redirect}
              />
            }
          />
          <Route path="/configuracion" element={<Perfil />} />
          <Route path="/carrito/Compra-finalizada" element={<CompraFinal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
