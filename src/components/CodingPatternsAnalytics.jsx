import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaChartBar,
  FaClock,
  FaCalendarWeek,
  FaFire,
  FaLightbulb,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

/**
 * CodingPatternsAnalytics - Deep analysis of coding habits
 *
 * Competitor Advantage:
 * - No other streak tracker provides this level of insight
 * - Helps users optimize their coding schedule
 * - Personalized recommendations based on patterns
 */

// Day of week labels
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Pattern Bar Component
const PatternBar = ({ label, value, maxValue, highlight }) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-8 text-xs font-medium ${
          highlight ? "text-green-400" : "text-gray-400"
        }`}
      >
        {label}
      </span>
      <div className="flex-1 h-6 bg-slate-700/50 rounded-lg overflow-hidden relative">
        <div
          className={`h-full rounded-lg transition-all duration-500 ${
            highlight
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-slate-600 to-slate-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
        {value > 0 && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

PatternBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
};

// Insight Card Component
const InsightCard = ({
  icon: Icon,
  title,
  value,
  subtext,
  trend,
  color = "text-green-400",
}) => (
  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
    <Icon className={`${color} text-xl mx-auto mb-2`} />
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{title}</p>
    {subtext && (
      <p
        className={`text-xs mt-2 flex items-center justify-center gap-1 ${
          trend === "up"
            ? "text-green-400"
            : trend === "down"
            ? "text-red-400"
            : "text-gray-400"
        }`}
      >
        {trend === "up" && <FaArrowUp className="text-[10px]" />}
        {trend === "down" && <FaArrowDown className="text-[10px]" />}
        {subtext}
      </p>
    )}
  </div>
);

InsightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtext: PropTypes.string,
  trend: PropTypes.oneOf(["up", "down", "neutral"]),
  color: PropTypes.string,
};

