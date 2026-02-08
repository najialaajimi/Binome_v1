import React, { useState } from 'react';

const AdminSupport = () => {
  const [tickets] = useState([
    {
      id: 1,
      subject: 'Problème de connexion',
      user: 'Jean D.',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      subject: 'Annonce non affichée',
      user: 'Marie L.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      subject: 'Question sur le paiement',
      user: 'Ahmed K.',
      status: 'closed',
      priority: 'low',
      createdAt: '2024-01-13'
    }
  ]);

  const [filter, setFilter] = useState('open');

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === filter);

  const getStatusBadge = (status) => {
    const badges = {
      open: { class: 'badge-danger', label: 'Ouvert' },
      in_progress: { class: 'badge-warning', label: 'En cours' },
      closed: { class: 'badge-success', label: 'Fermé' }
    };
    return badges[status] || { class: '', label: status };
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { class: 'badge-danger', label: 'Haute' },
      medium: { class: 'badge-warning', label: 'Moyenne' },
      low: { class: 'badge-primary', label: 'Basse' }
    };
    return badges[priority] || { class: '', label: priority };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Support client</h1>

      {/* Stats */}
      <div className="stats-grid mb-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <p className="stat-value">{tickets.filter(t => t.status === 'open').length}</p>
          <p className="stat-label">Tickets ouverts</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{tickets.filter(t => t.status === 'in_progress').length}</p>
          <p className="stat-label">En cours</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{tickets.filter(t => t.status === 'closed').length}</p>
          <p className="stat-label">Résolus</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['open', 'in_progress', 'closed', 'all'].map(status => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(status)}
            style={{ padding: '0.5rem 1rem' }}
          >
            {status === 'open' ? 'Ouverts' :
             status === 'in_progress' ? 'En cours' :
             status === 'closed' ? 'Fermés' : 'Tous'}
          </button>
        ))}
      </div>

      {/* Tickets */}
      {filteredTickets.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sujet</th>
                <th>Utilisateur</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.user}</td>
                  <td>
                    <span className={`badge ${getPriorityBadge(ticket.priority).class}`}>
                      {getPriorityBadge(ticket.priority).label}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(ticket.status).class}`}>
                      {getStatusBadge(ticket.status).label}
                    </span>
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary">Aucun ticket trouvé.</p>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
