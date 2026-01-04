import { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Displays a countdown timer until streak resets (midnight UTC).
 * Updates every minute to show remaining time.
 * Shows danger zone animation when less than 3 hours remain.
 */
const StreakResetCountdown = ({ streakStatus }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const midnightUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0
      )
    );

    const msLeft = midnightUTC.getTime() - now.getTime();
    const hours = Math.floor(msLeft / (1000 * 60 * 60));
    const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
    const totalMinutes = hours * 60 + minutes;

    return { hours, minutes, totalMinutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Danger zone: less than 3 hours left
  const isDangerZone = timeLeft.totalMinutes <= 180;
  // Critical: less than 1 hour
  const isCritical = timeLeft.totalMinutes <= 60;

  // Only show countdown for pending status (hasn't committed today)
  if (streakStatus === "today") {
    return (
      <p className="text-xs text-green-400 text-center mt-2">
        ✓ You're safe! Streak continues tomorrow.
      </p>
    );
  }

  if (streakStatus === "pending") {
    return (
      <div
        className={`
          text-center mt-3 p-3 rounded-lg transition-all duration-300
          ${
            isCritical
              ? "bg-red-900/50 border border-red-600 danger-zone"
              : isDangerZone
              ? "bg-orange-900/40 border border-orange-600"
              : "bg-yellow-900/30 border border-yellow-700/50"
          }
        `}
      >
        {isCritical && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaExclamationTriangle className="text-red-400 animate-pulse" />
            <span className="text-red-400 font-bold text-sm uppercase tracking-wide">
              Danger Zone!
            </span>
            <FaExclamationTriangle className="text-red-400 animate-pulse" />
          </div>
        )}

        <p
          className={`text-sm font-medium ${
            isCritical
              ? "text-red-300"
              : isDangerZone
              ? "text-orange-300"
              : "text-yellow-300"
          }`}
        >
          ⏰ Streak resets in{" "}
          <span className="font-bold text-lg">
            {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        </p>

        <p
          className={`text-xs mt-1 ${
            isCritical
              ? "text-red-400"
              : isDangerZone
              ? "text-orange-400"
              : "text-yellow-400/70"
          }`}
        >
          {isCritical
            ? "⚡ Quick! Make a commit NOW to save your streak!"
            : isDangerZone
            ? "🔥 Time is running out! Commit soon!"
            : "Commit before midnight UTC to keep your streak!"}
        </p>

        {/* Progress bar showing time remaining */}
        <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isCritical
                ? "bg-red-500 animate-pulse"
                : isDangerZone
                ? "bg-orange-500"
                : "bg-yellow-500"
            }`}
            style={{
              width: `${Math.max(
                5,
                (timeLeft.totalMinutes / (24 * 60)) * 100
              )}%`,
            }}
          />
        </div>
      </div>
    );
  }

  if (streakStatus === "broken") {
    return (
      <div className="text-center mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
        <p className="text-xs text-gray-400">
          Start a new streak with your next commit.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-full transition-colors"
        >
          Make a commit →
        </a>
      </div>
    );
  }

  return null;
};

export default StreakResetCountdown;
