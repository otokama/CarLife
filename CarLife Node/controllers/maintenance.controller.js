const mainService = require('../services/maintenance.service')

module.exports = {
    addMaintenanceRecord,
    getMainRecord,
    deleteRecord,
    editRecord
};

function addMaintenanceRecord(req, res, next) {
    mainService.addMaintenance(req.body)
        .then(() => res.json('added maintenance record.'))
        .catch(err => next(err));
}

function getMainRecord(req, res, next) {
    mainService.getMaintenanceByVehicle(new Date(req.params.date))
        .then(record => res.json(record))
        .catch(err=>next(err));
}

function deleteRecord(req, res, next) {
    mainService.deleteRecord(new Date(req.params.date))
        .then(() => res.json('deleted maintenance record.'))
        .catch(err => next(err));
}

function editRecord(req, res, next) {
    mainService.editRecord( new Date(req.params.date), req.body)
        .then(() => res.json('updated maintenance record.'))
        .catch(err => next(err));
}
