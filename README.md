Nintendo 3DS Archive - Documentation Technique
📋 Sommaire
1. Présentation du Projet
2. Architecture Technique
3. Installation Locale
4. Déploiement sur Netlify
5. Structure des Fichiers
6. Guide des API
7. Interface d'Administration
8. Résolution des Problèmes
9. Contribuer au Projet

🎮 Présentation du Projet
Nintendo 3DS Archive est un site web complet dédié à la préservation numérique et à l'analyse de la console Nintendo 3DS. Ce projet full-stack présente l'histoire, les succès commerciaux et le marché rétro actuel de cette console emblématique.

Fonctionnalités principales
- 📜 **Histoire complète** : Timeline interactive des événements clés (2011-2024)
- 🏆 **Analyse des succès** : Statistiques détaillées des ventes et jeux les plus populaires
- 📈 **Marché rétro** : Suivi des prix et tendances du marché d'occasion
- ⚙️ **Interface admin** : Gestion du contenu via interface React moderne
- 📱 **Design responsive** : Compatible mobile, tablette et desktop
- ✨ **Interface Moderne** : Utilisation d'icônes vectorielles Lucide React pour une esthétique premium

Stack Technologique
- **Frontend** : React 18 + Tailwind CSS + Recharts + Lucide React (Icônes)
- **Backend** : Node.js + Express
- **API** : REST avec endpoints structurés
- **Style** : Design system Nintendo-inspired (rouge #e60012, bleu #1b7bb8)

🏗️ Architecture Technique
Structure du Projet
```text
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
```

Schéma de Données
```text
API REST ──┬── /api/history    → [ {year, event, details}, ... ]
           ├── /api/success    → {totalSales, topGames: [{title, sales}, ...]}
           └── /api/market     → {trend, currentPrices: [{model, price}, ...], reasons: [...]}
```

🛠️ Installation Locale
Prérequis
- Node.js 16+ et npm
- Git (optionnel)

Installation Pas à Pas
1. Cloner et configurer le backend
```bash
# Clonez ou créez le dossier du projet
mkdir nintendo-3ds-site
cd nintendo-3ds-site

# Backend
mkdir backend && cd backend
npm init -y
npm install express cors dotenv nodemon
```

2. Configurer le frontend
```bash
# Retour à la racine
cd ..

# Frontend avec Create React App
npx create-react-app frontend
cd frontend

# Dépendances additionnelles
npm install react-router-dom recharts axios lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialiser Tailwind CSS
npx tailwindcss init -p
```

3. Lancer les deux serveurs
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

☁️ Déploiement sur Netlify
Option A : Frontend uniquement (Recommandé pour débuter)
1. Construire le frontend :
```bash
cd frontend
npm run build
```

2. Créer fichier `_redirects` dans `frontend/public/` :
```text
/*    /index.html    200
```

3. Déployer sur Netlify via GitHub :
- Build command : `npm run build`
- Publish directory : `build`

📁 Structure des Fichiers
Backend (API Express)
| Fichier | Description |
| :--- | :--- |
| `server.js` | Configuration serveur + middlewares |
| `routes/*.js` | Définition des endpoints API |
| `controllers/*.js` | Logique de traitement des requêtes |
| `models/data.js` | Données JSON |

Frontend (React Application)
| Composant | Rôle |
| :--- | :--- |
| `Navbar.js` | Navigation avec icônes Lucide |
| `Hero.js` | Bannière d'accueil modernisée |
| `Timeline.js` | Affichage chronologique |
| `GameCard.js` | Carte avec icônes thématiques (Mario, Pokémon...) |
| `MarketChart.js` | Graphiques interactifs avec tooltips iconisés |
| `Footer.js` | Pied de page structuré |

🔌 Guide des API
Endpoints Disponibles
`GET /api/history`
`GET /api/success`
`GET /api/market`
`PUT /api/:section` (Admin)

⚙️ Interface d'Administration
Accès : `http://localhost:3000/admin`
Fonctionnalités :
- Édition JSON en direct avec icônes de statut (Succès/Erreur)
- Navigation par onglets iconisés
- Sauvegarde sécurisée via API

🐛 Résolution des Problèmes
| Problème | Solution |
| :--- | :--- |
| Module not found | `npm install` dans le dossier concerné |
| Port déjà utilisé | `kill -9 $(lsof -t -i:3000)` |
| CORS errors | Vérifier `app.use(cors())` dans le backend |
| Icônes manquantes | Vérifier l'installation de `lucide-react` |

🤝 Contribuer au Projet
Améliorations Possibles
- Base de données : MongoDB/PostgreSQL
- Authentification : JWT/Auth0
- Tests : Jest & RTL
- PWA : Support hors-ligne

📄 Licence et Crédits
⚠️ Ce projet est éducatif - Non affilié à Nintendo Co., Ltd.
⚠️ Données approximatives - Basées sur sources publiques

Dernière mise à jour : Janvier 2026
Projet maintenu par [Aarmad](https://github.com/aarmad)
