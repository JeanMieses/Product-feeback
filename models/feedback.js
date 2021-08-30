const mongoose = require('mongoose');
const {Schema} = mongoose;

const feedbackSchema = new Schema ({
  title: {
    type: String,
    required: true,
    lowercase: true
  },

  category: {
    type: String,
    required: true,
    emum: ['enhancement', 'feature', 'bug', 'UI', 'UX']
  },

  upvotes: {
    type: Number
  },

  description: {
    type: String,
    required: true
  },

  author: {
      type: Schema.Types.ObjectId, ref: 'User'
  },

  comments: [{
    type: Schema.Types.ObjectId, ref: 'Comment'
  }]
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
