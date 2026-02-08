import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">Binome</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              La plateforme de référence pour les étudiants et expatriés à la recherche d'un logement en Tunisie.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Liens utiles</h4>
            <ul className="footer-links">
              <li><Link to="/search">Rechercher un logement</Link></li>
              <li><Link to="/how-it-works">Comment ça marche</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Pour les propriétaires</h4>
            <ul className="footer-links">
              <li><Link to="/auth">Publier une annonce</Link></li>
              <li><Link to="/how-it-works">Guide propriétaire</Link></li>
              <li><Link to="/contact">Partenariats</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Conditions générales</Link></li>
              <li><Link to="/privacy">Politique de confidentialité</Link></li>
              <li><a href="mailto:support@binome.tn">support@binome.tn</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          marginTop: '2rem', 
          paddingTop: '2rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <p>&copy; {new Date().getFullYear()} Binome. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
