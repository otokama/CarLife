const rankcardService = require('../services/rankcard.service')

module.exports = {
    getAllRankcards,
    getRankByUser,
    updateRank
};

function getAllRankcards(req, res, next) {
    console.log('getting rank record');
    rankcardService.getAllRankcards()
        .then(rankrecords => res.json(rankrecords))
        .catch(err => next(err));
}

function getRankByUser(req, res, next) {
    rankcardService.getRankByUser(req.params.username)
        .then(rankcard => res.json(rankcard))
        .catch(err => next(err));
}


function updateRank(req, res, next) {
    rankcardService.updateRankcard(req.body, req.params.username)
        .then(() => res.json())
        .catch(err => next(err));
}
