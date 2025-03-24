# ⚽ Football Scouting App

Application complète MERN (MongoDB + Express + React + Node.js) de gestion et évaluation de jeunes talents du football.


## 🚀 Fonctionnalités principales

- Ajouter / Modifier / Supprimer un joueur
- Affichage de statistiques individuelles
- Ajout de matchs et commentaires
- Marquage de joueurs favoris (⭐)
- Upload photo moderne
- Recherche, filtres, tri et pagination
- Design sombre et responsive avec CSS classique (inspiré FIFA)

## 🛠️ Technologies utilisées

- **Frontend** : React.js + CSS
- **Backend** : Express.js
- **Base de données** : MongoDB Atlas
- **ORM** : Mongoose
- **Upload fichiers** : Multer
- **Tests API** : Swagger

## 📦 Installation des dépendances

### 🔧 Backend

cd backend
npm install
📄 Dépendances :
express

mongoose

multer

dotenv

cors

🔧 Frontend

cd frontend
npm install
📄 Dépendances :
axios
react-router-dom

▶️ Démarrage du projet

Génération automatique des joueurs – scripts/generatePlayers.js
Ce projet inclut un script de génération de données réalistes pour remplir automatiquement la base de données MongoDB avec :

✅ 20 joueurs réels célèbres (Messi, Ronaldo, Mbappé…)

✅ 5 matchs simulés pour chaque joueur

✅ ✅ Évaluations techniques aléatoires réalistes

✅ Des commentaires automatiques

✅ Certains joueurs marqués comme favoris

📥 Objectif du script :
Faciliter la démonstration ou les tests fonctionnels du projet sans avoir à saisir manuellement les données dans les formulaires.

🚀 Exécution du script :

Assurez-vous que votre base MongoDB est bien connectée (.env correctement configuré avec la variable MONGO_URI).

Puis, dans le terminal :

cd backend
node scripts/generatePlayers.js
✅ Le script :

Supprime tous les anciens joueurs (Player.deleteMany())

Insère automatiquement les nouveaux joueurs enrichis

📌 Remarque :
Ce fichier n’est pas exécuté automatiquement, vous devez le lancer manuellement si vous souhaitez réinitialiser la base ou enrichir les données.


🔥 Démarrer le backend

cd backend
npm start
Le serveur tourne sur : http://localhost:5000

💻 Démarrer le frontend
cd frontend
npm start
L'application s'affiche sur : http://localhost:3000
  

  📸 Upload Photo
Les photos sont stockées dans le dossier backend/uploads/ et accessibles via l’URL:
 http://localhost:5000/uploads/filename.jpg

Auteurs
Projet académique réalisé pour une évaluation Mastère Big Data & IA

Développé par LASSOUED SADDEM 
