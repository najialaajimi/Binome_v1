import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import Alert from '../../components/common/Alert';

const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    price: '',
    priceType: 'monthly',
    address: {
      street: '',
      city: '',
      governorate: '',
      postalCode: ''
    },
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    amenities: [],
    availability: {
      startDate: new Date().toISOString().split('T')[0],
      minDuration: 1
    }
  });

  const governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sousse', 'Sfax', 
    'Monastir', 'Nabeul', 'Bizerte', 'Gabès', 'Kairouan', 'Béja',
    'Gafsa', 'Jendouba', 'Kasserine', 'Kébili', 'Kef', 'Mahdia',
    'Médenine', 'Sidi Bouzid', 'Siliana', 'Tataouine', 'Tozeur', 'Zaghouan'
  ];

  const amenitiesList = [
    { id: 'wifi', label: '📶 WiFi' },
    { id: 'parking', label: '🚗 Parking' },
    { id: 'ac', label: '❄️ Climatisation' },
    { id: 'heating', label: '🔥 Chauffage' },
    { id: 'washer', label: '🧺 Machine à laver' },
    { id: 'kitchen', label: '🍳 Cuisine équipée' },
    { id: 'tv', label: '📺 TV' },
    { id: 'elevator', label: '🛗 Ascenseur' },
    { id: 'security', label: '🔐 Sécurité' },
    { id: 'balcony', label: '🏠 Balcon' },
    { id: 'furnished', label: '🛋️ Meublé' },
    { id: 'utilities_included', label: '💡 Charges incluses' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await listingService.createListing(formData);
      navigate('/owner/listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nouvelle annonce</h1>

      {/* Progress Steps */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map(s => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: s <= step ? '#2563eb' : '#e2e8f0',
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      {error && (
        <Alert type="danger" message={error} onClose={() => setError(null)} />
      )}

      <div className="card" style={{ padding: '2rem', maxWidth: '800px' }}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold mb-3">1. Informations de base</h2>
            
            <div className="form-group">
              <label className="form-label">Type de logement *</label>
              <select
                name="propertyType"
                className="form-control"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez</option>
                <option value="apartment">Appartement</option>
                <option value="studio">Studio</option>
                <option value="house">Maison</option>
                <option value="room">Chambre</option>
                <option value="shared">Colocation</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Titre de l'annonce *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Ex: Studio meublé près de la Faculté"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-control"
                rows="5"
                placeholder="Décrivez votre logement en détail..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="grid grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Chambres</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="form-control"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Salles de bain</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="form-control"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Surface (m²)</label>
              <input
                type="number"
                name="area"
                className="form-control"
                placeholder="Ex: 50"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold mb-3">2. Localisation</h2>
            
            <div className="form-group">
              <label className="form-label">Gouvernorat *</label>
              <select
                name="address.governorate"
                className="form-control"
                value={formData.address.governorate}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez</option>
                {governorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Ville *</label>
              <input
                type="text"
                name="address.city"
                className="form-control"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Adresse</label>
              <input
                type="text"
                name="address.street"
                className="form-control"
                placeholder="Rue, numéro..."
                value={formData.address.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Code postal</label>
              <input
                type="text"
                name="address.postalCode"
                className="form-control"
                value={formData.address.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Step 3: Amenities & Price */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold mb-3">3. Équipements et prix</h2>
            
            <div className="form-group">
              <label className="form-label">Équipements disponibles</label>
              <div className="grid grid-3" style={{ gap: '0.5rem' }}>
                {amenitiesList.map(amenity => (
                  <label
                    key={amenity.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid',
                      borderColor: formData.amenities.includes(amenity.id) 
                        ? '#2563eb' 
                        : '#e2e8f0',
                      cursor: 'pointer',
                      backgroundColor: formData.amenities.includes(amenity.id)
                        ? 'rgba(37, 99, 235, 0.1)'
                        : 'transparent'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      style={{ display: 'none' }}
                    />
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Prix *</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Ex: 500"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type de prix</label>
                <select
                  name="priceType"
                  className="form-control"
                  value={formData.priceType}
                  onChange={handleChange}
                >
                  <option value="monthly">Par mois</option>
                  <option value="weekly">Par semaine</option>
                  <option value="daily">Par jour</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {step === 4 && (
          <div>
            <h2 className="font-semibold mb-3">4. Disponibilité</h2>
            
            <div className="form-group">
              <label className="form-label">Date de disponibilité</label>
              <input
                type="date"
                name="availability.startDate"
                className="form-control"
                value={formData.availability.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Durée minimum (mois)</label>
              <select
                name="availability.minDuration"
                className="form-control"
                value={formData.availability.minDuration}
                onChange={handleChange}
              >
                <option value="1">1 mois</option>
                <option value="3">3 mois</option>
                <option value="6">6 mois</option>
                <option value="12">12 mois</option>
              </select>
            </div>

            <div className="card" style={{ 
              padding: '1.5rem', 
              backgroundColor: '#f8fafc',
              marginTop: '1.5rem'
            }}>
              <h3 className="font-semibold mb-2">📝 Résumé</h3>
              <p><strong>Type:</strong> {formData.propertyType}</p>
              <p><strong>Titre:</strong> {formData.title}</p>
              <p><strong>Localisation:</strong> {formData.address.city}, {formData.address.governorate}</p>
              <p><strong>Prix:</strong> {formData.price} TND/{formData.priceType === 'monthly' ? 'mois' : formData.priceType === 'weekly' ? 'semaine' : 'jour'}</p>
              <p><strong>Équipements:</strong> {formData.amenities.length} sélectionnés</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex-between mt-4">
          {step > 1 ? (
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={prevStep}
            >
              ← Précédent
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={nextStep}
            >
              Suivant →
            </button>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Publication...' : 'Publier l\'annonce'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
