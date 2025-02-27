// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Welcome.scss"

const Welcome = () => {
  const users = [
    { id: 12, name: 'Karl', linkText: 'Revenir à l\'accueil' },
    { id: 18, name: 'Cecilia', linkText: 'Aller à la page à propos' },
  ];

  return (
    <>
      <h1 className='hello' id="hello-id"> 🚀 Bienvenue sur SportSee</h1>
      <nav className='nav-class'>
        <ul className="nav">
          {users.map(user => (
            <li key={user.id} className="nav__item" id={`nav-item-${user.id}`}>
              <NavLink
                to={`/user/${user.id}`}
                aria-label={user.linkText}
                className="nav__link"
              >
                {user.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Welcome;
