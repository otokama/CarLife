const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    maintenance: {type: String, required: false},
    vehicle: {type: String, required: false},
    comments: {type: String, required: true},
    role: {type: String, required: true},
    postedTo: {type: String, required: true},
    authorUsername: {type: String, required: true},
    avatarColor: {type: String, required: true, default: '#499'},
    initials: {type: String, required: true},
    addDate: {type: Date, unique: true, required: true}
});
schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Comments', schema);
