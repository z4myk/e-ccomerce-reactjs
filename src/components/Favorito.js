import React from 'react'
import '../components/favorito.css'
export const Favorito = ({favorito, removeFavorite}) => {
    return (
        <div className="container">
            <h2 className="text-center my-3">Favoritos</h2>
            <hr />
            <div>
                {favorito.map(({id,image,title,category,price}) => (
                    <div key={id} className="my-5 border shadow-lg">
                        <div className=" p-3 row">
                            <div className="col-md-2">
                            <img src={image} alt={title} className="imagenFavorito" />
                            </div>
                            <div className="col-md-6">
                        <p className="mx-5">{title}</p>
                        <p className="mx-5">{category}</p>
                        <p className="mx-5">${price} <span className="text-success">USD</span></p>
                        <p className="mx-5 text-primary btnEliminar" onClick={() => removeFavorite(id)}>Eliminar</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
