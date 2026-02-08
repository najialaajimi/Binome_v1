import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../../components/listings/ListingCard';
import SearchBar from '../../components/listings/SearchBar';
import { listingService } from '../../services/listingService';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await listingService.getFeaturedListings();
        setFeaturedListings(response.data || []);
      } catch {
        console.log('Error fetching featured listings');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(filters).toString();
    window.location.href = `/search?${params}`;
  };

  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      role: 'Étudiante',
      text: "J'ai trouvé mon appartement en moins d'une semaine grâce à Binome. La plateforme est simple et les propriétaires sont réactifs.",
      avatar: 'https://via.placeholder.com/60'
    },
    {
      id: 2,
      name: 'Ahmed B.',
      role: 'Propriétaire',
      text: "Excellente plateforme pour gérer mes annonces. J'ai toujours des locataires sérieux et le processus est très professionnel.",
      avatar: 'https://via.placeholder.com/60'
    },
    {
      id: 3,
      name: 'Marie L.',
      role: 'Expatriée',
      text: "En tant qu'étrangère, Binome m'a facilité la recherche de logement à Tunis. Tout est transparent et sécurisé.",
      avatar: 'https://via.placeholder.com/60'
    }
  ];

  const advantages = [
    {
      icon: '🔒',
      title: 'Sécurisé',
      description: 'Vérification des profils et paiements sécurisés pour une tranquillité d\'esprit.'
    },
    {
      icon: '🎯',
      title: 'Ciblé',
      description: 'Logements adaptés aux besoins des étudiants et expatriés en Tunisie.'
    },
    {
      icon: '💬',
      title: 'Support réactif',
      description: 'Équipe dédiée disponible pour vous accompagner dans votre recherche.'
    },
    {
      icon: '📍',
      title: 'Géolocalisé',
      description: 'Trouvez un logement proche de votre université ou lieu de travail.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Trouvez votre logement idéal en Tunisie</h1>
            <p>
              La plateforme de référence pour les étudiants et expatriés à la recherche 
              d'un logement adapté à leurs besoins.
            </p>
            <div className="hero-buttons">
              <Link to="/search" className="btn btn-primary" style={{ backgroundColor: 'white', color: '#2563eb' }}>
                🔍 Trouver un logement
              </Link>
              <Link to="/auth" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                🏠 Proposer un logement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container">
        <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      </div>

      {/* Advantages Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Pourquoi choisir Binome?</h2>
          <div className="grid grid-4">
            {advantages.map((item, index) => (
              <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>{item.icon}</span>
                <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p className="text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <h2 className="section-title">Logements recommandés</h2>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : featuredListings.length > 0 ? (
            <div className="grid grid-3">
              {featuredListings.map(listing => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-center text-secondary">
              Aucun logement recommandé pour le moment.
            </p>
          )}
          <div className="text-center mt-4">
            <Link to="/search" className="btn btn-primary">
              Voir tous les logements
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ce que disent nos utilisateurs</h2>
          <div className="grid grid-3">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="card" style={{ padding: '2rem' }}>
                <div className="flex gap-2" style={{ marginBottom: '1rem' }}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-secondary text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', color: '#64748b' }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ 
        backgroundColor: '#2563eb', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Vous êtes propriétaire?
          </h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
            Publiez votre annonce gratuitement et trouvez des locataires fiables.
          </p>
          <Link 
            to="/auth" 
            className="btn btn-primary" 
            style={{ backgroundColor: 'white', color: '#2563eb' }}
          >
            Publier une annonce
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
