const express = require('express');
const router = express.Router();
const modsController = require('../controllers/mods.controller');

router.post('/addmods', modsController.addModRecord);
router.get('/getMods/:date', modsController.getVehicleModsByDate);
router.post('/editmods', modsController.editMods);
router.delete('/deletemods/:date', modsController.deleteMod);
module.exports = router;
