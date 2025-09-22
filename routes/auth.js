// routes/auth.js
const express = require('express');
const passport = require('passport');
const authEvents = require('../events/authEvents');
const router = express.Router();

// show login page
router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

// handle login using custom callback so we can emit events
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      authEvents.emit('login:failed', { email: req.body.email });
      return res.redirect('/auth/login?error=1');
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
      authEvents.emit('login:success', { userId: user.id, email: user.email });
      return res.redirect('/home');
    });
  })(req, res, next);
});

// logout
router.post('/logout', (req, res, next) => {
  // req.logout is callback-based in newer passport versions
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/auth/login');
    });
  });
});

module.exports = router;