const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('./../models/feedback');
const Comment = require('./../models/comments');
const isLoggedIn = require('./../utilities/isLoggedIn');
const isCommentAuthor = require('./../utilities/isCommentAuthor')

router.post('/:feedback_id/comment', isLoggedIn, async(req, res) => {
  const {feedback_id} = req.params;
  const feedback = await Feedback.findOne({_id: feedback_id});
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  feedback.comments.push(comment);
  await comment.save();
  await feedback.save();
  res.redirect(`/feedbacks/${feedback_id}`);
})

router.delete('/:feedback_id/comment/:commentId', isCommentAuthor, async(req, res) => {
  const {feedback_id, commentId} = req.params;
  await Feedback.findByIdAndUpdate(feedback_id, {useFindAndModify: false}, {$pull: {comments: commentId}})
  await Comment.findByIdAndDelete(commentId, {useFindAndModify: false});
  res.redirect(`/feedbacks/${feedback_id}`);
})

module.exports = router;
