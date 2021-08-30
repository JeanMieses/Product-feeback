const Feedback = require('./../models/feedback');

const isAuthor = async(req, res, next) => {
  const {id} = req.params;
  const feedback = await Feedback.findOne({_id: id});
    if(!feedback.author.equals(req.user._id)) {
      return res.send('you have not permision');
    }
  next();
}


module.exports = isAuthor;
