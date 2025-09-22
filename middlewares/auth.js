// middlewares/auth.js

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // For pages, redirect to login
  return res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.role === 'admin') {
    return next();
  }
  // if API you might send 403; for pages we redirect or show forbidden
  return res.status(403).send('Forbidden - admins only');
}

module.exports = { ensureAuthenticated, ensureAdmin };
