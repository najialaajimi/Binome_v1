import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/common/Alert';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, error } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant',
    phone: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    
    try {
      const response = await login(loginData);
      const dashboardUrl = response.user.role === 'admin' 
        ? '/admin/dashboard' 
        : response.user.role === 'owner' 
          ? '/owner/dashboard' 
          : '/tenant/dashboard';
      navigate(dashboardUrl);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setFormError('Les mots de passe ne correspondent pas');
      return;
    }

    if (registerData.password.length < 6) {
      setFormError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = registerData;
      const response = await register(userData);
      const dashboardUrl = response.user.role === 'owner' 
        ? '/owner/dashboard' 
        : '/tenant/dashboard';
      navigate(dashboardUrl);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="text-2xl font-bold text-center mb-4">
          Bienvenue sur Binome
        </h1>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Connexion
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Inscription
          </button>
        </div>

        {(formError || error) && (
          <Alert 
            type="danger" 
            message={formError || error} 
            onClose={() => setFormError(null)}
          />
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="votre@email.com"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="text-right mb-3">
              <a href="/forgot-password" className="text-sm text-primary">
                Mot de passe oublié?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

            <div className="mt-4">
              <p className="text-center text-secondary text-sm mb-2">
                Ou continuer avec
              </p>
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  disabled
                >
                  Google
                </button>
                <button 
                  type="button"
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  disabled
                >
                  Facebook
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <p className="text-sm text-secondary mb-2">Je suis:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`btn ${registerData.role === 'tenant' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1 }}
                  onClick={() => setRegisterData(prev => ({ ...prev, role: 'tenant' }))}
                >
                  🏠 Locataire
                </button>
                <button
                  type="button"
                  className={`btn ${registerData.role === 'owner' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1 }}
                  onClick={() => setRegisterData(prev => ({ ...prev, role: 'owner' }))}
                >
                  🔑 Propriétaire
                </button>
              </div>
            </div>

            <div className="grid grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
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
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="+216 XX XXX XXX"
                value={registerData.phone}
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
