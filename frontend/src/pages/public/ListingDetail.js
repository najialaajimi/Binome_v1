import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/common/Loading';

const ListingDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingService.getListing(id);
        setListing(response.data);
      } catch (err) {
        setError('Logement non trouvé');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return;
    }
    try {
      if (isFavorite) {
        await userService.removeFavorite(id);
      } else {
        await userService.addFavorite(id);
      }
      setIsFavorite(!isFavorite);
    } catch {
      console.log('Error updating favorite');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(price);
  };

  const amenityLabels = {
    wifi: '📶 WiFi',
    parking: '🚗 Parking',
    ac: '❄️ Climatisation',
    heating: '🔥 Chauffage',
    washer: '🧺 Machine à laver',
    dryer: '👕 Sèche-linge',
    kitchen: '🍳 Cuisine équipée',
    tv: '📺 TV',
    elevator: '🛗 Ascenseur',
    security: '🔐 Sécurité',
    balcony: '🏠 Balcon',
    furnished: '🛋️ Meublé',
    utilities_included: '💡 Charges incluses',
    pet_friendly: '🐾 Animaux acceptés'
  };

  if (loading) {
    return <Loading text="Chargement du logement..." />;
  }

  if (error || !listing) {
    return (
      <div className="container py-4">
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2>😕 {error || 'Logement non trouvé'}</h2>
          <Link to="/search" className="btn btn-primary mt-3">
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <div className="mb-3 text-secondary">
        <Link to="/">Accueil</Link> &gt; <Link to="/search">Recherche</Link> &gt; {listing.title}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Main Content */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          {/* Image Gallery */}
          <div className="card mb-3" style={{ overflow: 'hidden' }}>
            <div style={{ 
              height: '400px', 
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {listing.images?.length > 0 ? (
                <img
                  src={listing.images[activeImage]?.url}
                  alt={listing.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/800x400?text=Pas+d'image"
                  alt="Placeholder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
            
            {listing.images?.length > 1 && (
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                padding: '0.5rem',
                overflowX: 'auto'
              }}>
                {listing.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`${listing.title} - ${idx + 1}`}
                    style={{ 
                      width: '80px', 
                      height: '60px', 
                      objectFit: 'cover',
                      cursor: 'pointer',
                      borderRadius: '0.25rem',
                      border: activeImage === idx ? '2px solid #2563eb' : '2px solid transparent'
                    }}
                    onClick={() => setActiveImage(idx)}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x60?text=X';
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="card mb-3" style={{ padding: '1.5rem' }}>
            <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
            <p className="text-secondary mb-3">
              📍 {listing.address?.street && `${listing.address.street}, `}
              {listing.address?.city}, {listing.address?.governorate}
            </p>
            
            <div className="flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
              {listing.bedrooms && (
                <span className="badge badge-primary">🛏️ {listing.bedrooms} chambre(s)</span>
              )}
              {listing.bathrooms && (
                <span className="badge badge-primary">🚿 {listing.bathrooms} salle(s) de bain</span>
              )}
              {listing.area && (
                <span className="badge badge-primary">📐 {listing.area} m²</span>
              )}
            </div>

            <h3 className="font-semibold mb-2">Description</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities?.length > 0 && (
            <div className="card mb-3" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-2">Équipements inclus</h3>
              <div className="grid grid-3" style={{ gap: '0.75rem' }}>
                {listing.amenities.map(amenity => (
                  <span key={amenity} className="text-secondary">
                    {amenityLabels[amenity] || amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nearby */}
          {(listing.nearbyUniversities?.length > 0 || listing.nearbyTransport?.length > 0) && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-2">À proximité</h3>
              
              {listing.nearbyUniversities?.length > 0 && (
                <div className="mb-2">
                  <h4 className="text-sm text-secondary mb-1">Universités</h4>
                  {listing.nearbyUniversities.map((uni, idx) => (
                    <p key={idx}>🎓 {uni.name} - {uni.distance} km</p>
                  ))}
                </div>
              )}
              
              {listing.nearbyTransport?.length > 0 && (
                <div>
                  <h4 className="text-sm text-secondary mb-1">Transports</h4>
                  {listing.nearbyTransport.map((transport, idx) => (
                    <p key={idx}>🚌 {transport.name} - {transport.distance} km</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ flex: 1, minWidth: '300px' }}>
          {/* Price Card */}
          <div className="card mb-3" style={{ padding: '1.5rem' }}>
            <div className="text-3xl font-bold text-primary mb-1">
              {formatPrice(listing.price)}
              <span className="text-sm font-normal text-secondary">
                /{listing.priceType === 'daily' ? 'jour' : listing.priceType === 'weekly' ? 'semaine' : 'mois'}
              </span>
            </div>
            
            <div className="flex flex-col gap-2 mt-3">
              <Link 
                to={isAuthenticated ? `/messages?listing=${id}` : '/auth'}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                💬 Contacter le propriétaire
              </Link>
              <Link 
                to={isAuthenticated ? `/booking/visit/${id}` : '/auth'}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                📅 Demander une visite
              </Link>
              <button 
                className={`btn ${isFavorite ? 'btn-primary' : 'btn-outline'}`}
                onClick={handleFavorite}
                style={{ width: '100%' }}
              >
                {isFavorite ? '❤️ Dans vos favoris' : '🤍 Ajouter aux favoris'}
              </button>
            </div>
          </div>

          {/* Owner Card */}
          {listing.owner && (
            <div className="card mb-3" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-2">Propriétaire</h3>
              <div className="flex gap-2">
                <img
                  src={listing.owner.avatar || 'https://via.placeholder.com/60'}
                  alt={`${listing.owner.firstName} ${listing.owner.lastName}`}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <p className="font-medium">
                    {listing.owner.firstName} {listing.owner.lastName}
                  </p>
                  <p className="text-sm text-secondary">
                    Membre depuis {new Date(listing.owner.createdAt).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Availability */}
          {listing.availability && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-semibold mb-2">Disponibilité</h3>
              <p className="text-secondary">
                À partir du {new Date(listing.availability.startDate).toLocaleDateString('fr-FR')}
              </p>
              {listing.availability.minDuration && (
                <p className="text-secondary text-sm mt-1">
                  Durée minimum: {listing.availability.minDuration} mois
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ListingDetail;
