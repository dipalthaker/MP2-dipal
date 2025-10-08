import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="brand">🍽️ Meal Explorer</div>
        <div className="navlinks">
          <NavLink to="/" end>List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
