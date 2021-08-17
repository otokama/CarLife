const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//TODO: notice that User has evolved and now includes 'caloriegoal' and 'minutegoal'.
const schema = new Schema({
        username: { type: String, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        caloriegoal: { type: Number, required: true, default: 2000 },
        minutegoal: { type: Number, required: true, default: 65 },
        avgcal: { type: Number, required: true },
        avgminutes: { type: Number, required: true },
        avatarColor: {type: String, required: true, default: '#499'}
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Rankcard', schema);
