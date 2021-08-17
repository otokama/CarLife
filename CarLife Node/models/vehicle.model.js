const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ownerUsername: {type: String, required: true},
    nickname: {type: String, required: true},
    make: {type: String, required: true},
    year: {type: Number, required: true},
    model: {type: String, required: true},
    mileage: {type: String, required: true},
    ownedSince: {type: Date, required: true},
    bodyType: {type: Number, required: true},
    addDate: {type: Date, unique: true, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('VehicleRecord', schema);
