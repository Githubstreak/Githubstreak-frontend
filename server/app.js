const express = require('express');
const axios = require('axios');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

const app = express();
const port = 3000; // or any other available port

// Add CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure session middleware
app.use(session({
  secret: '203d1dae0f975543389d',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub OAuth strategy
passport.use(new GitHubStrategy({
  clientID: '203d1dae0f975543389d',
  clientSecret: 'e65c79b6f85728e79e176b2ff22067feb9d2fb67',
  callbackURL: 'http://localhost:3000//auth/github/callback'
},
(accessToken, refreshToken, profile, done) => {
  // Save the user profile in session or database
  return done(null, profile);
}
));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Authentication routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to homepage or profile page
    res.redirect('/');
  });

// API routes
app.get('/', async (req, res) => {
  try {
    // Ensure user is authenticated before accessing the API
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch user data from GitHub API
    const users = await fetchUsersFromGitHub();

    // Process user data to calculate streak and contributions
    const processedUsers = processUserData(users);

    // Rank users based on streak and contributions
    const rankedUsers = rankUsers(processedUsers);

    res.json(rankedUsers);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper functions
async function fetchUsersFromGitHub() {
    try {
        // Define the GitHub API endpoint and headers
        const apiUrl = 'https://api.github.com/users';
        const headers = {
          'Accept': 'application/vnd.github+json',
          'Authorization': 'Bearer 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'
        };
    
        // Fetch user data from the GitHub API
        const response = await axios.get(apiUrl, { headers });
        const users = response.data;
    
        // Fetch repository data for each user
        const usersWithRepos = await Promise.all(users.map(async (user) => {
          const reposResponse = await axios.get(`https://api.github.com/users/${user.login}/repos`, { headers });
          return { ...user, repos: reposResponse.data };
        }));
    
        return usersWithRepos;
      } catch (error) {
        console.error('Error fetching user data from GitHub:', error);
        throw error;
      }
    }

    function processUserData(users) {
        return users.map(user => {
          const { repos } = user;
      
          // Calculate the current streak for the user
          const commitDates = repos.flatMap(repo => repo.commits.map(commit => commit.commit.author.date));
          const sortedDates = commitDates.sort((a, b) => new Date(b) - new Date(a));
          let currentStreak = 1;
          let prevDate = sortedDates[0];
          for (let i = 1; i < sortedDates.length; i++) {
            const currDate = sortedDates[i];
            const diff = Math.floor((new Date(prevDate) - new Date(currDate)) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
              currentStreak++;
            } else {
              break;
            }
            prevDate = currDate;
          }
      
          // Calculate the total contributions for the user
          const totalContributions = commitDates.length;
      
          return { ...user, currentStreak, totalContributions };
        });
      }

      function rankUsers(users) {
        return users.sort((a, b) => {
          // Sort by streak in descending order
          if (b.currentStreak !== a.currentStreak) {
            return b.currentStreak - a.currentStreak;
          }
          // If streak is equal, sort by contributions in descending order
          return b.totalContributions - a.totalContributions;
        });
      }