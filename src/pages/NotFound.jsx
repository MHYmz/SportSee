// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>Page introuvable</h1>
      <p>La page que vous recherchez nexiste pas.</p>
      <nav>
        <NavLink to="/" aria-label="Retour à l'accueil">
          Retour à laccueil
        </NavLink>
      </nav>
    </>
  );
}
