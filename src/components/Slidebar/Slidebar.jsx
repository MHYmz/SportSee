// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';
import strech from "../../assets/strech.png"
import swimming from "../../assets/swimming.png"
import cycling from "../../assets/cycling.png"
import weightTraining from "../../assets/weightTraining.png"
import "./Slidebar.scss"

const Slidebar = () => {
  return (
    <nav className='Slidebar'>
      <ul>
        <NavLink>
            <li>
                <img src={strech} alt="strechIcon" />
            </li>
        </NavLink>
        <NavLink>
            <li>
                <img src={swimming} alt="swimmingIcon" />
            </li>
        </NavLink>
        <NavLink>
            <li>
                <img src={cycling} alt="cycling" />
            </li>
        </NavLink>
        <NavLink>
            <li>
                <img src={weightTraining} alt="weightTraining" />
            </li>
        </NavLink>
      </ul>
      <span>Copiryght, SportSee 2020</span>
    </nav>
  );
};

export default Slidebar;