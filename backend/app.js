const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // or any other available port

// Add CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routes
app.get('/api/leaderboard', async (req, res) => {
  try {
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
  // GitHub API calls to fetch user data and repositories
  // You'll need to implement this function
}

function processUserData(users) {
  // Calculate streak and contributions for each user
  // You'll need to implement this function
}

function rankUsers(users) {
  // Rank users based on streak and contributions
  // You'll need to implement this function
}