const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

// Configure session and passport

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: '203d1dae0f975543389d',
      clientSecret: 'ae08f966de8cabc3863b27a9b75f424dfae523c7',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle the authenticated user's information
      // Store the user data in the session or a database
      return done(null, profile);
    }
  )
);

// Authentication routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, fetch user data from GitHub API
    // Redirect or render the user's information
    res.redirect('/');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});