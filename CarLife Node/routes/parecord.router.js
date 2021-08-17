const express = require('express');
const router = express.Router();
const parecordController = require('../controllers/parecord.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addparecord', parecordController.createPArecord);
router.get('/getparecords', parecordController.getPArecords);
router.delete('/:date', parecordController.deletePArecord);
router.get('/getparecord/:date', parecordController.getPARecordByDate);
router.post('/editparecord/:date', parecordController.editPArecord);
module.exports = router;
