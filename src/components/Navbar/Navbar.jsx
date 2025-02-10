// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav>
        <img src="./sportsee.png" alt="SportSee Logo" />
        <Link to="/" className="homeLink">Accueil</Link>
        <span>Profil</span>
        <span>Paramètres</span>
        <span>Communauté</span>
      </nav>
    </header>
  );
};

export default Navbar;
