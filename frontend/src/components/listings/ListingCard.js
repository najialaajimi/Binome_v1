import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const {
    _id,
    title,
    price,
    priceType,
    address,
    images,
    bedrooms,
    bathrooms,
    area,
    propertyType
  } = listing;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(price);
  };

  const getPriceLabel = () => {
    switch (priceType) {
      case 'daily':
        return '/jour';
      case 'weekly':
        return '/semaine';
      default:
        return '/mois';
    }
  };

  const propertyTypeLabels = {
    apartment: 'Appartement',
    studio: 'Studio',
    house: 'Maison',
    room: 'Chambre',
    shared: 'Colocation'
  };

  return (
    <Link to={`/listing/${_id}`} className="listing-card">
      <img
        src={images?.[0]?.url || '/images/placeholder-property.jpg'}
        alt={title}
        className="listing-card-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x250?text=Image+non+disponible';
        }}
      />
      <div className="listing-card-content">
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
          {propertyTypeLabels[propertyType] || propertyType}
        </span>
        <h3 className="listing-card-title">{title}</h3>
        <p className="listing-card-location">
          📍 {address?.city}, {address?.governorate}
        </p>
        <div className="listing-card-features">
          {bedrooms && <span>🛏️ {bedrooms} ch.</span>}
          {bathrooms && <span>🚿 {bathrooms} sdb</span>}
          {area && <span>📐 {area} m²</span>}
        </div>
        <p className="listing-card-price">
          {formatPrice(price)}<span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>{getPriceLabel()}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
