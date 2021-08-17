const vehicleService = require('../services/vehicle.service')

module.exports = {
    addVehicle,
    getVehicles,
    getAllVehicles,
    getVehiclesByDate,
    deleteVehicle,
    editVehicle,
    updateMileage
};

function addVehicle(req, res, next) {
    vehicleService.addVehicleRecord(req.body)
        .then(() => res.json('added vehicle'))
        .catch(err => next(err));
}

function getVehicles(req, res, next) {
    vehicleService.getVehicles(req.params.username)
        .then((vehicles => res.json(vehicles)))
        .catch(err => next(err));
}

function getAllVehicles(req, res, next) {
    vehicleService.getAllVehicles()
        .then((vehicles => res.json(vehicles)))
        .catch(err => next(err));
}

function getVehiclesByDate(req, res, next) {
    vehicleService.getVehicleByDate(new Date(req.params.date))
        .then(vehicle => res.json(vehicle))
        .catch(err => next(err));
}

function deleteVehicle(req, res, next) {
    vehicleService.deleteVehicle(req.params.date)
        .then(() => res.json('deleted vehicle'))
        .catch(err => next(err));
}

function editVehicle(req, res, next) {
    vehicleService.editVehicle(req.body)
        .then(() => res.json('updated vehicle'))
        .catch(err => next(err));
}

function updateMileage(req, res, next) {
    vehicleService.updateMileage(new Date(req.params.date), req.body)
        .then(() => res.json('updated vehicle mileage'))
        .catch(err => next(err));
}
