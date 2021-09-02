const Comment = require('./../models/comments');

module.exports = isCommentAuthor = async (req, res, next) => {
  const {feedback_id, commentId} = req.params;
  const comment = await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)) {
      // req.flash('error', 'you have not permission to do that!');
      return res.redirect(`/feedbacks/${feedback_id}`);
    }
    next();
}
