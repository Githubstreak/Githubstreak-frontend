import { useState } from "react";
import {
  FaFire,
  FaBolt,
  FaStar,
  FaCrown,
  FaGem,
  FaMedal,
  FaRocket,
  FaTrophy,
  FaLock,
} from "react-icons/fa";

// Achievement definitions with unlock criteria
const ACHIEVEMENTS = [
  {
    id: "first-flame",
    name: "First Flame",
    description: "Start your coding journey with your first streak day",
    icon: FaFire,
    requirement: 1,
    type: "streak",
    color: "from-orange-400 to-orange-600",
    rarity: "common",
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day streak - you're building a habit!",
    icon: FaBolt,
    requirement: 7,
    type: "streak",
    color: "from-blue-400 to-blue-600",
    rarity: "common",
  },
  {
    id: "fortnight-fighter",
    name: "Fortnight Fighter",
    description: "Two weeks of consistent coding - impressive dedication!",
    icon: FaStar,
    requirement: 14,
    type: "streak",
    color: "from-purple-400 to-purple-600",
    rarity: "uncommon",
  },
  {
    id: "month-master",
    name: "Month Master",
    description: "30 days straight! You're officially a coding machine",
    icon: FaMedal,
    requirement: 30,
    type: "streak",
    color: "from-green-400 to-emerald-600",
    rarity: "rare",
  },
  {
    id: "quarter-queen",
    name: "Quarter Champion",
    description: "90 days of pure dedication - you're in the top tier",
    icon: FaCrown,
    requirement: 90,
    type: "streak",
    color: "from-yellow-400 to-amber-600",
    rarity: "epic",
  },
  {
    id: "century-legend",
    name: "Century Legend",
    description: "100 days! You're a living legend in the coding community",
    icon: FaGem,
    requirement: 100,
    type: "streak",
    color: "from-cyan-400 to-teal-600",
    rarity: "legendary",
  },
  {
    id: "year-immortal",
    name: "Year Immortal",
    description: "365 days of coding - you've transcended mortal limits",
    icon: FaRocket,
    requirement: 365,
    type: "streak",
    color: "from-pink-400 to-rose-600",
    rarity: "mythic",
  },
  // Contribution-based achievements
  {
    id: "century-commits",
    name: "Century Commits",
    description: "Reach 100 total contributions",
    icon: FaTrophy,
    requirement: 100,
    type: "contributions",
    color: "from-indigo-400 to-indigo-600",
    rarity: "common",
  },
  {
    id: "thousand-club",
    name: "Thousand Club",
    description: "Join the elite 1,000 contributions club",
    icon: FaGem,
    requirement: 1000,
    type: "contributions",
    color: "from-violet-400 to-purple-600",
    rarity: "epic",
  },
];

const RARITY_STYLES = {
  common: {
    border: "border-gray-500",
    glow: "",
    label: "Common",
    labelColor: "text-gray-400",
  },
  uncommon: {
    border: "border-green-500",
    glow: "shadow-green-500/20",
    label: "Uncommon",
    labelColor: "text-green-400",
  },
  rare: {
    border: "border-blue-500",
    glow: "shadow-blue-500/30",
    label: "Rare",
    labelColor: "text-blue-400",
  },
  epic: {
    border: "border-purple-500",
    glow: "shadow-purple-500/40",
    label: "Epic",
    labelColor: "text-purple-400",
  },
  legendary: {
    border: "border-yellow-500",
    glow: "shadow-yellow-500/50",
    label: "Legendary",
    labelColor: "text-yellow-400",
  },
  mythic: {
    border: "border-pink-500",
    glow: "shadow-pink-500/50 animate-pulse",
    label: "Mythic",
    labelColor: "text-pink-400",
  },
};

const AchievementBadge = ({ achievement, isUnlocked, progress }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = achievement.icon;
  const rarityStyle = RARITY_STYLES[achievement.rarity];

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`
          relative w-16 h-16 rounded-xl flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${
            isUnlocked
              ? `bg-gradient-to-br ${achievement.color} border-2 ${rarityStyle.border} shadow-lg ${rarityStyle.glow}`
              : "bg-slate-800/50 border border-slate-700 grayscale"
          }
          ${isUnlocked ? "hover:scale-110" : "hover:scale-105"}
        `}
      >
        {isUnlocked ? (
          <Icon className="text-2xl text-white drop-shadow-lg" />
        ) : (
          <FaLock className="text-xl text-gray-500" />
        )}

        {/* Progress ring for locked achievements */}
        {!isUnlocked && progress > 0 && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${progress * 1.76} 176`}
              className="text-green-500"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none">
          <div className="bg-slate-900 border border-slate-600 rounded-xl p-3 shadow-xl w-48">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
              >
                <Icon className="text-sm text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">
                  {achievement.name}
                </p>
                <p className={`text-xs ${rarityStyle.labelColor}`}>
                  {rarityStyle.label}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-2">
              {achievement.description}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {achievement.type === "streak" ? "Streak" : "Contributions"}
              </span>
              <span
                className={isUnlocked ? "text-green-400" : "text-yellow-400"}
              >
                {isUnlocked
                  ? "✓ Unlocked"
                  : `${Math.round(progress)}% complete`}
              </span>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};

const AchievementBadges = ({ currentStreak = 0, totalContributions = 0 }) => {
  const [showAll, setShowAll] = useState(false);

  // Calculate unlocked achievements and progress
  const achievementsWithProgress = ACHIEVEMENTS.map((achievement) => {
    const currentValue =
      achievement.type === "streak" ? currentStreak : totalContributions;
    const isUnlocked = currentValue >= achievement.requirement;
    const progress = Math.min(
      (currentValue / achievement.requirement) * 100,
      100
    );
    return { ...achievement, isUnlocked, progress };
  });

  const unlockedCount = achievementsWithProgress.filter(
    (a) => a.isUnlocked
  ).length;
  const displayedAchievements = showAll
    ? achievementsWithProgress
    : achievementsWithProgress.slice(0, 6);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Achievements
        </h3>
        <span className="text-sm text-gray-400">
          {unlockedCount}/{ACHIEVEMENTS.length} unlocked
        </span>
      </div>

      {/* Achievement progress bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%`,
          }}
        />
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
        {displayedAchievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            isUnlocked={achievement.isUnlocked}
            progress={achievement.progress}
          />
        ))}
      </div>

      {/* Show more/less button */}
      {ACHIEVEMENTS.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {showAll
            ? "Show less"
            : `Show ${ACHIEVEMENTS.length - 6} more achievements`}
        </button>
      )}

      {/* Next achievement hint */}
      {unlockedCount < ACHIEVEMENTS.length && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-xs text-gray-400">
            <span className="text-green-400 font-medium">Next unlock:</span>{" "}
            {achievementsWithProgress.find(
              (a) => !a.isUnlocked && a.progress > 0
            )?.name ||
              achievementsWithProgress.find((a) => !a.isUnlocked)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;
