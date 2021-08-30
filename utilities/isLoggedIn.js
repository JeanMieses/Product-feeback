// middleaware that redirect users to login if they havent logged in
const isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/feedbacks/login');
  }
  next();
}

module.exports = isLoggedIn;
