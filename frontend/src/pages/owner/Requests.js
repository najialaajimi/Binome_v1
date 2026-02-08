import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import Loading from '../../components/common/Loading';

const OwnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await bookingService.getBookings();
      setRequests(response.data || []);
    } catch (err) {
      console.log('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookingService.updateBooking(id, { status });
      setRequests(prev => 
        prev.map(r => r._id === id ? { ...r, status } : r)
      );
    } catch (err) {
      console.log('Error updating request');
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  if (loading) {
    return <Loading text="Chargement des demandes..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Demandes</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['pending', 'approved', 'all'].map(status => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(status)}
            style={{ padding: '0.5rem 1rem' }}
          >
            {status === 'pending' ? 'En attente' :
             status === 'approved' ? 'Approuvées' : 'Toutes'}
          </button>
        ))}
      </div>

      {filteredRequests.length > 0 ? (
        <div className="grid" style={{ gap: '1rem' }}>
          {filteredRequests.map(request => (
            <div key={request._id} className="card" style={{ padding: '1.5rem' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div className="flex gap-2">
                  <img
                    src={request.tenant?.avatar || 'https://via.placeholder.com/60'}
                    alt=""
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <div>
                    <h3 className="font-semibold">
                      {request.tenant?.firstName} {request.tenant?.lastName}
                    </h3>
                    <p className="text-sm text-secondary">
                      {request.type === 'visit' ? '📅 Demande de visite' : '🏠 Réservation'}
                    </p>
                    <p className="text-sm text-secondary">
                      Pour: {request.listing?.title}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem' }}
                        onClick={() => handleUpdateStatus(request._id, 'approved')}
                      >
                        ✓ Accepter
                      </button>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.5rem 1rem', color: '#ef4444' }}
                        onClick={() => handleUpdateStatus(request._id, 'rejected')}
                      >
                        ✗ Refuser
                      </button>
                    </>
                  )}
                  {request.status !== 'pending' && (
                    <span className={`badge ${
                      request.status === 'approved' ? 'badge-success' : 
                      request.status === 'rejected' ? 'badge-danger' : ''
                    }`}>
                      {request.status === 'approved' ? 'Approuvée' : 
                       request.status === 'rejected' ? 'Refusée' : request.status}
                    </span>
                  )}
                </div>
              </div>

              {request.notes && (
                <div className="mt-2" style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <p className="text-sm">
                    <strong>Message:</strong> {request.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary">
            Aucune demande {filter !== 'all' ? 'correspondante' : ''}.
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerRequests;
