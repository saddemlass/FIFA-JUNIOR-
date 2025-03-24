import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">FIFA JUNIOR</h3>

        
        <div className="footer-contact">
          <p><FaEnvelope /> contact@fifajunior.com</p>
          <p><FaPhone /> +33 6 12 34 56 78</p>
        </div>

    
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>

       
        <div className="footer-links">
          <a href="/">Accueil</a>
          <span> | </span>
          <a href="/add">Ajouter joueur</a>
        </div>

      
        <p className="footer-copy">© {new Date().getFullYear()} FIFA JUNIOR. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;


  