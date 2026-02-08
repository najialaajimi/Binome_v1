import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import ListingCard from '../../components/listings/ListingCard';
import Loading from '../../components/common/Loading';

const TenantFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await userService.getFavorites();
      setFavorites(response.data || []);
    } catch (err) {
      console.log('Error fetching favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (listingId) => {
    try {
      await userService.removeFavorite(listingId);
      setFavorites(prev => prev.filter(f => f._id !== listingId));
    } catch (err) {
      console.log('Error removing favorite');
    }
  };

  if (loading) {
    return <Loading text="Chargement de vos favoris..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes favoris</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-3">
          {favorites.map(listing => (
            <div key={listing._id} style={{ position: 'relative' }}>
              <ListingCard listing={listing} />
              <button
                onClick={() => handleRemoveFavorite(listing._id)}
                className="btn btn-outline"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '0.5rem',
                  backgroundColor: 'white'
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-secondary mb-3">
            Vous n'avez pas encore de favoris.
          </p>
          <Link to="/search" className="btn btn-primary">
            Parcourir les logements
          </Link>
        </div>
      )}
    </div>
  );
};

export default TenantFavorites;
