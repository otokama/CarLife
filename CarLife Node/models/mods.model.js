const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {type: Number, required: true},
    cost: {type: Number, required: true},
    make: {type: String, required: true},
    partname: {type: String, required: true},
    mileage: {type: Number, required: true},
    date: {type: Date, required: true},
    vehicleAddDate: {type: Date, required: true},
    addDate: {type: Date, unique: true, required: true}
});
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Mods', schema);
