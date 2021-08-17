var express = require('express');
var router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/addcomment', commentController.createComment);
router.post('/getcomments', commentController.getConversation);
router.get('/getcommentbydate/:date', commentController.getComment);

module.exports = router;
