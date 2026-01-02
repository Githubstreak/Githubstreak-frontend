import { useState, useEffect } from "react";

/**
 * Displays a countdown timer until streak resets (midnight UTC).
 * Updates every minute to show remaining time.
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

    return { hours, minutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
      <div className="text-center mt-3 p-2 bg-yellow-900/30 rounded-lg">
        <p className="text-xs text-yellow-300 font-medium">
          ⏰ Streak resets in {timeLeft.hours}h {timeLeft.minutes}m
        </p>
        <p className="text-xs text-yellow-400/70 mt-1">
          Commit before midnight UTC to keep your streak!
        </p>
      </div>
    );
  }

  if (streakStatus === "broken") {
    return (
      <p className="text-xs text-gray-400 text-center mt-2">
        Start a new streak with your next commit.
      </p>
    );
  }

  return null;
};

export default StreakResetCountdown;
