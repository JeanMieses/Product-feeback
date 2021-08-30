const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./../models/user');

router.get('/register', (req, res) => {
  res.render('../views/register');
})

router.post('/register', async(req, res) => {
  const {username, password} = req.body;
  const user = new User({username, password});
  const registeredUser = await User.register(user, password);
  res.redirect('/feedbacks/login');
})

router.get('/login', (req, res) => {
  res.render('../views/login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/feedbacks/login'}),
  (req, res) => {
    res.redirect('/feedbacks');
  })

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/feedbacks');
  });

module.exports = router;
