import {
  FaFire,
  FaTrophy,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaGithub,
  FaInfoCircle,
} from "react-icons/fa";
import { SignInButton } from "@clerk/clerk-react";
import MilestoneProgress from "./MilestoneProgress";
import StreakResetCountdown from "./StreakResetCountdown";
import WeeklyCalendar from "./WeeklyCalendar";
import ShareButton from "./ShareButton";

const PersonalStreakCard = ({
  userStats,
  isLoading,
  error,
  streakStatus,
  isSignedIn,
  refetch,
}) => {
  // Not signed in - show sign in prompt
  if (!isSignedIn) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 card-hover">
        <div className="text-center">
          <FaFire className="mx-auto text-4xl text-gray-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Track Your Streak
          </h3>
          <p className="text-gray-400 mb-4 text-sm">
            Sign in to see your coding streak and join the leaderboard
          </p>
          <SignInButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition-colors" />
        </div>
      </div>
    );
  }

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="skeleton h-6 w-24 rounded"></div>
          <div className="skeleton h-6 w-32 rounded-full"></div>
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="skeleton h-16 w-32 rounded mb-2"></div>
          <div className="skeleton h-4 w-20 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton h-24 rounded-xl"></div>
          <div className="skeleton h-24 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-800">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto text-3xl text-red-500 mb-3" />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No stats yet
  if (!userStats) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 card-hover">
        <div className="text-center">
          <FaFire className="mx-auto text-4xl text-gray-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Start Your Streak
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Make your first commit to start tracking your streak!
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <FaGithub /> Go to GitHub
          </a>
        </div>
      </div>
    );
  }

  const currentStreak = userStats.currentStreak?.count ?? 0;
  const longestStreak = userStats.longestStreak?.count ?? currentStreak;
  const totalContributions = userStats.contributions ?? 0;
  const contributionDays = userStats.contributionDays ?? [];

  // Streak status styling
  const getStatusConfig = () => {
    switch (streakStatus) {
      case "today":
        return {
          bg: "from-green-900/50 to-green-950/50",
          border: "border-green-600",
          badge: "bg-green-500",
          badgeText: "✓ Committed Today",
          fireColor: "text-green-400",
          fireAnim: "fire-active",
          glow: "glow-green",
        };
      case "pending":
        return {
          bg: "from-yellow-900/30 to-slate-900",
          border: "border-yellow-600",
          badge: "bg-yellow-500",
          badgeText: "⚠️ Not Yet Today",
          fireColor: "text-yellow-400",
          fireAnim: "fire-flicker",
          glow: "glow-yellow",
        };
      case "broken":
        return {
          bg: "from-red-900/30 to-slate-900",
          border: "border-red-600",
          badge: "bg-red-500",
          badgeText: "💔 Streak Broken",
          fireColor: "text-red-400",
          fireAnim: "",
          glow: "glow-red",
        };
      default:
        return {
          bg: "from-slate-800 to-slate-900",
          border: "border-slate-700",
          badge: "bg-gray-500",
          badgeText: "",
          fireColor: "text-orange-400",
          fireAnim: "",
          glow: "",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div
      className={`bg-gradient-to-br ${statusConfig.bg} rounded-2xl p-6 border ${statusConfig.border} ${statusConfig.glow} transition-all duration-300 card-hover`}
    >
      {/* Header with status badge */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Your Streak</h3>
        {statusConfig.badgeText && (
          <span
            className={`${statusConfig.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}
          >
            {statusConfig.badgeText}
          </span>
        )}
      </div>

      {/* Main streak display */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <FaFire
              className={`text-5xl ${statusConfig.fireColor} ${statusConfig.fireAnim}`}
            />
            <span className="text-6xl font-bold text-white">
              {currentStreak}
            </span>
          </div>
          <p className="text-gray-400 mt-1">
            {currentStreak === 1 ? "day" : "days"} streak
          </p>
        </div>
      </div>

      {/* Streak reset countdown */}
      <StreakResetCountdown streakStatus={streakStatus} />

      {/* Weekly calendar */}
      <div className="mt-4">
        <WeeklyCalendar
          contributionDays={contributionDays}
          lastContributionDate={userStats.lastContributionDate}
          streakStatus={streakStatus}
          currentStreakCount={currentStreak}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-colors">
          <FaTrophy className="mx-auto text-xl text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-white">{longestStreak}</p>
          <p className="text-xs text-gray-400">Best Streak</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center group relative hover:bg-slate-700/50 transition-colors">
          <FaCalendarCheck className="mx-auto text-xl text-blue-400 mb-2" />
          <p className="text-2xl font-bold text-white">
            {totalContributions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            Contributions
            <FaInfoCircle className="text-gray-500 cursor-help" />
          </p>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
            Commits, PRs, and issues on public repositories
          </div>
        </div>
      </div>

      {/* Milestone progress */}
      {currentStreak > 0 && currentStreak < 100 && (
        <div className="mt-6">
          <MilestoneProgress currentStreak={currentStreak} />
        </div>
      )}

      {/* Share button */}
      <ShareButton
        currentStreak={currentStreak}
        username={userStats.username}
      />

      {/* GitHub link */}
      {userStats.username && (
        <a
          href={`https://github.com/${userStats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <FaGithub /> View GitHub Profile
        </a>
      )}
    </div>
  );
};

export default PersonalStreakCard;
