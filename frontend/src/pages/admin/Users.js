import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (filter !== 'all') params.role = filter;
      if (search) params.search = search;
      const response = await api.get('/admin/users', { params });
      setUsers(response.data.data || []);
    } catch (err) {
      console.log('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(prev => prev.filter(u => u._id !== id));
      } catch (err) {
        console.log('Error deleting user');
      }
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      tenant: { class: 'badge-primary', label: 'Locataire' },
      owner: { class: 'badge-success', label: 'Propriétaire' },
      admin: { class: 'badge-warning', label: 'Admin' }
    };
    return badges[role] || { class: '', label: role };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      {/* Search and Filters */}
      <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
        <form onSubmit={handleSearch} className="flex gap-1">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '250px' }}
          />
          <button type="submit" className="btn btn-primary">
            🔍
          </button>
        </form>

        <div className="flex gap-1">
          {['all', 'tenant', 'owner', 'admin'].map(role => (
            <button
              key={role}
              className={`btn ${filter === role ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(role)}
              style={{ padding: '0.5rem 1rem' }}
            >
              {role === 'all' ? 'Tous' :
               role === 'tenant' ? 'Locataires' :
               role === 'owner' ? 'Propriétaires' : 'Admins'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading text="Chargement des utilisateurs..." />
      ) : users.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Rôle</th>
                <th>Inscrit le</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="flex gap-2">
                      <img
                        src={user.avatar || 'https://via.placeholder.com/40'}
                        alt=""
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        {user.isVerified && (
                          <span className="text-sm text-success">✓ Vérifié</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    <span className={`badge ${getRoleBadge(user.role).class}`}>
                      {getRoleBadge(user.role).label}
                    </span>
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        ✏️
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}
                          onClick={() => handleDelete(user._id)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary">Aucun utilisateur trouvé.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
