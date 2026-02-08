import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/owner/dashboard', label: '📊 Tableau de bord', exact: true },
    { path: '/owner/listings', label: '🏠 Mes annonces' },
    { path: '/owner/listings/create', label: '➕ Nouvelle annonce' },
    { path: '/owner/requests', label: '📋 Demandes' },
    { path: '/owner/messages', label: '💬 Messages' },
    { path: '/owner/reviews', label: '⭐ Avis' },
    { path: '/owner/profile', label: '👤 Mon profil' }
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="mb-4">
          <p className="text-secondary text-sm">Espace propriétaire</p>
          <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
        </div>

        <nav>
          <ul className="sidebar-nav">
            {navItems.map((item) => (
              <li key={item.path} className="sidebar-nav-item">
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => 
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

// Dashboard Home Component
export const OwnerDashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Annonces actives</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Vues ce mois</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Demandes</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0 TND</p>
          <p className="stat-label">Revenus</p>
        </div>
      </div>

      <div className="grid grid-2 mt-4">
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="font-semibold mb-2">📢 Alertes</h3>
          <p className="text-secondary">Aucune alerte pour le moment.</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="font-semibold mb-2">📊 Performances</h3>
          <p className="text-secondary">
            Publiez votre première annonce pour voir les statistiques.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
