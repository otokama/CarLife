const db = require('../_helpers/database');
const Comments = db.Comments;

module.exports = {
    getConversation,
    getCommentByDate,
    createComment
};

async function getConversation(persons) {
    return Comments.find(
        { $or:
            [
                {postedTo: persons.person1, authorUsername: persons.person2},
                {postedTo: persons.person2, authorUsername: persons.person1}
            ]
        }

    );
}

async function getCommentByDate(date) {
    return Comments.findOne({addDate: date});
}

async function createComment(comment) {
    const newRecord = new Comments(comment);
    newRecord.addDate = new Date(comment.addDate);
    return await newRecord.save();

}
