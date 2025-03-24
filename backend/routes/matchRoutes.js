const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

router.post('/players/:id/match', controller.addMatchToPlayer);

module.exports = router;

