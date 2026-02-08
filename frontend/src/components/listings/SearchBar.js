import React from 'react';

const SearchBar = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-bar-content">
          <div className="search-input-group">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Ville, quartier, université..."
              value={filters.search || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="search-input-group" style={{ minWidth: '150px' }}>
            <select
              name="propertyType"
              className="form-control"
              value={filters.propertyType || ''}
              onChange={handleChange}
            >
              <option value="">Type de logement</option>
              <option value="apartment">Appartement</option>
              <option value="studio">Studio</option>
              <option value="house">Maison</option>
              <option value="room">Chambre</option>
              <option value="shared">Colocation</option>
            </select>
          </div>
          
          <div className="search-input-group" style={{ minWidth: '150px' }}>
            <select
              name="priceRange"
              className="form-control"
              value={filters.priceRange || ''}
              onChange={handleChange}
            >
              <option value="">Budget</option>
              <option value="0-300">Moins de 300 TND</option>
              <option value="300-500">300 - 500 TND</option>
              <option value="500-800">500 - 800 TND</option>
              <option value="800-1200">800 - 1200 TND</option>
              <option value="1200+">Plus de 1200 TND</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">
            🔍 Rechercher
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
