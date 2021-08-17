const db = require('../_helpers/database');
const Mod = db.Mods;

module.exports = {
    addModRecord,
    getVehicleModsByDate,
    editMods,
    deleteMod
};

async function addModRecord(record) {
    const newRecord = new Mod(record);
    newRecord.date = new Date(record.date);
    newRecord.addDate = new Date(record.addDate);
    newRecord.vehicleAddDate = new Date(record.vehicleAddDate);
    return await newRecord.save();
}

async function getVehicleModsByDate(date) {
    return await Mod.find({vehicleAddDate: date});
}

async function editMods(record) {
    return await Mod.updateOne(
        {addDate: record.addDate},
        {$set: {
            type: record.type,
            cost: record.cost,
            make: record.make,
            partname: record.partname,
            mileage: record.mileage,
            date: new Date(record.date)
            }}

    );
}

async function deleteMod(date) {
    return await Mod.deleteOne({addDate: date});
}

