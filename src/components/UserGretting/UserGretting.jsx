// eslint-disable-next-line no-unused-vars
import React from "react";

export default function UserGretting({infoGen}) {
  let content; // Variable pour contenir le contenu à afficher

  // Vérifie si les données sont chargées ou non
  if (!infoGen) {
    content = <div>Chargement des données...</div>; // Affiche un message de chargement si infoGen est vide
  } else {
    // Si infoGen est disponible, extrait le prénom de l'utilisateur
    const { firstName } = infoGen.userInfos;
    content = (
      <h1>
        Bonjour {" "}
        <span className="id" style={{color: "red"}}>
          {firstName} 
        </span>
      </h1>
    );
  }

  return content; // Retourne le contenu final
}
