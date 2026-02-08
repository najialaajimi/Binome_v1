import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../../components/listings/ListingCard';
import { listingService } from '../../services/listingService';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    propertyType: searchParams.get('propertyType') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    governorate: searchParams.get('governorate') || '',
    page: 1
  });

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.propertyType) params.propertyType = filters.propertyType;
      if (filters.priceMin) params['price[gte]'] = filters.priceMin;
      if (filters.priceMax) params['price[lte]'] = filters.priceMax;
      if (filters.bedrooms) params.bedrooms = filters.bedrooms;
      if (filters.governorate) params['address.governorate'] = filters.governorate;
      params.page = filters.page;

      const response = await listingService.getListings(params);
      setListings(response.data || []);
      setPagination(response.pagination || {});
    } catch {
      console.log('Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
    fetchListings();
  };

  const governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sousse', 'Sfax', 
    'Monastir', 'Nabeul', 'Bizerte', 'Gabès', 'Kairouan', 'Béja',
    'Gafsa', 'Jendouba', 'Kasserine', 'Kébili', 'Kef', 'Mahdia',
    'Médenine', 'Sidi Bouzid', 'Siliana', 'Tataouine', 'Tozeur', 'Zaghouan'
  ];

  return (
    <div className="container py-4">
      {/* Filters Sidebar and Results */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Filters */}
        <aside style={{ 
          width: '280px', 
          flexShrink: 0,
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          height: 'fit-content'
        }}>
          <h3 className="font-semibold mb-3">Filtres</h3>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Ville, quartier..."
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gouvernorat</label>
              <select
                name="governorate"
                className="form-control"
                value={filters.governorate}
                onChange={handleFilterChange}
              >
                <option value="">Tous les gouvernorats</option>
                {governorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Type de logement</label>
              <select
                name="propertyType"
                className="form-control"
                value={filters.propertyType}
                onChange={handleFilterChange}
              >
                <option value="">Tous les types</option>
                <option value="apartment">Appartement</option>
                <option value="studio">Studio</option>
                <option value="house">Maison</option>
                <option value="room">Chambre</option>
                <option value="shared">Colocation</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prix minimum (TND)</label>
              <input
                type="number"
                name="priceMin"
                className="form-control"
                placeholder="0"
                value={filters.priceMin}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Prix maximum (TND)</label>
              <input
                type="number"
                name="priceMax"
                className="form-control"
                placeholder="5000"
                value={filters.priceMax}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Chambres</label>
              <select
                name="bedrooms"
                className="form-control"
                value={filters.bedrooms}
                onChange={handleFilterChange}
              >
                <option value="">Toutes</option>
                <option value="1">1 chambre</option>
                <option value="2">2 chambres</option>
                <option value="3">3 chambres</option>
                <option value="4">4+ chambres</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Appliquer les filtres
            </button>
          </form>
        </aside>

        {/* Results */}
        <main style={{ flex: 1, minWidth: '300px' }}>
          {/* Header */}
          <div className="flex-between mb-3">
            <h2 className="text-xl font-semibold">
              {loading ? 'Recherche...' : `${listings.length} logements trouvés`}
            </h2>
            <div className="flex gap-1">
              <button
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewMode('grid')}
                style={{ padding: '0.5rem' }}
              >
                ⊞
              </button>
              <button
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewMode('list')}
                style={{ padding: '0.5rem' }}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Listings */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : listings.length > 0 ? (
            <>
              <div className={viewMode === 'grid' ? 'grid grid-3' : 'flex flex-col gap-2'}>
                {listings.map(listing => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex-center gap-2 mt-4">
                {pagination.prev && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                  >
                    ← Précédent
                  </button>
                )}
                {pagination.next && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Suivant →
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p className="text-secondary">
                Aucun logement ne correspond à vos critères.
              </p>
              <button 
                className="btn btn-primary mt-2"
                onClick={() => {
                  setFilters({
                    search: '',
                    propertyType: '',
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    governorate: '',
                    page: 1
                  });
                  setSearchParams({});
                  fetchListings();
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;
