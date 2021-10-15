const config = require('../../CarLife Angular/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const {ObjectID} = require("mongoose");
const User = db.User;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    getAllTuners,
    getAllCustomer,
    addUser,
    setGoals,
    getGoals
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}

async function getAllTuners() {
    return await  User.find({role: 'Tuner'});
}

async function getAllCustomer() {
    return await  User.find({role: 'User'});
}

async function getByUsername(username) {
    return await User.find({username: username}).select('-hash');
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);
    let redIndex = Math.floor(Math.random() * (180 - 100) + 100 ).toString(16);
    let greenIndex = Math.floor(Math.random() * (180 - 100) + 100 ).toString(16);
    let blueIndex = Math.floor(Math.random() * (180 - 100) + 100 ).toString(16);
    let colorCode = "#" + redIndex + greenIndex + blueIndex;
    user.avatarColor = colorCode;
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}


// TODO: complete this function. It takes in calories and minute goal values in 'values' and saves it for a given userid (_id). Hint: use 'updateOne' from mongoose.
async function setGoals({calGoal, minGoal}, username){

    await User.updateOne({"_id":username}, {$set: {"caloriegoal":calGoal, "minutegoal":minGoal}});
    return await User.findOne({"_id": username});

}


// TODO: complete this function. It should return calorie and minute goals for a given user.
async function getGoals(username){
    return await User.findOne({ username: username },{_id:0, caloriegoal:true,minutegoal:true});
}

