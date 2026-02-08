import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ padding: '3rem 0' }}>
        <div className="container text-center">
          <h1>À propos de Binome</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Notre mission est de simplifier la recherche de logement pour les étudiants 
            et expatriés en Tunisie.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 className="text-2xl font-bold mb-3">Notre Mission</h2>
              <p className="text-secondary mb-2">
                Binome est née d'un constat simple : trouver un logement adapté aux besoins 
                spécifiques des étudiants et des étrangers en Tunisie peut être un véritable 
                défi.
              </p>
              <p className="text-secondary mb-2">
                Notre plateforme vise à simplifier ce processus en proposant des solutions 
                sécurisées, transparentes et conviviales.
              </p>
              <p className="text-secondary">
                Nous mettons en relation les locataires et les propriétaires de manière 
                efficace, tout en garantissant la qualité et la fiabilité des annonces.
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#f1f5f9', 
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <img 
                src="https://via.placeholder.com/400x300?text=Notre+Mission" 
                alt="Mission"
                style={{ borderRadius: '0.5rem', maxWidth: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="grid grid-3">
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem' }}>🔒</span>
              <h3 className="font-semibold mt-2 mb-1">Sécurité</h3>
              <p className="text-secondary text-sm">
                Protection des données et transactions sécurisées pour tous nos utilisateurs.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem' }}>🤝</span>
              <h3 className="font-semibold mt-2 mb-1">Transparence</h3>
              <p className="text-secondary text-sm">
                Informations claires et vérifiées sur tous les logements proposés.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem' }}>💡</span>
              <h3 className="font-semibold mt-2 mb-1">Innovation</h3>
              <p className="text-secondary text-sm">
                Utilisation des dernières technologies pour une meilleure expérience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4" style={{ textAlign: 'center' }}>
            <div>
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-secondary">Logements</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5000+</p>
              <p className="text-secondary">Utilisateurs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24</p>
              <p className="text-secondary">Gouvernorats</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-secondary">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ 
        backgroundColor: '#2563eb', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Prêt à trouver votre logement idéal?
          </h2>
          <Link 
            to="/search" 
            className="btn" 
            style={{ backgroundColor: 'white', color: '#2563eb' }}
          >
            Commencer la recherche
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
