import { FaShieldAlt, FaLock, FaSnowflake } from "react-icons/fa";

// Streak freeze tokens - earned by hitting milestones
// Users can "spend" a freeze to protect their streak for one day

const FREEZE_REWARDS = [
  { milestone: 7, freezes: 1 },
  { milestone: 30, freezes: 2 },
  { milestone: 100, freezes: 3 },
];

const calculateEarnedFreezes = (longestStreak) => {
  let total = 0;
  FREEZE_REWARDS.forEach(({ milestone, freezes }) => {
    if (longestStreak >= milestone) {
      total += freezes;
    }
  });
  return total;
};

const StreakFreezeTokens = ({
  longestStreak = 0,
  usedFreezes = 0,
  onUseFreeze,
  streakStatus,
}) => {
  const earnedFreezes = calculateEarnedFreezes(longestStreak);
  const availableFreezes = Math.max(0, earnedFreezes - usedFreezes);
  const canUseFreeze = streakStatus === "broken" && availableFreezes > 0;

  // Next milestone to earn more freezes
  const nextMilestone = FREEZE_REWARDS.find(
    ({ milestone }) => longestStreak < milestone
  );

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaShieldAlt className="text-cyan-400" />
          Streak Freeze
        </h3>
        <span className="text-sm text-gray-400">
          {availableFreezes} available
        </span>
      </div>

      {/* Token display */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {[...Array(Math.max(earnedFreezes, 3))].map((_, i) => {
          const isEarned = i < earnedFreezes;
          const isUsed = i < usedFreezes;
          const isAvailable = isEarned && !isUsed;

          return (
            <div
              key={i}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${
                  isAvailable
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                    : isUsed
                    ? "bg-slate-700 opacity-50"
                    : "bg-slate-800 border border-dashed border-slate-600"
                }
              `}
              title={
                isAvailable
                  ? "Freeze available"
                  : isUsed
                  ? "Already used"
                  : "Locked - hit next milestone"
              }
            >
              {isAvailable ? (
                <FaSnowflake className="text-xl text-white animate-pulse" />
              ) : isUsed ? (
                <FaSnowflake className="text-xl text-gray-500" />
              ) : (
                <FaLock className="text-sm text-gray-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Streak broken - can use freeze */}
      {canUseFreeze && (
        <button
          onClick={onUseFreeze}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <FaSnowflake className="animate-spin" />
          Use Freeze to Save Streak!
        </button>
      )}

      {/* Info section */}
      <div className="mt-4 space-y-2">
        {/* How to earn */}
        <div className="text-xs text-gray-400">
          <p className="font-medium text-gray-300 mb-1">How to earn freezes:</p>
          <ul className="space-y-1">
            {FREEZE_REWARDS.map(({ milestone, freezes }) => (
              <li
                key={milestone}
                className={`flex items-center gap-2 ${
                  longestStreak >= milestone
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <span>{longestStreak >= milestone ? "✓" : "○"}</span>
                <span>
                  {milestone}-day streak = +{freezes} freeze
                  {freezes > 1 ? "s" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next milestone hint */}
        {nextMilestone && (
          <p className="text-xs text-cyan-400 mt-2">
            🎯 Hit {nextMilestone.milestone} days to earn +
            {nextMilestone.freezes} more!
          </p>
        )}
      </div>

      {/* Explanation */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Use a freeze when you miss a day to protect your streak.
        <br />
        Freezes are earned by hitting streak milestones.
      </p>
    </div>
  );
};

export default StreakFreezeTokens;
