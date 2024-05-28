import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="Navbar">
      <ul className="Navbar-nav">
        <li className="Nav-item">
          <Link to="/home" className="Nav-link">
            Home
          </Link>
        </li>
        <li className="Nav-item">
          <Link to="/submitform" className="Nav-link">
            Submit Form
          </Link>
        </li>
        <li className="Nav-item">
          <Link to="/map" className="Nav-link">
            Map
          </Link>
        </li>
        <li className="Nav-item">
          <Link to="/" className="Nav-link">
            Login
          </Link>
        </li>
        <li className="Nav-item">
          <Link to="/signup" className="Nav-link">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}
