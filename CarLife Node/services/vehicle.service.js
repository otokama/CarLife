const db = require('../_helpers/database');
const Vehicle = db.VehicleRecord;

module.exports ={
    addVehicleRecord,
    getVehicles,
    getAllVehicles,
    getVehicleByDate,
    deleteVehicle,
    editVehicle,
    updateMileage
};

async function addVehicleRecord(record) {
    const newRecord = new Vehicle(record);
    newRecord.addDate = new Date(record.addDate);
    newRecord.ownedSince = new Date(record.ownedSince);
    return await newRecord.save();
}

async function getVehicles(username) {
    return await Vehicle.find({ownerUsername: username});
}

async function getAllVehicles() {
    return await Vehicle.find({});
}

async function getVehicleByDate(date) {
    return await Vehicle.findOne({addDate: date});
}

async function deleteVehicle(date) {
    if (await Vehicle.find({addDate: date})) {
        console.log('found record');
    }
    return await Vehicle.deleteOne({addDate: date});
}

async function editVehicle(record) {
    return await Vehicle.updateOne(
        {addDate: record.addDate},
        {$set: {
            nickname: record.nickname,
            make: record.make,
            year: record.year,
            model: record.model,
            mileage: record.mileage,
            ownedSince: new Date(record.ownedSince),
            bodyType: record.bodyType
        }}
    );
}

async function updateMileage(date, record) {
    return await Vehicle.updateOne(
        {addDate: date},
        {$set: {
                mileage: record.miles
            }}
    );
}
