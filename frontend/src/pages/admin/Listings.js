import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (filter !== 'all') params.status = filter;
      const response = await api.get('/admin/listings', { params });
      setListings(response.data.data || []);
    } catch (err) {
      console.log('Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/admin/listings/${id}/status`, { status });
      setListings(prev => 
        prev.map(l => l._id === id ? { ...l, status } : l)
      );
    } catch (err) {
      console.log('Error updating listing status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { class: 'badge-success', label: 'Active' },
      pending: { class: 'badge-warning', label: 'En attente' },
      rented: { class: 'badge-primary', label: 'Louée' },
      suspended: { class: 'badge-danger', label: 'Suspendue' },
      deleted: { class: 'badge-secondary', label: 'Supprimée' }
    };
    return badges[status] || { class: '', label: status };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modération des annonces</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['pending', 'active', 'suspended', 'all'].map(status => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setFilter(status); setPage(1); }}
            style={{ padding: '0.5rem 1rem' }}
          >
            {status === 'pending' ? 'En attente' :
             status === 'active' ? 'Actives' :
             status === 'suspended' ? 'Suspendues' : 'Toutes'}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading text="Chargement des annonces..." />
      ) : listings.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Annonce</th>
                <th>Propriétaire</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing._id}>
                  <td>
                    <div className="flex gap-2">
                      <img
                        src={listing.images?.[0]?.url || 'https://via.placeholder.com/60'}
                        alt=""
                        style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <p className="text-sm text-secondary">
                          {listing.address?.city}, {listing.address?.governorate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{listing.owner?.firstName} {listing.owner?.lastName}</p>
                    <p className="text-sm text-secondary">{listing.owner?.email}</p>
                  </td>
                  <td>{listing.price} TND</td>
                  <td>
                    <span className={`badge ${getStatusBadge(listing.status).class}`}>
                      {getStatusBadge(listing.status).label}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {listing.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-outline"
                            style={{ padding: '0.25rem 0.5rem', color: '#10b981' }}
                            onClick={() => handleUpdateStatus(listing._id, 'active')}
                          >
                            ✓
                          </button>
                          <button
                            className="btn btn-outline"
                            style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}
                            onClick={() => handleUpdateStatus(listing._id, 'suspended')}
                          >
                            ✗
                          </button>
                        </>
                      )}
                      {listing.status === 'active' && (
                        <button
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}
                          onClick={() => handleUpdateStatus(listing._id, 'suspended')}
                        >
                          Suspendre
                        </button>
                      )}
                      {listing.status === 'suspended' && (
                        <button
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.5rem', color: '#10b981' }}
                          onClick={() => handleUpdateStatus(listing._id, 'active')}
                        >
                          Réactiver
                        </button>
                      )}
                      <a
                        href={`/listing/${listing._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        👁️
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary">Aucune annonce trouvée.</p>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
