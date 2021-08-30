const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
  comment: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
