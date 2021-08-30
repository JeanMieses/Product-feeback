const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('./../models/feedback');

router.patch('/:feedback_id/vote', async(req, res) => {
  const {feedback_id} = req.params;
  let {votes} = req.body;
  const feedback = await Feedback.findByIdAndUpdate({_id: feedback_id}, {upvotes: votes}, {useFindAndModify: false})
})

module.exports = router;
