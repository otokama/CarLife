const commentService = require('../services/comment.service')

module.exports = {
    createComment,
    getConversation,
    getComment
};

function createComment(req, res, next) {
    commentService.createComment(req.body)
        .then(() => res.json('posted new comment.'))
        .catch(err => next(err));
}

function getConversation(req, res, next) {
    commentService.getConversation(req.body)
        .then(comments => res.json(comments))
        .catch(err => next(err));
}

function getComment(req, res, next) {
    commentService.getCommentByDate(new Date(req.params.date))
        .then(comment => res.json(comment))
        .catch(err => next(err));
}
