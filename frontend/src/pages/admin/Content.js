import React, { useState } from 'react';

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('pages');

  const pages = [
    { id: 1, title: 'Conditions Générales d\'Utilisation', slug: '/terms', updated: '2024-01-10' },
    { id: 2, title: 'Politique de Confidentialité', slug: '/privacy', updated: '2024-01-10' },
    { id: 3, title: 'FAQ', slug: '/faq', updated: '2024-01-08' }
  ];

  const articles = [
    { id: 1, title: 'Comment trouver le logement idéal', status: 'published', date: '2024-01-12' },
    { id: 2, title: 'Guide du propriétaire débutant', status: 'draft', date: '2024-01-11' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion du contenu</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
        {['pages', 'articles', 'faq'].map(tab => (
          <button
            key={tab}
            className={`btn`}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === tab ? '#2563eb' : '#64748b',
              borderRadius: 0
            }}
          >
            {tab === 'pages' ? '📄 Pages' :
             tab === 'articles' ? '📰 Articles' : '❓ FAQ'}
          </button>
        ))}
      </div>

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div>
          <div className="flex-between mb-3">
            <h2 className="font-semibold">Pages statiques</h2>
            <button className="btn btn-primary">+ Nouvelle page</button>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>URL</th>
                  <th>Dernière modification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page.id}>
                    <td className="font-medium">{page.title}</td>
                    <td className="text-secondary">{page.slug}</td>
                    <td>{new Date(page.updated).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                        ✏️ Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div>
          <div className="flex-between mb-3">
            <h2 className="font-semibold">Articles du blog</h2>
            <button className="btn btn-primary">+ Nouvel article</button>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id}>
                    <td className="font-medium">{article.title}</td>
                    <td>
                      <span className={`badge ${article.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td>{new Date(article.date).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                          ✏️
                        </button>
                        <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div>
          <div className="flex-between mb-3">
            <h2 className="font-semibold">Questions fréquentes</h2>
            <button className="btn btn-primary">+ Nouvelle question</button>
          </div>
          
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p className="text-secondary">
              Gérez les questions fréquentes ici.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
