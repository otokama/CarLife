const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankcard.controller');

router.get('/getAllRankcards', rankController.getAllRankcards);
router.post('/updaterank/:username', rankController.updateRank);
router.get('/getRankByUser/:username', rankController.getRankByUser);
module.exports = router;
