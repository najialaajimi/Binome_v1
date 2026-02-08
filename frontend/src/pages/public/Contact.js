import React, { useState } from 'react';
import Alert from '../../components/common/Alert';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ padding: '3rem 0' }}>
        <div className="container text-center">
          <h1>Contactez-nous</h1>
          <p>Nous sommes là pour vous aider</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            {/* Contact Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h2 className="text-xl font-semibold mb-3">Envoyez-nous un message</h2>
              
              {submitted && (
                <Alert 
                  type="success" 
                  message="Votre message a été envoyé avec succès!"
                  onClose={() => setSubmitted(false)}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
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
                  <label className="form-label">Sujet</label>
                  <select
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="complaint">Réclamation</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="card mb-3" style={{ padding: '2rem' }}>
                <h3 className="font-semibold mb-3">📍 Nos coordonnées</h3>
                
                <div className="mb-3">
                  <p className="font-medium">Email</p>
                  <p className="text-secondary">
                    <a href="mailto:support@binome.tn">support@binome.tn</a>
                  </p>
                </div>

                <div className="mb-3">
                  <p className="font-medium">Téléphone</p>
                  <p className="text-secondary">
                    <a href="tel:+21671000000">+216 71 000 000</a>
                  </p>
                </div>

                <div className="mb-3">
                  <p className="font-medium">Adresse</p>
                  <p className="text-secondary">
                    123 Rue de la République<br />
                    1000 Tunis, Tunisie
                  </p>
                </div>

                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-secondary">
                    Lun - Ven: 9h00 - 18h00<br />
                    Sam: 9h00 - 13h00
                  </p>
                </div>
              </div>

              <div className="card mb-3" style={{ padding: '2rem' }}>
                <h3 className="font-semibold mb-3">💬 Chat en direct</h3>
                <p className="text-secondary mb-2">
                  Besoin d'une réponse rapide? Notre équipe est disponible en direct.
                </p>
                <button className="btn btn-primary" style={{ width: '100%' }}>
                  Démarrer le chat
                </button>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h3 className="font-semibold mb-3">🤝 Partenariats</h3>
                <p className="text-secondary mb-2">
                  Vous êtes une université, une entreprise ou une association? 
                  Contactez-nous pour explorer les opportunités de partenariat.
                </p>
                <a 
                  href="mailto:partenariats@binome.tn" 
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  partenariats@binome.tn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
