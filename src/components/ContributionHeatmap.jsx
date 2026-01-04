import { FaCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * GitHub-style contribution heatmap showing contribution patterns
 * Shows the last 12 weeks of activity
 */
const ContributionHeatmap = ({ contributionDays = [] }) => {
  // Generate last 12 weeks of dates
  const generateCalendarData = () => {
    const weeks = [];
    const today = new Date();

    // Start from 12 weeks ago, on a Sunday
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 12 * 7 - startDate.getDay());

    // Create a map of contribution days for quick lookup
    const contributionMap = new Map();
    contributionDays.forEach((day) => {
      const dateStr = typeof day === "string" ? day : day.date;
      if (dateStr) {
        contributionMap.set(dateStr.split("T")[0], day.count || 1);
      }
    });

    // Generate 12 weeks of data
    let currentWeek = [];
    const currentDate = new Date(startDate);

    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = contributionMap.get(dateStr) || 0;

      currentWeek.push({
        date: dateStr,
        count,
        dayOfWeek: currentDate.getDay(),
      });

      // Start new week on Sunday
      if (currentDate.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Push remaining days
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = generateCalendarData();

  // Get color based on contribution count
  const getColor = (count) => {
    if (count === 0) return "bg-slate-800";
    if (count === 1) return "bg-green-900";
    if (count <= 3) return "bg-green-700";
    if (count <= 5) return "bg-green-500";
    return "bg-green-400";
  };

  // Day labels
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  // Month labels
  const getMonthLabels = () => {
    const labels = [];
    let currentMonth = null;

    weeks.forEach((week, weekIndex) => {
      if (week[0]) {
        const month = new Date(week[0].date).toLocaleDateString("en-US", {
          month: "short",
        });
        if (month !== currentMonth) {
          labels.push({ month, weekIndex });
          currentMonth = month;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  // Calculate stats
  const totalContributions = contributionDays.length;
  const activeDays = new Set(
    contributionDays.map(
      (d) => (typeof d === "string" ? d : d.date)?.split("T")[0]
    )
  ).size;
  const averagePerDay =
    activeDays > 0 ? (totalContributions / activeDays).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaCalendarAlt className="text-green-400" />
          Activity Heatmap
        </h3>
        <span className="text-sm text-gray-400">Last 12 weeks</span>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map(({ month, weekIndex }, i) => (
              <div
                key={i}
                className="text-xs text-gray-500"
                style={{
                  marginLeft: i === 0 ? `${weekIndex * 14}px` : undefined,
                  width:
                    i < monthLabels.length - 1
                      ? `${(monthLabels[i + 1].weekIndex - weekIndex) * 14}px`
                      : "auto",
                }}
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-2">
              {dayLabels.map((label, i) => (
                <div key={i} className="h-3 text-xs text-gray-500 leading-3">
                  {label}
                </div>
              ))}
            </div>

            {/* Weeks grid */}
            <div className="flex gap-0.5">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
                    const day = week.find((d) => d.dayOfWeek === dayOfWeek);
                    if (!day) {
                      return (
                        <div
                          key={dayOfWeek}
                          className="w-3 h-3 rounded-sm bg-transparent"
                        />
                      );
                    }
                    return (
                      <div
                        key={dayOfWeek}
                        className={`w-3 h-3 rounded-sm ${getColor(
                          day.count
                        )} hover:ring-1 hover:ring-white/50 cursor-pointer transition-all`}
                        title={`${day.date}: ${day.count} contribution${
                          day.count !== 1 ? "s" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-xs text-gray-500">Less</span>
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-sm bg-slate-800" />
              <div className="w-3 h-3 rounded-sm bg-green-900" />
              <div className="w-3 h-3 rounded-sm bg-green-700" />
              <div className="w-3 h-3 rounded-sm bg-green-500" />
              <div className="w-3 h-3 rounded-sm bg-green-400" />
            </div>
            <span className="text-xs text-gray-500">More</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
        <div className="text-center">
          <p className="text-lg font-bold text-white">{totalContributions}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">{activeDays}</p>
          <p className="text-xs text-gray-400">Active Days</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">{averagePerDay}</p>
          <p className="text-xs text-gray-400">Avg/Day</p>
        </div>
      </div>
    </div>
  );
};

ContributionHeatmap.propTypes = {
  contributionDays: PropTypes.array,
};

export default ContributionHeatmap;
