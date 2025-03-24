const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

router.post('/players/:id/comment', controller.addCommentToPlayer);

module.exports = router;