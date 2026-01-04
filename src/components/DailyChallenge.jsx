import { useState, useEffect } from "react";
import {
  FaLightbulb,
  FaRedo,
  FaExternalLinkAlt,
  FaCheck,
} from "react-icons/fa";

// Diverse coding challenges/prompts to inspire daily commits
const CHALLENGES = [
  {
    category: "Feature",
    challenges: [
      "Add a dark mode toggle to one of your projects",
      "Implement a search/filter feature",
      "Add keyboard shortcuts to improve UX",
      "Create a loading skeleton for better perceived performance",
      "Add form validation with helpful error messages",
      "Implement infinite scroll or pagination",
      "Add a 'copy to clipboard' feature",
      "Create a responsive navigation menu",
    ],
  },
  {
    category: "Refactor",
    challenges: [
      "Extract repeated code into a reusable function",
      "Convert a class component to functional with hooks",
      "Add TypeScript types to a JavaScript file",
      "Improve variable names for better readability",
      "Split a large component into smaller ones",
      "Replace nested callbacks with async/await",
      "Add error boundaries to React components",
      "Optimize a slow database query",
    ],
  },
  {
    category: "Documentation",
    challenges: [
      "Write a comprehensive README for a project",
      "Add JSDoc comments to your functions",
      "Create a CONTRIBUTING.md file",
      "Document your API endpoints",
      "Add inline comments explaining complex logic",
      "Create a project changelog",
      "Write a setup guide for new contributors",
      "Add usage examples to your docs",
    ],
  },
  {
    category: "Testing",
    challenges: [
      "Write a unit test for an existing function",
      "Add integration tests for an API endpoint",
      "Improve test coverage by 5%",
      "Add snapshot tests for UI components",
      "Write E2E tests for a critical user flow",
      "Test edge cases you might have missed",
      "Add performance benchmarks",
      "Set up continuous integration",
    ],
  },
  {
    category: "Open Source",
    challenges: [
      "Fix a 'good first issue' on GitHub",
      "Star and explore a trending repository",
      "Submit a documentation fix to a project you use",
      "Create an issue for a bug you found",
      "Review a pull request on an open source project",
      "Fork a project and add a new feature",
      "Translate docs to another language",
      "Help answer questions on Stack Overflow",
    ],
  },
  {
    category: "Learning",
    challenges: [
      "Complete a coding challenge on LeetCode",
      "Build a mini-project with a new framework",
      "Read and summarize a technical blog post",
      "Watch a conference talk and take notes",
      "Implement a data structure from scratch",
      "Learn and use a new VS Code extension",
      "Explore a new npm package",
      "Practice a design pattern you haven't used",
    ],
  },
];

// Get a deterministic daily challenge based on date
const getDailyChallenge = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );

  // Use day of year to pick category and challenge
  const categoryIndex = dayOfYear % CHALLENGES.length;
  const category = CHALLENGES[categoryIndex];
  const challengeIndex =
    Math.floor(dayOfYear / CHALLENGES.length) % category.challenges.length;

  return {
    category: category.category,
    challenge: category.challenges[challengeIndex],
    dayOfYear,
  };
};

// Get a random challenge (for refresh)
const getRandomChallenge = () => {
  const categoryIndex = Math.floor(Math.random() * CHALLENGES.length);
  const category = CHALLENGES[categoryIndex];
  const challengeIndex = Math.floor(Math.random() * category.challenges.length);

  return {
    category: category.category,
    challenge: category.challenges[challengeIndex],
  };
};

const CATEGORY_COLORS = {
  Feature: "from-blue-500 to-blue-600",
  Refactor: "from-purple-500 to-purple-600",
  Documentation: "from-green-500 to-green-600",
  Testing: "from-yellow-500 to-yellow-600",
  "Open Source": "from-pink-500 to-pink-600",
  Learning: "from-cyan-500 to-cyan-600",
};

const CATEGORY_ICONS = {
  Feature: "✨",
  Refactor: "🔧",
  Documentation: "📝",
  Testing: "🧪",
  "Open Source": "🌍",
  Learning: "📚",
};

const DailyChallenge = ({ onComplete }) => {
  const [challenge, setChallenge] = useState(getDailyChallenge());
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  // Check localStorage for completion status
  useEffect(() => {
    const today = new Date().toDateString();
    const completedDate = localStorage.getItem("challengeCompletedDate");
    if (completedDate === today) {
      setIsCompleted(true);
    }
  }, []);

  const handleRefresh = () => {
    setChallenge(getRandomChallenge());
    setIsRefreshed(true);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    localStorage.setItem("challengeCompletedDate", new Date().toDateString());
    if (onComplete) {
      onComplete();
    }
  };

  const colorClass =
    CATEGORY_COLORS[challenge.category] || "from-gray-500 to-gray-600";
  const icon = CATEGORY_ICONS[challenge.category] || "💡";

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaLightbulb className="text-yellow-400" />
          Daily Challenge
        </h3>
        <div className="flex items-center gap-2">
          {!isRefreshed && (
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </span>
          )}
          <button
            onClick={handleRefresh}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Get a different challenge"
          >
            <FaRedo className="text-sm" />
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}
        >
          <span>{icon}</span>
          {challenge.category}
        </span>
      </div>

      {/* Challenge text */}
      <div
        className={`p-4 rounded-xl border transition-all duration-300 ${
          isCompleted
            ? "bg-green-900/20 border-green-700"
            : "bg-slate-800/50 border-slate-700"
        }`}
      >
        <p
          className={`text-sm ${
            isCompleted ? "text-green-300 line-through" : "text-gray-300"
          }`}
        >
          {challenge.challenge}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-4">
        {!isCompleted ? (
          <>
            <button
              onClick={handleComplete}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
            >
              <FaCheck /> Mark Complete
            </button>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Start <FaExternalLinkAlt className="text-xs" />
            </a>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 bg-green-900/30 text-green-400 py-2 px-4 rounded-lg text-sm font-medium">
            <FaCheck /> Challenge Completed!
          </div>
        )}
      </div>

      {/* Motivation text */}
      <p className="text-center text-xs text-gray-500 mt-4">
        {isCompleted
          ? "Great job! Come back tomorrow for a new challenge."
          : "Complete a challenge to earn bonus motivation points!"}
      </p>
    </div>
  );
};

export default DailyChallenge;
