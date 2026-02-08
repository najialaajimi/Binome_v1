import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'owner':
        return '/owner/dashboard';
      default:
        return '/tenant/dashboard';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Binome
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li>
            <Link to="/search" className="nav-link">Rechercher</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">À propos</Link>
          </li>
          <li>
            <Link to="/how-it-works" className="nav-link">Comment ça marche</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to={getDashboardLink()} className="nav-link">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <button 
                  onClick={logout}
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Connexion
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
