import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaFutbol } from 'react-icons/fa';



function Header() {
  
  
  return (
    <header className="header-container">
      <div   className="header-left">
        <a  href="/" className='header-left'>
        <FaFutbol className="header-icon" />
        
       
        <h1 className="header-title">FIFA JUNIOR</h1>
        
        </a>
      </div>

      <nav className="header-nav">
        <Link className="nav-btn" to="/">Accueil</Link>
        <Link className="nav-btn" to="/add">Ajouter joueur</Link>
      </nav>
    </header>
  );
}

export default Header;
