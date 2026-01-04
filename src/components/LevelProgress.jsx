import { FaRocket, FaStar, FaCrown, FaGem, FaBolt } from "react-icons/fa";

// Level system based on total contributions and streak
const LEVELS = [
  { name: "Newbie", minXP: 0, icon: "🌱", color: "from-gray-400 to-gray-600" },
  {
    name: "Beginner",
    minXP: 100,
    icon: "🌿",
    color: "from-green-400 to-green-600",
  },
  { name: "Coder", minXP: 500, icon: "💻", color: "from-blue-400 to-blue-600" },
  {
    name: "Developer",
    minXP: 1000,
    icon: "⚡",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Engineer",
    minXP: 2500,
    icon: "🔧",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Architect",
    minXP: 5000,
    icon: "🏗️",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Master",
    minXP: 10000,
    icon: "👑",
    color: "from-pink-400 to-pink-600",
  },
  {
    name: "Legend",
    minXP: 25000,
    icon: "🌟",
    color: "from-yellow-300 to-amber-500",
  },
  {
    name: "Immortal",
    minXP: 50000,
    icon: "💎",
    color: "from-cyan-300 to-teal-500",
  },
  {
    name: "Transcendent",
    minXP: 100000,
    icon: "🚀",
    color: "from-rose-400 to-red-600",
  },
];

// Calculate XP from contributions and streak
const calculateXP = (totalContributions, currentStreak, longestStreak) => {
  // Base XP from contributions (1 XP per contribution)
  let xp = totalContributions;

  // Bonus XP for current streak (2 XP per day)
  xp += currentStreak * 2;

  // Bonus XP for longest streak (3 XP per day)
  xp += longestStreak * 3;

  return xp;
};

// Get current level from XP
const getLevelFromXP = (xp) => {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) {
      level = l;
    } else {
      break;
    }
  }
  return level;
};

// Get progress to next level
const getProgressToNextLevel = (xp) => {
  const currentLevel = getLevelFromXP(xp);
  const currentIndex = LEVELS.findIndex((l) => l.name === currentLevel.name);
  const nextLevel = LEVELS[currentIndex + 1];

  if (!nextLevel) {
    return { progress: 100, xpNeeded: 0, nextLevel: null };
  }

  const xpIntoLevel = xp - currentLevel.minXP;
  const xpForLevel = nextLevel.minXP - currentLevel.minXP;
  const progress = (xpIntoLevel / xpForLevel) * 100;
  const xpNeeded = nextLevel.minXP - xp;

  return { progress, xpNeeded, nextLevel };
};

const LevelProgress = ({
  totalContributions = 0,
  currentStreak = 0,
  longestStreak = 0,
}) => {
  const xp = calculateXP(totalContributions, currentStreak, longestStreak);
  const level = getLevelFromXP(xp);
  const { progress, xpNeeded, nextLevel } = getProgressToNextLevel(xp);
  const levelIndex = LEVELS.findIndex((l) => l.name === level.name);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaRocket className="text-purple-400" />
          Level & XP
        </h3>
        <span className="text-sm text-gray-400">{xp.toLocaleString()} XP</span>
      </div>

      {/* Current level display */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`
            w-16 h-16 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${level.color}
            shadow-lg transform hover:scale-105 transition-transform
          `}
        >
          <span className="text-3xl">{level.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">{level.name}</span>
            <span className="text-sm text-gray-400">Lvl {levelIndex + 1}</span>
          </div>
          {nextLevel && (
            <p className="text-sm text-gray-400">
              {xpNeeded.toLocaleString()} XP to {nextLevel.name}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {nextLevel && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{level.name}</span>
            <span>{nextLevel.name}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${level.color} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-white/20 animate-pulse" />
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}

      {/* XP breakdown */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <FaStar className="mx-auto text-blue-400 mb-1" />
          <p className="text-white font-medium text-sm">
            {totalContributions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Contributions</p>
          <p className="text-xs text-blue-400">+{totalContributions} XP</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <FaBolt className="mx-auto text-orange-400 mb-1" />
          <p className="text-white font-medium text-sm">{currentStreak}</p>
          <p className="text-xs text-gray-400">Current</p>
          <p className="text-xs text-orange-400">+{currentStreak * 2} XP</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <FaCrown className="mx-auto text-yellow-400 mb-1" />
          <p className="text-white font-medium text-sm">{longestStreak}</p>
          <p className="text-xs text-gray-400">Best</p>
          <p className="text-xs text-yellow-400">+{longestStreak * 3} XP</p>
        </div>
      </div>

      {/* Level roadmap preview */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs text-gray-400 mb-3">Level Roadmap</p>
        <div className="flex justify-between">
          {LEVELS.slice(0, 6).map((l, i) => {
            const isCurrentOrPast = i <= levelIndex;
            return (
              <div
                key={l.name}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${
                    isCurrentOrPast
                      ? `bg-gradient-to-br ${l.color}`
                      : "bg-slate-700 opacity-50"
                  }
                `}
                title={`${l.name}: ${l.minXP.toLocaleString()} XP`}
              >
                {l.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
