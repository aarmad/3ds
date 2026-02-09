# 🎮 Archive Nintendo 3DS

Une plateforme full-stack complète dédiée à l'histoire, aux statistiques de vente et à l'analyse du marché de la Nintendo 3DS.

## 🚀 Fonctionnalités

*   **Timeline Interactive** : Un voyage à travers les dates clés de la console (2011-2024).
*   **Analyse des Succès** : Visualisation des jeux les plus vendus avec des graphiques dynamiques.
*   **Observatoire du Marché** : Suivi en temps réel de la valeur de collection et des tendances du marché rétro.
*   **Interface Admin** : Un tableau de bord pour gérer et mettre à jour les données du site via une interface moderne.
*   **Design Premium** : Une interface inspirée de l'esthétique Nintendo, entièrement responsive et utilisant des icônes vectorielles.

## 🛠️ Stack Technique

*   **Frontend** : React 18, Tailwind CSS, Lucide React (Icônes), Recharts (Graphiques).
*   **Backend** : Node.js, Express.
*   **Déploiement** : Netlify (Fonctions Serverless pour l'API).

## 📦 Installation Locale

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/aarmad/3ds.git
    cd 3ds
    ```

2.  **Installer les dépendances**
    ```bash
    # Racine (pour les fonctions Netlify)
    npm install
    
    # Backend
    cd backend
    npm install
    
    # Frontend
    cd ../frontend
    npm install
    ```

3.  **Lancer le projet**
    Il est recommandé d'ouvrir deux terminaux :
    *   Terminal 1 (Backend) : `cd backend && npm run dev`
    *   Terminal 2 (Frontend) : `cd frontend && npm start`

## 📂 Structure du Projet

```text
├── backend/            # API Express traditionnelle
│   ├── controllers/    # Logique métier
│   ├── models/         # Données et schémas
│   └── routes/         # Définition des points d'entrée
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants réutilisables
│   │   ├── pages/      # Vues principales
│   │   └── styles/     # Configuration CSS/Tailwind
├── netlify/
│   └── functions/      # Adaptateur pour le déploiement serverless
└── netlify.toml        # Configuration du déploiement
```

## 🌐 Déploiement

Le projet est configuré pour être déployé sur **Netlify**. Le fichier `netlify.toml` à la racine gère automatiquement :
1.  Le build du frontend React.
2.  L'exposition du backend via des fonctions serverless (`/api/*`).
3.  Les redirections pour le support du routage client (SPA).

## ⚠️ Notes importantes

*   **AdBlockers** : Si vous rencontrez l'erreur `ERR_BLOCKED_BY_CLIENT` lors du développement local, désactivez votre bloqueur de publicités pour `localhost`. Certains outils bloquent les URLs contenant "/api/".
*   **Persistence** : En mode serverless (sur Netlify), les modifications faites via l'interface Admin sont temporaires car le backend utilise actuellement un stockage en mémoire. Pour une persistence réelle, une base de données (type MongoDB) devrait être connectée.

---
Créé avec ❤️ pour la communauté Nintendo.
