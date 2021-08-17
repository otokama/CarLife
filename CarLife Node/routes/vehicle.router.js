var express = require('express');
var router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.post('/addvehicle', vehicleController.addVehicle);
router.get('/getvehicles/:username', vehicleController.getVehicles);
router.get('/getallvehicles', vehicleController.getAllVehicles);
router.get('/getvehiclesbydate/:date', vehicleController.getVehiclesByDate);
router.delete('/deletevehicle/:date', vehicleController.deleteVehicle);
router.post('/editvehicle', vehicleController.editVehicle);
router.post('/updatemileage/:date', vehicleController.updateMileage);
module.exports = router;
