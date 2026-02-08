# Binome - Plateforme de Location pour Étudiants et Expatriés en Tunisie

Une plateforme Web MERN (MongoDB, Express.js, React.js, Node.js) spécialisée dans la location de logements adaptés aux besoins spécifiques des étudiants et des étrangers en Tunisie.

## 🚀 Fonctionnalités

### Pages Publiques
- **Page d'Accueil** - Hero avec call-to-action, barre de recherche, témoignages
- **Page de Recherche** - Filtres avancés, vue liste/grille
- **Détail Logement** - Galerie photos, description, équipements, contact propriétaire
- **Inscription/Connexion** - Tabs Locataire/Propriétaire, validation en temps réel
- **À Propos / Comment ça marche** - Guide utilisateur et FAQ
- **Contact** - Formulaire, coordonnées support

### Espace Locataire
- Tableau de bord avec vue d'ensemble
- Gestion du profil et préférences
- Favoris et historique de recherches
- Messagerie avec propriétaires
- Gestion des réservations et visites
- Recherche de binôme (colocation)

### Espace Propriétaire
- Tableau de bord avec statistiques
- Gestion des annonces (création, édition, suppression)
- Gestion des demandes (visites, réservations)
- Messagerie avec locataires
- Gestion des avis

### Module Administration
- Tableau de bord avec statistiques globales
- Modération des annonces
- Gestion des utilisateurs
- Support client (tickets)
- Gestion du contenu (CGU, FAQ)

## 🛠️ Technologies

- **Frontend**: React.js, React Router, Axios, Leaflet
- **Backend**: Node.js, Express.js
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT (JSON Web Tokens)
- **Styling**: CSS personnalisé (responsive)

## 📁 Structure du Projet

```
Binome_v1/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── listingController.js
│   │   ├── bookingController.js
│   │   ├── messageController.js
│   │   ├── reviewController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Listing.js
│   │   ├── Booking.js
│   │   ├── Message.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── listings.js
│   │   ├── bookings.js
│   │   ├── messages.js
│   │   ├── reviews.js
│   │   ├── admin.js
│   │   └── users.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── listings/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── tenant/
│   │   │   ├── owner/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- MongoDB
- npm ou yarn

### Backend

```bash
cd backend
cp .env.example .env  # Configurer les variables d'environnement
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## ⚙️ Variables d'Environnement

Créez un fichier `.env` dans le dossier `backend/`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/binome_db
JWT_SECRET=votre_secret_jwt
JWT_EXPIRE=30d
NODE_ENV=development
```

## 📱 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/updatedetails` - Mise à jour profil

### Annonces
- `GET /api/listings` - Liste des annonces
- `GET /api/listings/:id` - Détail annonce
- `POST /api/listings` - Créer annonce (propriétaire)
- `PUT /api/listings/:id` - Modifier annonce
- `DELETE /api/listings/:id` - Supprimer annonce

### Réservations
- `GET /api/bookings` - Mes réservations
- `POST /api/bookings` - Créer réservation
- `PUT /api/bookings/:id` - Modifier statut

### Messages
- `GET /api/messages/conversations` - Conversations
- `POST /api/messages` - Envoyer message

### Administration
- `GET /api/admin/stats` - Statistiques
- `GET /api/admin/users` - Gestion utilisateurs
- `GET /api/admin/listings` - Modération annonces

## 🎨 Responsive Design

La plateforme est entièrement responsive et optimisée pour:
- 📱 Mobile (< 640px)
- 📱 Tablette (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🔒 Sécurité

- Authentification JWT
- Mots de passe hashés (bcrypt)
- Validation des entrées
- Protection des routes par rôle (tenant, owner, admin)
- CORS configuré

## 📄 Licence

Ce projet est développé pour les besoins spécifiques du marché tunisien de la location étudiante.

## 👥 Équipe

Développé par l'équipe Binome pour simplifier la recherche de logement des étudiants et expatriés en Tunisie.