import React, {useState, useEffect} from 'react'
import '../components/Carrito.css';
import 'animate.css';
export const Carrito = ({cart, setCart}) => {


    const [total, setTotal ] = useState(null);

    useEffect(() => {
        totalCart();
    }, [cart])

    const deleteCart = (id) => {

        let borrarCarrito = cart.filter((item) => item.id !== id)
        setCart(borrarCarrito)
    }

    const totalCart = () => {
        let resultado = 0;
         cart.map((item) => resultado += item.price )
         setTotal(resultado);
    }

    return (
        <div>
            <h3 className="text-primary text-center my-4">Carrito ({cart.length})</h3>
            {cart.length === 0 ? (<div className="alert alert-warning text-center animate__animated animate__fadeInRight">Tu carrito esta vacio 😞</div>) : (null)}
            <div className="container py-1 px-3 mb-5 pb-5">
            { 
            cart.map((item) => (
                    <div className="my-4 border px-3 mb-5" key={item.id}>
                    <div className="d-flex justify-content-between flex-wrap">
                    <img className=" imagenCart my-3" src={item.image} alt={item.title} />
                    <p className="mx-3 my-3">{item.title}</p>
                    <p className="my-3">${item.price}<span className="text-success"> USD</span></p>
                    </div>
                    <button className="btn btn-outline-danger my-3 w-100" onClick={() => deleteCart(item.id)}><i class="fas fa-trash"></i></button>
                    </div>
            ))
            
        }
       {total ? 
       (<div>
           <p className="text-center">Precio Final: ${total}<span className="text-success"> USD</span></p> 
           <button className="btn btn-success w-100">Pagar</button>
           <hr />
        </div>)
           : null}
        </div>

        </div>
    )
}
