// routes/pages.js
const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

// protected home page (must be logged in)
router.get('/home', ensureAuthenticated, (req, res) => {
  res.render('home', { user: req.user });
});

// about page - public
router.get('/about', (req, res) => {
  res.render('about');
});

// example admin-only page (optional)
// router.get('/admin', ensureAdmin, (req, res) => {
//   res.send('Admin area');
// });

module.exports = router;