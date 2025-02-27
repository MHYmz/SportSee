// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found">Page introuvable</h1>
      <p className="not-foundP">La page que vous recherchez existe pas.</p>
      <nav>
        <NavLink to="/" className="accueil" aria-label="Retour à l'accueil">
          RETOUR À LACCUEIL
        </NavLink>
      </nav>
    </div>
  );
}
