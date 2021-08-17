var express = require('express');
var router = express.Router();
const mainController = require('../controllers/maintenance.controller');

router.post('/addmainrecord', mainController.addMaintenanceRecord);
router.get('/getmainrecord/:date', mainController.getMainRecord);
router.delete('/:date', mainController.deleteRecord);
router.post('/editmainrecord/:date', mainController.editRecord);
// serve angular front end files from root path
router.use('/', express.static('app', { redirect: false }));

// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('app/index.html'));
});

module.exports = router;
