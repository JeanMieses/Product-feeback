if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const feedbacksRouter = require('./routers/feedback.js');
const commentRouter = require('./routers/comment.js');
const upvotesRouter = require('./routers/upvotes.js');
const userRouter = require('./routers/user.js');
const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db_url = process.env.DB_URL;

// mongodb+srv://Jean-product-feedback:oI8QRxpDXdM8siWm@cluster0.bdjxc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dburl= process.env.DB_URL || 'mongodb://localhost:27017/product_feedback';

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('connected to mongoose');
})
.catch((err) => {
  console.log('error with mongoose');
  console.log(err);
})

app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);

//midleawares
app.use(methodOverride('_method')); //override some http methods
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(session({
  store: MongoStore.create({mongoUrl: dburl, touchAfer: 24*60*60}),
  secret: process.env.SECRET || '2021',
  resave: false,
  saveUninitialized: true}));

//passport authentication
app.use(passport.initialize());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routers handler
app.use('/feedbacks', userRouter);
app.use('/feedbacks', feedbacksRouter);
app.use('/feedbacks', commentRouter);
app.use('/feedbacks', upvotesRouter);
app.use('*', (req, res) => {res.redirect('/feedbacks');});

app.listen(3000, () => {
  console.log('Starting server');
})
