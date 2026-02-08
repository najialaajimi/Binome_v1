import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', exact: true },
    { path: '/admin/listings', label: '🏠 Annonces' },
    { path: '/admin/users', label: '👥 Utilisateurs' },
    { path: '/admin/support', label: '🎫 Support' },
    { path: '/admin/content', label: '📝 Contenu' }
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar" style={{ backgroundColor: '#1e293b' }}>
        <div className="mb-4">
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
            Administration
          </p>
          <p style={{ color: 'white', fontWeight: '600' }}>
            {user?.firstName} {user?.lastName}
          </p>
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
                  style={({ isActive }) => ({
                    color: isActive ? '#2563eb' : 'rgba(255,255,255,0.7)',
                    backgroundColor: isActive ? 'white' : 'transparent'
                  })}
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

// Admin Dashboard Home Component
export const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch (err) {
      console.log('Error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administration</h1>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value">{stats?.users?.total || 0}</p>
              <p className="stat-label">Utilisateurs</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{stats?.listings?.total || 0}</p>
              <p className="stat-label">Annonces</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{stats?.listings?.pending || 0}</p>
              <p className="stat-label">En attente</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{stats?.bookings?.total || 0}</p>
              <p className="stat-label">Réservations</p>
            </div>
          </div>

          <div className="grid grid-2 mt-4">
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-3">👥 Derniers utilisateurs</h3>
              {stats?.recentUsers?.length > 0 ? (
                <ul>
                  {stats.recentUsers.map(user => (
                    <li key={user._id} className="py-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-secondary">{user.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-secondary">Aucun utilisateur récent</p>
              )}
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-3">🏠 Dernières annonces</h3>
              {stats?.recentListings?.length > 0 ? (
                <ul>
                  {stats.recentListings.map(listing => (
                    <li key={listing._id} className="py-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <p className="font-medium">{listing.title}</p>
                      <p className="text-sm text-secondary">
                        Par {listing.owner?.firstName} {listing.owner?.lastName}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-secondary">Aucune annonce récente</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
