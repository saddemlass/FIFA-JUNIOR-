const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  competition: { type: String, required: true },
  opponent: { type: String, required: true },
  position: { type: String, required: true },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  minutesPlayed: { type: Number, required: true },
  matchRating: { type: Number, min: 0, max: 10 },
  comments: { type: String }
});

const EvaluationSchema = {
  speed: { type: Number, required: true },
  dribble: { type: Number, required: true },
  vision: { type: Number, required: true },
  endurance: { type: Number, required: true },
  physical: { type: Number, required: true },
  tactical: { type: Number, required: true },
  potential: { type: Number, required: true }
};

const PlayerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  nationality: { type: String, required: true },
  position: { type: String, required: true },
  videoUrl: { type: String, required: true },
  evaluation: EvaluationSchema,
  levelTag: { type: String, required: true },
  photoUrl: { type: String, required: true },
  matchHistory: [MatchSchema],
  comments: [String],
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;
