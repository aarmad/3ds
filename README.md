Nintendo 3DS Archive - Documentation Technique
📋 Sommaire
Présentation du Projet

Architecture Technique

Installation Locale

Déploiement sur Netlify

Structure des Fichiers

Guide des API

Interface d'Administration

Résolution des Problèmes

Contribuer au Projet

🎮 Présentation du Projet
Nintendo 3DS Archive est un site web complet dédié à la préservation numérique et à l'analyse de la console Nintendo 3DS. Ce projet full-stack présente l'histoire, les succès commerciaux et le marché rétro actuel de cette console emblématique.

Fonctionnalités principales
📜 Histoire complète : Timeline interactive des événements clés (2011-2024)

🏆 Analyse des succès : Statistiques détaillées des ventes et jeux les plus populaires

📈 Marché rétro : Suivi des prix et tendances du marché d'occasion

⚙️ Interface admin : Gestion du contenu via interface React moderne

📱 Design responsive : Compatible mobile, tablette et desktop

Stack Technologique
Frontend : React 18 + Tailwind CSS + Recharts

Backend : Node.js + Express

API : REST avec endpoints structurés

Style : Design system Nintendo-inspired (rouge #e60012, bleu #1b7bb8)

🏗️ Architecture Technique
Structure du Projet
text
nintendo-3ds-site/
├── backend/                    # API Node.js/Express
│   ├── server.js              # Point d'entrée du serveur
│   ├── routes/                # Routes API
│   │   ├── history.js         # Endpoints histoire
│   │   ├── success.js         # Endpoints succès
│   │   └── market.js          # Endpoints marché
│   ├── controllers/           # Logique métier
│   ├── models/                # Modèles de données
│   └── package.json
├── frontend/                  # Application React
│   ├── public/                # Assets statiques
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   ├── styles/            # Styles globaux
│   │   ├── App.js             # Configuration des routes
│   │   └── index.js           # Point d'entrée React
│   ├── package.json
│   ├── tailwind.config.js     # Configuration Tailwind
│   └── postcss.config.js
└── README.md
Schéma de Données
text
API REST ──┬── /api/history    → [ {year, event, details}, ... ]
           ├── /api/success    → {totalSales, topGames: [{title, sales}, ...]}
           └── /api/market     → {trend, currentPrices: [{model, price}, ...], reasons: [...]}
🛠️ Installation Locale
Prérequis
Node.js 16+ et npm

Git (optionnel)

Installation Pas à Pas
1. Cloner et configurer le backend
bash
# Clonez ou créez le dossier du projet
mkdir nintendo-3ds-site
cd nintendo-3ds-site

# Backend
mkdir backend && cd backend
npm init -y
npm install express cors dotenv nodemon

# Créez les fichiers de configuration
touch server.js .env
2. Configurer le frontend
bash
# Retour à la racine
cd ..

# Frontend avec Create React App
npx create-react-app frontend
cd frontend

# Dépendances additionnelles
npm install react-router-dom recharts axios
npm install -D tailwindcss postcss autoprefixer

# Initialiser Tailwind CSS
npx tailwindcss init -p

# Configurer Tailwind dans tailwind.config.js
3. Lancer les deux serveurs
bash
# Terminal 1 - Backend
cd backend
npm run dev
# Serveur accessible sur http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start
# Application accessible sur http://localhost:3000
Scripts Utiles
json
// Dans backend/package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

// Dans frontend/package.json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
☁️ Déploiement sur Netlify
Option A : Frontend uniquement (Recommandé pour débuter)
Construire le frontend :

bash
cd frontend
npm run build
Créer fichier _redirects dans frontend/public/ :

text
/*    /index.html    200
Déployer sur Netlify :

Connectez votre dépôt GitHub

Configuration de build :

Build command : npm run build

Publish directory : build

Variables d'environnement (optionnel) : REACT_APP_API_URL

Option B : Full-stack avec Netlify Functions
toml
# netlify.toml
[build]
  command = "cd frontend && npm run build"
  publish = "frontend/build"

[functions]
  directory = "netlify/functions/"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
Adaptations nécessaires pour Netlify
Backend en fonctions serverless :

javascript
// netlify/functions/api.js
import express from 'express';
import serverless from 'serverless-http';

const app = express();
app.use('/api/history', historyRouter);
export const handler = serverless(app);
Variables d'environnement : Configurez dans Netlify Dashboard

URLs relatives dans le frontend : /api/history au lieu de http://localhost:5000/api/history

📁 Structure des Fichiers
Backend (API Express)
Fichier	Description
server.js	Configuration serveur + middlewares
routes/*.js	Définition des endpoints API
controllers/*.js	Logique de traitement des requêtes
models/data.js	Données JSON (peut être remplacé par une DB)
Frontend (React Application)
Composant	Rôle
Navbar.js	Navigation principale responsive
Hero.js	Bannière d'accueil avec CTA
Timeline.js	Affichage chronologique de l'histoire
GameCard.js	Carte interactive pour chaque jeu
MarketChart.js	Graphiques Recharts pour les tendances
Footer.js	Pied de page avec liens et crédits
Page	Contenu
Home.js	Page d'accueil avec vue d'ensemble
History.js	Timeline complète des événements
Success.js	Statistiques et classement des jeux
Market.js	Analyse du marché rétro actuel
Admin.js	Interface de gestion du contenu
🔌 Guide des API
Endpoints Disponibles
GET /api/history
Réponse :

json
[
  {
    "year": 2011,
    "event": "Sortie mondiale de la Nintendo 3DS",
    "details": "Prix initial : 249 $"
  },
  ...
]
GET /api/success
Réponse :

json
{
  "totalSales": "75,94 millions",
  "topGames": [
    {
      "title": "Mario Kart 7",
      "sales": "18,99 millions"
    },
    ...
  ]
}
GET /api/market
Réponse :

json
{
  "trend": "Les prix des 3DS d'occasion ont augmenté jusqu'à 76 % en 2025",
  "currentPrices": [
    {
      "model": "3DS XL",
      "price": "200 $ – 350 $"
    },
    ...
  ],
  "reasons": [
    "Arrêt de la production (2020)",
    "Fermeture de l'eShop (2023)",
    ...
  ]
}
PUT /api/:section (Admin)
Requête : JSON des données modifiées
Authentification : À implémenter en production

Exemple d'utilisation avec Axios
javascript
// Charger l'histoire
const fetchHistory = async () => {
  const response = await axios.get('/api/history');
  setTimelineData(response.data);
};

// Mettre à jour depuis l'admin
const updateMarketData = async (newData) => {
  await axios.put('/api/market', newData);
  alert('Données mises à jour !');
};
⚙️ Interface d'Administration
Accès
Local : http://localhost:3000/admin

Route React : Composant <Admin /> accessible via navigation

Fonctionnalités
Édition JSON en direct des trois sections (histoire, succès, marché)

Prévisualisation des données avant sauvegarde

Chargement/réinitialisation des données

Interface intuitive avec onglets et validation

Code clé du composant Admin
javascript
// frontend/src/pages/Admin.js
const Admin = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [historyData, setHistoryData] = useState('');
  
  const loadData = async (section) => {
    const response = await axios.get(`/api/${section}`);
    // Affiche les données dans un textarea éditable
  };
  
  const saveData = async (section) => {
    await axios.put(`/api/${section}`, JSON.parse(data));
    // Affiche un message de confirmation
  };
  
  return (
    {/* Interface avec onglets et éditeur JSON */}
  );
};
🐛 Résolution des Problèmes
Erreurs Courantes et Solutions
Problème	Solution
Module not found	npm install dans les deux dossiers
Port déjà utilisé	sudo lsof -i :3000 puis kill -9 PID
CORS errors	Vérifier app.use(cors()) dans server.js
Tailwind non appliqué	Vérifier @tailwind dans index.css
Admin inaccessible	Utiliser /admin (React) pas /admin/admin.html
Commandes de Dépannage
bash
# Vérifier les fichiers manquants
find . -name "*.js" | grep -E "(App|Home|Admin)" | head -10

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Tester l'API
curl http://localhost:5000/api/history
curl http://localhost:5000/api/success
Debug React
Console navigateur : F12 → Console

