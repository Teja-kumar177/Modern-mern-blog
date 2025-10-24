const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Get comments for a post (public)
router.get('/post/:postId', commentController.getCommentsByPost);

// Protected routes
router.post('/post/:postId', auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
