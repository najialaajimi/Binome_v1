import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import Loading from '../../components/common/Loading';

const OwnerListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await listingService.getOwnerListings();
      setListings(response.data || []);
    } catch (err) {
      console.log('Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
      try {
        await listingService.deleteListing(id);
        setListings(prev => prev.filter(l => l._id !== id));
      } catch (err) {
        console.log('Error deleting listing');
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { class: 'badge-success', label: 'Active' },
      pending: { class: 'badge-warning', label: 'En attente' },
      rented: { class: 'badge-primary', label: 'Louée' },
      suspended: { class: 'badge-danger', label: 'Suspendue' }
    };
    return badges[status] || { class: '', label: status };
  };

  if (loading) {
    return <Loading text="Chargement de vos annonces..." />;
  }

  return (
    <div>
      <div className="flex-between mb-4">
        <h1 className="text-2xl font-bold">Mes annonces</h1>
        <Link to="/owner/listings/create" className="btn btn-primary">
          ➕ Nouvelle annonce
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Logement</th>
                <th>Prix</th>
                <th>Vues</th>
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
                        src={listing.images?.[0]?.url || 'https://via.placeholder.com/80x60'}
                        alt=""
                        style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <p className="text-sm text-secondary">
                          {listing.address?.city}, {listing.address?.governorate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{listing.price} TND</td>
                  <td>{listing.views || 0}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(listing.status).class}`}>
                      {getStatusBadge(listing.status).label}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Link 
                        to={`/owner/listings/edit/${listing._id}`}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        ✏️
                      </Link>
                      <Link 
                        to={`/listing/${listing._id}`}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        👁️
                      </Link>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary mb-3">
            Vous n'avez pas encore d'annonces.
          </p>
          <Link to="/owner/listings/create" className="btn btn-primary">
            Créer votre première annonce
          </Link>
        </div>
      )}
    </div>
  );
};

export default OwnerListings;
