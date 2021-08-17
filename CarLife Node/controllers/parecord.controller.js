const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord,
    editPArecord,
    getPARecordByDate
};


function createPArecord(req, res, next) {
    //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    parecordService.addPArecord(req.body, req.user.sub)
        .then(records => {console.log("add records"); console.log(records); res.json(records)})
        .catch(err => next(err));

}

function getPArecords(req,res,next){
    //TODO: return all parecords from the database and send to the client.
    parecordService.getAllPArecords(req.user.sub)
        .then(records => {console.log("sent all records"); res.json(records)
        }).catch(err => next(err));

}


function getPARecordByDate(req, res, next){
    parecordService.getPARecordByDate(new Date(req.params.date), req.user.sub)
        .then(record => {console.log('sent record by date'); res.json(record)})
        .catch(err => next(err));
}



function editPArecord(req, res, next){
    parecordService.editPArecord(req.body, new Date(req.params.date), req.user.sub)
        .then(record => {console.log("updated record"); res.json(record);
        }).catch(err => next(err));
}


function deletePArecord(req,res,next){
    //TODO: delete parecord from the database and respond to the client by conforming the action.
    parecordService.deletePArecord(new Date(req.params.date), req.user.sub)
        .then(record => {console.log("deleted record"); res.json(record)})
        .catch(err => next(err));
}
