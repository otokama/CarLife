const db = require('../_helpers/database');
const Rankcard = db.Rankcard;

module.exports = {
    getAllRankcards,
    updateRankcard,
    getRankByUser
};

async function addRankCard(rankcard, username){
    if (await Rankcard.findOne({username: username})){
        throw 'Rankcard created by ' + username + ' already exists.';
    }

    const newrank = new Rankcard(rankcard);
    return await newrank.save();

}

async function getRankByUser(username){
    return await Rankcard.find({username: username});
}

async function getAllRankcards(){
    return await Rankcard.find();
}

async function updateRankcard(rankcard, username) {
    if (await Rankcard.findOne({username: username})) {
        //update rank record:
        console.log('updating rankcard');
        return await Rankcard.updateOne({username: username},
            {$set: {avgcal: rankcard.avgcal, avgminutes: rankcard.avgminutes, caloriegoal: rankcard.caloriegoal,
                minutegoal: rankcard.minutegoal}});
    }
    else {
        //add new rank record:
        console.log('adding rank record');
        await addRankCard(rankcard, username);
    }
}


