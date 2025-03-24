const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/Player');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const generateRandomEvaluation = () => ({
  speed: Math.floor(Math.random() * 51) + 50,
  dribble: Math.floor(Math.random() * 51) + 50,
  vision: Math.floor(Math.random() * 51) + 50,
  endurance: Math.floor(Math.random() * 51) + 50,
  physical: Math.floor(Math.random() * 51) + 50,
  tactical: Math.floor(Math.random() * 51) + 50,
  potential: Math.floor(Math.random() * 51) + 50
});

const generateMatch = (position) => {
  return {
    date: new Date(),
    competition: "Championnat Régional",
    opponent: `Équipe ${Math.floor(Math.random() * 100)}`,
    position,
    goals: Math.floor(Math.random() * 4),
    assists: Math.floor(Math.random() * 4),
    minutesPlayed: Math.floor(Math.random() * 30) + 60,
    matchRating: Math.floor(Math.random() * 3) + 7,
    comments: "Bon match, joueur décisif."
  };
};

const playersData = [
  { fullName: "Lionel Messi", age: 36, nationality: "Argentine", position: "Milieu offensif" },
  { fullName: "Cristiano Ronaldo", age: 39, nationality: "Portugal", position: "Avant-centre" },
  { fullName: "Kylian Mbappé", age: 25, nationality: "France", position: "Ailier gauche" },
  { fullName: "Neymar Jr", age: 32, nationality: "Brésil", position: "Ailier gauche" },
  { fullName: "Karim Benzema", age: 36, nationality: "France", position: "Avant-centre" },
  { fullName: "Kevin De Bruyne", age: 33, nationality: "Belgique", position: "Milieu offensif" },
  { fullName: "Erling Haaland", age: 24, nationality: "Norvège", position: "Avant-centre" },
  { fullName: "Luka Modrić", age: 38, nationality: "Croatie", position: "Milieu central" },
  { fullName: "Vinícius Jr", age: 24, nationality: "Brésil", position: "Ailier gauche" },
  { fullName: "Achraf Hakimi", age: 25, nationality: "Maroc", position: "Arrière droit" },
  { fullName: "Harry Kane", age: 31, nationality: "Angleterre", position: "Avant-centre" },
  { fullName: "Mohamed Salah", age: 32, nationality: "Égypte", position: "Ailier droit" },
  { fullName: "Sadio Mané", age: 33, nationality: "Sénégal", position: "Ailier gauche" },
  { fullName: "Robert Lewandowski", age: 36, nationality: "Pologne", position: "Avant-centre" },
  { fullName: "Jude Bellingham", age: 21, nationality: "Angleterre", position: "Milieu central" },
  { fullName: "Antoine Griezmann", age: 33, nationality: "France", position: "Milieu offensif" },
  { fullName: "Riyad Mahrez", age: 34, nationality: "Algérie", position: "Ailier droit" },
  { fullName: "João Félix", age: 25, nationality: "Portugal", position: "Milieu offensif" },
  { fullName: "Pedri", age: 22, nationality: "Espagne", position: "Milieu central" },
  { fullName: "Jamal Musiala", age: 22, nationality: "Allemagne", position: "Milieu offensif" }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connexion MongoDB réussie');

     await Player.deleteMany();

    const levelTags = ['Espoir', 'Pro', 'À suivre'];
    const photoUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    for (const data of playersData) {
      const levelTag = levelTags[Math.floor(Math.random() * levelTags.length)];

      const player = new Player({
        ...data,
        videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(data.fullName)}`,
        evaluation: generateRandomEvaluation(),
        levelTag,
        photoUrl,
        comments: ["Joueur prometteur.", "À suivre de près."],
        isFavorite: Math.random() > 0.5
      });

      for (let j = 0; j < 5; j++) {
        player.matchHistory.push(generateMatch(data.position));
      }

      await player.save();
      console.log(`✅ ${data.fullName} créé avec 5 matchs`);
    }

    console.log("✅ Tous les joueurs réels avec données enrichies ont été insérés avec succès !");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur de génération :", err);
  }
};

run();
