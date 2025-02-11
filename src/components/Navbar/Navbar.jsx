// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <header>
      <nav>
        <img src="./sportsee.png" alt="SportSee Logo" />
        <Link to="/">Accueil</Link>
        <span>Profil</span>
        <span>Paramètres</span>
        <span>Communauté</span>
      </nav>
    </header>
  );
};

export default Navbar;
