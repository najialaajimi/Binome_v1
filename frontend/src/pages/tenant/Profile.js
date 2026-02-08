import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/common/Alert';

const TenantProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    nationality: user?.nationality || '',
    languages: user?.languages?.join(', ') || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const updateData = {
        ...formData,
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean)
      };
      await updateUser(updateData);
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Erreur lors de la mise à jour' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mon profil</h1>

      {message && (
        <Alert 
          type={message.type} 
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      <div className="card" style={{ padding: '2rem', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nationalité</label>
            <input
              type="text"
              name="nationality"
              className="form-control"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Langues parlées (séparées par des virgules)</label>
            <input
              type="text"
              name="languages"
              className="form-control"
              placeholder="Français, Arabe, Anglais"
              value={formData.languages}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              className="form-control"
              rows="4"
              placeholder="Parlez-nous de vous..."
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantProfile;
