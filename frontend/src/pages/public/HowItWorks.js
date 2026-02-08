import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const tenantSteps = [
    {
      number: '1',
      title: 'Créez votre compte',
      description: 'Inscrivez-vous gratuitement en quelques minutes et complétez votre profil.'
    },
    {
      number: '2',
      title: 'Recherchez un logement',
      description: 'Utilisez nos filtres avancés pour trouver le logement idéal près de votre université.'
    },
    {
      number: '3',
      title: 'Contactez le propriétaire',
      description: 'Envoyez un message ou demandez une visite directement via la plateforme.'
    },
    {
      number: '4',
      title: 'Réservez en toute sécurité',
      description: 'Finalisez votre réservation et signez votre contrat en ligne.'
    }
  ];

  const ownerSteps = [
    {
      number: '1',
      title: 'Créez votre compte propriétaire',
      description: 'Inscrivez-vous et accédez à votre espace de gestion dédié.'
    },
    {
      number: '2',
      title: 'Publiez votre annonce',
      description: 'Ajoutez des photos, une description détaillée et fixez votre prix.'
    },
    {
      number: '3',
      title: 'Recevez des demandes',
      description: 'Consultez les profils des locataires intéressés et organisez des visites.'
    },
    {
      number: '4',
      title: 'Gérez vos locations',
      description: 'Suivez vos réservations, contrats et paiements depuis votre tableau de bord.'
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ padding: '3rem 0' }}>
        <div className="container text-center">
          <h1>Comment ça marche?</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Binome simplifie la recherche et la gestion de logements en quelques étapes simples.
          </p>
        </div>
      </section>

      {/* For Tenants */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🏠 Pour les locataires</h2>
          <div className="grid grid-4">
            {tenantSteps.map((step, index) => (
              <div 
                key={index} 
                className="card" 
                style={{ padding: '2rem', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1rem'
                }}>
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/search" className="btn btn-primary">
              Trouver un logement
            </Link>
          </div>
        </div>
      </section>

      {/* For Owners */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">🔑 Pour les propriétaires</h2>
          <div className="grid grid-4">
            {ownerSteps.map((step, index) => (
              <div 
                key={index} 
                className="card" 
                style={{ padding: '2rem', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1rem'
                }}>
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/auth" className="btn btn-primary" style={{ backgroundColor: '#10b981' }}>
              Publier une annonce
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🛡️ Nos garanties</h2>
          <div className="grid grid-3">
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="font-semibold mb-2">✓ Profils vérifiés</h3>
              <p className="text-secondary text-sm">
                Tous les utilisateurs sont vérifiés pour garantir des échanges fiables.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="font-semibold mb-2">✓ Paiements sécurisés</h3>
              <p className="text-secondary text-sm">
                Vos transactions sont protégées par nos systèmes de sécurité avancés.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="font-semibold mb-2">✓ Support 24/7</h3>
              <p className="text-secondary text-sm">
                Notre équipe est disponible pour vous aider à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">❓ Questions fréquentes</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                q: 'Est-ce gratuit de s\'inscrire?',
                a: 'Oui, l\'inscription est totalement gratuite pour les locataires et les propriétaires.'
              },
              {
                q: 'Comment sont vérifiés les logements?',
                a: 'Chaque annonce est examinée par notre équipe avant publication. Nous vérifions les photos et les informations fournies.'
              },
              {
                q: 'Puis-je annuler une réservation?',
                a: 'Oui, selon les conditions d\'annulation définies par le propriétaire. Les détails sont indiqués sur chaque annonce.'
              },
              {
                q: 'Comment contacter le support?',
                a: 'Vous pouvez nous joindre par email à support@binome.tn ou via le formulaire de contact.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="card mb-2" 
                style={{ padding: '1.5rem' }}
              >
                <h3 className="font-semibold">{item.q}</h3>
                <p className="text-secondary mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
