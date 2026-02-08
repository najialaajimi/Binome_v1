import React, { useState } from 'react';

const RoommateFinder = () => {
  const [filters, setFilters] = useState({
    age: '',
    nationality: '',
    languages: '',
    budget: ''
  });

  const [profiles] = useState([
    {
      id: 1,
      name: 'Ali B.',
      age: 22,
      nationality: 'Tunisien',
      languages: ['Français', 'Arabe', 'Anglais'],
      budget: '400 TND',
      bio: 'Étudiant en ingénierie, calme et organisé.',
      avatar: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Sophie L.',
      age: 24,
      nationality: 'Française',
      languages: ['Français', 'Anglais'],
      budget: '500 TND',
      bio: 'En stage à Tunis pour 6 mois, cherche colocation.',
      avatar: 'https://via.placeholder.com/80'
    },
    {
      id: 3,
      name: 'Mohamed K.',
      age: 21,
      nationality: 'Marocain',
      languages: ['Français', 'Arabe'],
      budget: '350 TND',
      bio: 'Étudiant en médecine, non-fumeur.',
      avatar: 'https://via.placeholder.com/80'
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recherche de binôme</h1>
      
      <p className="text-secondary mb-4">
        Trouvez le colocataire idéal pour partager votre logement.
      </p>

      {/* Filters */}
      <div className="card mb-4" style={{ padding: '1.5rem' }}>
        <h3 className="font-semibold mb-3">Filtres</h3>
        <div className="grid grid-4" style={{ gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Âge</label>
            <select
              name="age"
              className="form-control"
              value={filters.age}
              onChange={handleChange}
            >
              <option value="">Tous</option>
              <option value="18-21">18-21 ans</option>
              <option value="22-25">22-25 ans</option>
              <option value="26+">26+ ans</option>
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Nationalité</label>
            <select
              name="nationality"
              className="form-control"
              value={filters.nationality}
              onChange={handleChange}
            >
              <option value="">Toutes</option>
              <option value="tunisien">Tunisien</option>
              <option value="francais">Français</option>
              <option value="marocain">Marocain</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Langues</label>
            <select
              name="languages"
              className="form-control"
              value={filters.languages}
              onChange={handleChange}
            >
              <option value="">Toutes</option>
              <option value="francais">Français</option>
              <option value="arabe">Arabe</option>
              <option value="anglais">Anglais</option>
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Budget max</label>
            <select
              name="budget"
              className="form-control"
              value={filters.budget}
              onChange={handleChange}
            >
              <option value="">Tous</option>
              <option value="300">300 TND</option>
              <option value="400">400 TND</option>
              <option value="500">500 TND</option>
              <option value="600+">600+ TND</option>
            </select>
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="grid grid-3">
        {profiles.map(profile => (
          <div key={profile.id} className="card" style={{ padding: '1.5rem' }}>
            <div className="flex gap-2 mb-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-secondary">{profile.age} ans</p>
                <p className="text-sm text-secondary">{profile.nationality}</p>
              </div>
            </div>
            
            <p className="text-sm mb-2">{profile.bio}</p>
            
            <div className="flex gap-1 mb-2" style={{ flexWrap: 'wrap' }}>
              {profile.languages.map(lang => (
                <span key={lang} className="badge badge-primary">
                  {lang}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-secondary mb-3">
              💰 Budget: {profile.budget}/mois
            </p>
            
            <button className="btn btn-primary" style={{ width: '100%' }}>
              💬 Contacter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoommateFinder;