// Main Component
const CodingPatternsAnalytics = ({
  contributionDays = [],
  currentStreak = 0,
}) => {
  // Analyze contribution patterns
  const analytics = useMemo(() => {
    if (!contributionDays || contributionDays.length === 0) {
      return null;
    }

    // Parse contribution days
    const contributions = contributionDays.map((day) => {
      const dateStr = typeof day === "string" ? day : day.date;
      const count = typeof day === "object" ? day.count || 1 : 1;
      const date = new Date(dateStr);
      return {
        date,
        dateStr: dateStr?.split("T")[0],
        dayOfWeek: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        count,
      };
    });

    // Day of week distribution
    const dayDistribution = DAYS.map(
      (_, idx) => contributions.filter((c) => c.dayOfWeek === idx).length
    );
    const maxDayCount = Math.max(...dayDistribution);
    const bestDay = dayDistribution.indexOf(maxDayCount);
    const worstDay = dayDistribution.indexOf(
      Math.min(...dayDistribution.filter((d) => d >= 0))
    );

    // Month distribution (last 12 months)
    const now = new Date();
    const monthDistribution = [];
    for (let i = 11; i >= 0; i--) {
      const month = (now.getMonth() - i + 12) % 12;
      const year = now.getFullYear() - (now.getMonth() - i < 0 ? 1 : 0);
      const count = contributions.filter(
        (c) => c.month === month && c.year === year
      ).length;
      monthDistribution.push({ month, year, count });
    }
    const maxMonthCount = Math.max(...monthDistribution.map((m) => m.count));

    // Calculate consistency score (percentage of days with contributions in last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const recentContributions = contributions.filter(
      (c) => c.date >= last30Days
    ).length;
    const consistencyScore = Math.round((recentContributions / 30) * 100);

    // Calculate streak tendency (are streaks getting longer?)
    const avgContributionsPerWeek =
      contributions.length /
      Math.max(
        1,
        Math.ceil(
          (now - new Date(contributions[0]?.dateStr || now)) /
            (7 * 24 * 60 * 60 * 1000)
        )
      );

    // Generate recommendations
    const recommendations = [];

    if (bestDay !== undefined) {
      recommendations.push({
        icon: "📅",
        text: `Your best coding day is ${DAYS[bestDay]}. Schedule important work then!`,
      });
    }

    if (consistencyScore < 50) {
      recommendations.push({
        icon: "💡",
        text: "Try setting a daily reminder to boost your consistency.",
      });
    } else if (consistencyScore >= 80) {
      recommendations.push({
        icon: "🔥",
        text: "Amazing consistency! You're in the top tier of developers.",
      });
    }

    if (
      dayDistribution[0] < maxDayCount * 0.3 &&
      dayDistribution[6] < maxDayCount * 0.3
    ) {
      recommendations.push({
        icon: "🌴",
        text: "You code less on weekends. Consider small weekend contributions to boost streaks.",
      });
    }

    return {
      dayDistribution,
      maxDayCount,
      bestDay,
      worstDay,
      monthDistribution,
      maxMonthCount,
      consistencyScore,
      avgContributionsPerWeek: Math.round(avgContributionsPerWeek * 10) / 10,
      totalContributions: contributions.length,
      recommendations,
    };
  }, [contributionDays]);

  if (!analytics) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
        <FaChartBar className="text-4xl text-blue-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Coding Patterns</h3>
        <p className="text-gray-400 text-sm">
          Start contributing to see your patterns!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <FaChartBar className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              Coding Patterns
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                AI
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Insights to optimize your habits
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-4 grid grid-cols-3 gap-3 border-b border-slate-700/50">
        <InsightCard
          icon={FaFire}
          title="Current Streak"
          value={currentStreak}
          subtext="days"
          color="text-orange-400"
        />
        <InsightCard
          icon={FaCalendarWeek}
          title="Best Day"
          value={DAYS[analytics.bestDay]}
          subtext={`${
            analytics.dayDistribution[analytics.bestDay]
          } contributions`}
          color="text-green-400"
        />
        <InsightCard
          icon={FaClock}
          title="Consistency"
          value={`${analytics.consistencyScore}%`}
          subtext={analytics.consistencyScore >= 70 ? "Great!" : "Room to grow"}
          trend={analytics.consistencyScore >= 70 ? "up" : "neutral"}
          color="text-purple-400"
        />
      </div>

      {/* Day of Week Distribution */}
      <div className="p-4 border-b border-slate-700/50">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <FaCalendarWeek className="text-gray-400" />
          Contributions by Day
        </h4>
        <div className="space-y-2">
          {DAYS.map((day, idx) => (
            <PatternBar
              key={day}
              label={day}
              value={analytics.dayDistribution[idx]}
              maxValue={analytics.maxDayCount}
              highlight={idx === analytics.bestDay}
            />
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="p-4 border-b border-slate-700/50">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <FaChartBar className="text-gray-400" />
          12-Month Trend
        </h4>
        <div className="flex items-end justify-between gap-1 h-20">
          {analytics.monthDistribution.map((m, idx) => {
            const height =
              analytics.maxMonthCount > 0
                ? (m.count / analytics.maxMonthCount) * 100
                : 0;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    idx === analytics.monthDistribution.length - 1
                      ? "bg-gradient-to-t from-green-600 to-green-400"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`${MONTHS[m.month]}: ${m.count} contributions`}
                />
                <span className="text-[9px] text-gray-500">
                  {MONTHS[m.month].charAt(0)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <FaLightbulb className="text-yellow-400" />
          Personalized Insights
        </h4>
        <div className="space-y-2">
          {analytics.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg"
            >
              <span className="text-lg">{rec.icon}</span>
              <p className="text-sm text-gray-300">{rec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CodingPatternsAnalytics.propTypes = {
  contributionDays: PropTypes.array,
  currentStreak: PropTypes.number,
};

export default CodingPatternsAnalytics;