React DevTools : Extension navigateur

État des composants : Utiliser console.log(state)

Erreurs réseau : F12 → Network → Voir requêtes API

🤝 Contribuer au Projet
Améliorations Possibles
Base de données : Remplacer data.js par MongoDB/PostgreSQL

Authentification : JWT pour sécuriser l'interface admin

Tests : Jest pour le backend, React Testing Library pour le frontend

CI/CD : GitHub Actions pour tests automatiques

PWA : Transformer en Progressive Web App

Bonnes Pratiques de Développement
Commits sémantiques : feat:, fix:, docs:, style:

Branches : main, develop, feature/nouvelle-fonctionnalite

Code review : Pull requests avec descriptions détaillées

Documentation : Mettre à jour le README pour chaque changement majeur

Structure Git Recommandée
bash
# Créer une nouvelle fonctionnalité
git checkout -b feature/admin-authentication

# Travailler et committer
git add .
git commit -m "feat: ajout authentification JWT pour l'admin"

# Fusionner après review
git checkout develop
git merge --no-ff feature/admin-authentication
git branch -d feature/admin-authentication
📄 Licence et Crédits
Données Utilisées
Ventes : Rapports financiers Nintendo (2022)

Jeux : Classement VGChartz et Wikipedia

Prix marché : eBay, PriceCharting, tendances 2024

Dates clés : Archives Nintendo, annonces officielles

Technologies Tierces
React : Bibliothèque UI (Facebook)

Express : Framework backend Node.js

Tailwind CSS : Framework CSS utilitaire

Recharts : Bibliothèque de graphiques React

Axios : Client HTTP

Avertissements
⚠️ Ce projet est éducatif - Non affilié à Nintendo Co., Ltd.
⚠️ Données approximatives - Basées sur sources publiques
⚠️ Usage personnel - Ne pas utiliser commercialement sans autorisation

🚀 Prochaines Étapes
Déployer sur Netlify : Suivre le guide section 4

Ajouter une base de données : MongoDB Atlas (gratuit)

Implémenter l'authentification : Auth0 ou JWT manuel

Optimiser les performances : Lazy loading, code splitting

Ajouter des tests : Jest + React Testing Library

Besoin d'aide ? Consultez la section Résolution des Problèmes ou ouvrez une issue sur GitHub.

Dernière mise à jour : Mars 2025
Projet maintenu par [Votre Nom/Pseudo]
