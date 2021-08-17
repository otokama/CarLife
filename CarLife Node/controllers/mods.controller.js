const modService = require('../services/mods.service')

module.exports = {
    addModRecord,
    getVehicleModsByDate,
    editMods,
    deleteMod
};


function addModRecord(req, res, next) {
    modService.addModRecord(req.body)
        .then(() => res.json('added new mod'))
        .catch(err => next(err));
}

function getVehicleModsByDate(req, res, next) {
    modService.getVehicleModsByDate(new Date(req.params.date))
        .then(records => res.json(records))
        .catch(err => next(err));
}

function editMods(req, res, next) {
    modService.editMods(req.body)
        .then(() => res.json('edited mod.'))
        .catch(err => next(err));
}

function deleteMod(req, res, next) {
    modService.deleteMod(new Date(req.params.date))
        .then(() => res.json('deleted mod.'))
        .catch(err => next(err));
}
