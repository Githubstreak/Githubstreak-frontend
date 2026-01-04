// Rotating motivational quotes for developers
const QUOTES = [
  {
    text: "Every expert was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    text: "The function of good software is to make the complex appear simple.",
    author: "Grady Booch",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay",
  },
  {
    text: "Java is to JavaScript what car is to carpet.",
    author: "Chris Heilmann",
  },
  {
    text: "Testing leads to failure, and failure leads to understanding.",
    author: "Burt Rutan",
  },
  {
    text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    author: "Dan Salomon",
  },
  {
    text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    author: "Edsger Dijkstra",
  },
  {
    text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
    author: "Bill Gates",
  },
  {
    text: "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
    author: "Muhammad Waseem",
  },
  {
    text: "A good programmer is someone who always looks both ways before crossing a one-way street.",
    author: "Doug Linder",
  },
  // Streak-specific motivation
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "Robin Sharma",
  },
  {
    text: "Consistency is what transforms average into excellence.",
    author: "Anonymous",
  },
  {
    text: "The secret of your success is found in your daily routine.",
    author: "John C. Maxwell",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "Don't break the chain!",
    author: "Jerry Seinfeld",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    text: "We are what we repeatedly do. Excellence is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    text: "The only bad workout is the one that didn't happen. Same goes for code.",
    author: "Anonymous",
  },
];

// Get today's quote (deterministic based on date)
export const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % QUOTES.length;
  return QUOTES[index];
};

// Get a random quote
export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
};

// Get a quote based on streak length
export const getStreakQuote = (streakLength) => {
  const streakQuotes = QUOTES.filter(
    (q) =>
      q.text.toLowerCase().includes("daily") ||
      q.text.toLowerCase().includes("habit") ||
      q.text.toLowerCase().includes("consistent") ||
      q.text.toLowerCase().includes("routine")
  );

  if (streakLength >= 30) {
    return {
      text: "30 days of coding makes you unstoppable. Keep building!",
      author: "GitHubStreak",
    };
  } else if (streakLength >= 7) {
    return {
      text: "A week of consistency - you're building real momentum!",
      author: "GitHubStreak",
    };
  } else if (streakLength === 0) {
    return {
      text: "Every streak starts with a single commit. Start yours today!",
      author: "GitHubStreak",
    };
  }

  return streakQuotes[streakLength % streakQuotes.length] || getDailyQuote();
};

export default QUOTES;
