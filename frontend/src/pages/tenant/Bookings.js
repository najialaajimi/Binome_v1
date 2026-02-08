import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import Loading from '../../components/common/Loading';

const TenantBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getBookings();
      setBookings(response.data || []);
    } catch (err) {
      console.log('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', label: 'En attente' },
      approved: { class: 'badge-success', label: 'Approuvée' },
      rejected: { class: 'badge-danger', label: 'Refusée' },
      cancelled: { class: 'badge-secondary', label: 'Annulée' },
      completed: { class: 'badge-primary', label: 'Terminée' }
    };
    return badges[status] || { class: '', label: status };
  };

  if (loading) {
    return <Loading text="Chargement de vos réservations..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes réservations</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'approved', 'completed'].map(status => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(status)}
            style={{ padding: '0.5rem 1rem' }}
          >
            {status === 'all' ? 'Toutes' : 
             status === 'pending' ? 'En attente' :
             status === 'approved' ? 'Approuvées' : 'Terminées'}
          </button>
        ))}
      </div>

      {filteredBookings.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Logement</th>
                <th>Type</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    <div className="flex gap-2">
                      <img
                        src={booking.listing?.images?.[0]?.url || 'https://via.placeholder.com/60'}
                        alt=""
                        style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <p className="font-medium">{booking.listing?.title}</p>
                        <p className="text-sm text-secondary">
                          {booking.listing?.address?.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {booking.type === 'visit' ? '📅 Visite' : '🏠 Réservation'}
                  </td>
                  <td>
                    {new Date(booking.startDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(booking.status).class}`}>
                      {getStatusBadge(booking.status).label}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/tenant/bookings/${booking._id}`}
                      className="btn btn-outline"
                      style={{ padding: '0.25rem 0.75rem' }}
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary mb-3">
            Aucune réservation trouvée.
          </p>
          <Link to="/search" className="btn btn-primary">
            Rechercher un logement
          </Link>
        </div>
      )}
    </div>
  );
};

export default TenantBookings;
