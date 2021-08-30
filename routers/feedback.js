const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('./../models/feedback');
const isLoggedIn = require('./../utilities/isLoggedIn');
const isAuthor = require('./../utilities/isAuthor');

mongoose.connect('mongodb://localhost:27017/product_feedback', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('connected to mongoose');
})
.catch((err) => {
  console.log('error with mongoose');
  console.log(err);
})

// GET /feedbacks --list all the elements
router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find({});
  res.render('../views/index.ejs', {feedbacks});
})

// POST /feedbacks --create a feedback
router.get('/new', isLoggedIn, (req, res) => {
  res.render('../views/new.ejs');
})

router.post('/', isLoggedIn, async(req, res) => {
  const {title, category, description} = req.body;
  const feedback = new Feedback({title, category, description});
  feedback.author = req.user._id;
  feedback.upvotes = 0;
  await feedback.save();
  res.redirect(`/feedbacks/${feedback._id}`);
})

// GET /feedbacks/:id --get specific feedback
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const feedback = await Feedback.findOne({_id: id}).
  populate({path: 'comments', populate: {
    path: 'author'
  }}).
  populate('author');
  res.render('../views/show.ejs', {feedback});
})

// path /feedbacks/:id --update feedback
router.get('/:id/update', isLoggedIn, isAuthor, async(req, res) => {
  const {id} = req.params;
  const feedback = await Feedback.findOne({_id: id});
  res.render('../views/update.ejs', {feedback});
})

router.patch('/:id', isLoggedIn, isAuthor, async(req, res) => {
  const {id} = req.params;
  const {title, category, description} = req.body;
  const feedback = await Feedback.findByIdAndUpdate({_id: id}, {title, category, description}, {useFindAndModify: false})
  res.redirect(`/feedbacks/${id}`);
})

// DELETE /feedbacks/:id --delete feedback
router.delete('/:id', isLoggedIn, isAuthor, async(req, res) => {
  const {id} = req.params;
  await Feedback.findByIdAndDelete({_id: id})
  res.redirect('/feedbacks');
})

module.exports = router;
