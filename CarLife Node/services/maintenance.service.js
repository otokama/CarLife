const db = require('../_helpers/database');
const Main = db.MaintenanceRecord;

module.exports = {
    addMaintenance,
    getMaintenanceByVehicle,
    deleteRecord,
    editRecord
};

async function addMaintenance(record) {
    const newRecord = new Main(record);
    newRecord.addDate = new Date(record.addDate);
    newRecord.vehicleAddDate = new Date(record.vehicleAddDate);
    return await newRecord.save();
}

async function getMaintenanceByVehicle(vehicleAddDate) {
    return await Main.find({vehicleAddDate: vehicleAddDate});
}

async function deleteRecord(addDate) {
    return await Main.deleteOne({addDate: addDate});
}

async function editRecord(date, record) {
    return await Main.updateOne( {addDate: date},
        {$set: {"maintenanceName": record.maintenanceName,
                "intervalMile": record.intervalMile,
                "cost": record.cost,
                "mileage": record.mileage,
                "date": new Date(record.date) } } );
}


