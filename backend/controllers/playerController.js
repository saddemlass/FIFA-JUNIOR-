const Player = require('../models/Player');
exports.getAllPlayers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.position) filters.position = req.query.position;
    if (req.query.nationality) filters.nationality = req.query.nationality;
    if (req.query.levelTag) filters.levelTag = req.query.levelTag;
    if (req.query.age) filters.age = { $lte: Number(req.query.age) };

    const sort = {};
    if (req.query.sortBy) sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;

    const players = await Player.find(filters).sort(sort);
    const cleanedPlayers = players.map(p => {
      const { __v, ...rest } = p.toObject();
      return rest;
    });

    res.json(cleanedPlayers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    const { __v, ...rest } = player.toObject();
    res.json(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlayerPhoto = async (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const player = await Player.findByIdAndUpdate(req.params.id, { photoUrl: imageUrl }, { new: true });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.status(200).json({ photoUrl: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    await Player.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMatchToPlayer = async (req, res) => {
  try {
    const { date, competition, opponent, position, goals, assists, minutesPlayed, matchRating, comments } = req.body;
    if (!date || !competition || !opponent || !position) {
      return res.status(400).json({ message: 'Champs de match incomplets ou invalides' });
    }

    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.matchHistory.push({ date, competition, opponent, position, goals, assists, minutesPlayed, matchRating, comments });
    await player.save();

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Ajouter un commentaire
exports.addCommentToPlayer = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || comment.trim() === '') {
      return res.status(400).json({ message: 'Commentaire vide non autorisé' });
    }

    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.comments.push(comment);
    await player.save();

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.isFavorite = !player.isFavorite;
    await player.save();

    res.status(200).json({ isFavorite: player.isFavorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPlayerStatisticsById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Joueur introuvable' });

    const totalGoals = player.matchHistory.reduce((sum, match) => sum + (match.goals || 0), 0);
    const totalAssists = player.matchHistory.reduce((sum, match) => sum + (match.assists || 0), 0);
    const totalMinutes = player.matchHistory.reduce((sum, match) => sum + (match.minutesPlayed || 0), 0);
    const averageRating =
      player.matchHistory.length > 0
        ? (player.matchHistory.reduce((sum, match) => sum + (match.matchRating || 0), 0) / player.matchHistory.length).toFixed(2)
        : 0;

    res.status(200).json({
      playerId: player._id,
      fullName: player.fullName,
      totalGoals,
      totalAssists,
      totalMinutes,
      averageRating: Number(averageRating)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


