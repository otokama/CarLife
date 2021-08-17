const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
//mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    PArecord: require('../models/parecord.model'),
    Rankcard: require('../models/rankcard.model'),
    VehicleRecord: require('../models/vehicle.model'),
    Mods: require('../models/mods.model'),
    MaintenanceRecord: require('../models/maintenance.model'),
    Comments: require('../models/comment.model')
};
