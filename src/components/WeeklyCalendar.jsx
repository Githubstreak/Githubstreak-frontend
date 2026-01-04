import PropTypes from "prop-types";

/**
 * WeeklyCalendar - Shows last 7 days of contribution activity
 * Visual representation like a mini GitHub contribution graph
 */

const WeeklyCalendar = ({
  contributionDays = [],
  lastContributionDate,
  streakStatus,
  currentStreakCount = 0,
}) => {
  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    // Parse lastContributionDate
    const lastContribDate = lastContributionDate
      ? new Date(lastContributionDate).toISOString().split("T")[0]
      : null;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      // Check if this day has contributions using multiple methods
      let hasContribution = false;

      // Method 1: Check contributionDays array
      if (contributionDays.length > 0) {
        hasContribution = contributionDays.some((d) => {
          if (typeof d === "string") return d.startsWith(dateStr);
          if (d?.date) return d.date.startsWith(dateStr);
          return false;
        });
      }

      // Method 2: Use lastContributionDate and streak status
      if (!hasContribution && lastContribDate) {
        // If this is the last contribution date, mark it green
        if (dateStr === lastContribDate) {
          hasContribution = true;
        }
        // If streak is active and this day is within the streak period
        else if (currentStreakCount > 0) {
          const daysDiff = Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
          );
          // If within current streak count and before/equal to last contribution
          if (daysDiff < currentStreakCount && dateStr <= lastContribDate) {
            hasContribution = true;
          }
        }
      }

      // Method 3: Today is green if streakStatus is "today"
      if (dateStr === todayStr && streakStatus === "today") {
        hasContribution = true;
      }

      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: date.getDate(),
        isToday: i === 0,
        hasContribution,
      });
    }

    return days;
  };

  const days = getLast7Days();

  return (
    <div className="bg-slate-800/50 rounded-xl p-4">
      <p className="text-xs text-gray-400 mb-3 text-center">Last 7 Days</p>
      <div className="flex justify-between gap-1">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center gap-1"
            title={`${day.date}${
              day.hasContribution ? " - Contributed" : " - No contribution"
            }`}
          >
            <span className="text-[10px] text-gray-500">{day.dayName}</span>
            <div
              className={`
                w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium
                transition-all duration-200
                ${
                  day.isToday
                    ? "ring-2 ring-offset-1 ring-offset-slate-900"
                    : ""
                }
                ${
                  day.hasContribution
                    ? "bg-green-500 text-white ring-green-400"
                    : "bg-slate-700 text-gray-400 ring-slate-500"
                }
              `}
            >
              {day.dayNum}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-700"></div>
          <span>No commit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-green-500"></div>
          <span>Committed</span>
        </div>
      </div>
    </div>
  );
};

WeeklyCalendar.propTypes = {
  contributionDays: PropTypes.array,
  lastContributionDate: PropTypes.string,
  streakStatus: PropTypes.oneOf(["today", "pending", "broken"]),
  currentStreakCount: PropTypes.number,
};

export default WeeklyCalendar;
