import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TenantDashboard = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/tenant/dashboard', label: '📊 Tableau de bord', exact: true },
    { path: '/tenant/profile', label: '👤 Mon profil' },
    { path: '/tenant/favorites', label: '❤️ Favoris' },
    { path: '/tenant/searches', label: '🔍 Recherches' },
    { path: '/tenant/bookings', label: '📅 Réservations' },
    { path: '/tenant/messages', label: '💬 Messages' },
    { path: '/tenant/roommate', label: '👥 Recherche binôme' }
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="mb-4">
          <p className="text-secondary text-sm">Bienvenue,</p>
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
export const TenantDashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Favoris</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Réservations</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Messages</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">0</p>
          <p className="stat-label">Recherches</p>
        </div>
      </div>

      <div className="grid grid-2 mt-4">
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="font-semibold mb-2">📢 Notifications</h3>
          <p className="text-secondary">Aucune notification pour le moment.</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="font-semibold mb-2">💡 Recommandations</h3>
          <p className="text-secondary">
            Complétez votre profil pour recevoir des recommandations personnalisées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
