
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const controller = require('../controllers/playerController');

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});


router.get('/players', controller.getAllPlayers);


router.get('/players/:id', controller.getPlayerById);


router.post('/players', controller.createPlayer);


router.put('/players/:id', controller.updatePlayer);


router.patch('/players/:id/photo', upload.single('photo'), controller.updatePlayerPhoto);

router.delete('/players/:id', controller.deletePlayer);

router.post('/players/:id/match', controller.addMatchToPlayer);


router.post('/players/:id/comment', controller.addCommentToPlayer);


router.patch('/players/:id/favorite', controller.toggleFavorite);


router.get('/players/:id/statistics', controller.getPlayerStatisticsById);

module.exports = router;

