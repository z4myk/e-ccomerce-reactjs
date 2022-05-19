import React from "react";
import { useAuth0} from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import '../components/favorito.css'
export const Perfil = () => {
  const {logout, user } = useAuth0();

  return (
    <div className="container my-4 text-center mb-5" >
      <div className="shadow-lg p-3">
        <div className="mb-5">
          <span className="text-primary ">
            Hola, bienvenid@ {user.name}! <br />
            <img
              width={100}
              height={100}
              src={user.picture}
              className="my-4"
              alt={user.name}
            />
          </span>
          <div className="mb-3">
            Verificado:{" "}
            {!user.email_verified ? (
              <i class="fas fa-times text-danger"></i>
            ) : (
              <i class="fas fa-check text-success"></i>
            )}
          </div>
          <Link to="/favoritos">
          <div className="text-primary verFav my-3">Ver Favoritos</div>
          </Link>
          <button
            className="btn btn-outline-danger my-2 w-25"
            onClick={() => logout()}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
