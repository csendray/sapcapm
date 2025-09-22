// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const logger = require('./middlewares/logger');
const authEvents = require('./events/authEvents');

// Initialize passport config (strategy/serialize/deserialize)
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 4000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// Session - must come BEFORE passport.session()
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard-cat-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Log auth events to console
authEvents.on('login:success', (data) => {
  console.log('[EVENT] login:success', data);
});
authEvents.on('login:failed', (data) => {
  console.log('[EVENT] login:failed', data);
});

// Routers
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/pages'));

// 404
app.use((req, res) => res.status(404).send('Not Found'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});