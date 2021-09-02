const mongoose = require('mongoose');
const {Schema} = mongoose;
const Comment = require('./comments')

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

// deleting comments when we delete feedbacks
feedbackSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
