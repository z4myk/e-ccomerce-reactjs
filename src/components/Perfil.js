import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
export const Perfil = () => {
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="container my-4 text-center mb-5">
      <div className="shadow-lg p-3">
        <div className="mb-5">
          <span className="text-primary ">
            Hola, bienvenido {user.name}! <br />
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
          <button
            className="btn btn-outline-danger my-2 w-25"
            onClick={() => logout()}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
