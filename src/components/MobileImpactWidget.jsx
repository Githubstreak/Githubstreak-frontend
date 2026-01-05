import PropTypes from "prop-types";
import { FaFire, FaTrophy, FaChartLine } from "react-icons/fa";
import "../App.css";

/**
 * MobileImpactWidget - shows the most impactful project progress for mobile users
 * Highlights: top contributor, biggest streak, and recent milestone
 */
export default function MobileImpactWidget({
  topContributor,
  topStreak,
  recentMilestone,
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-sm bg-gradient-to-br from-green-700/90 to-slate-900/90 rounded-2xl shadow-lg border border-green-500/30 p-4 flex flex-col gap-3 z-50 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <FaTrophy className="text-yellow-400 text-2xl" />
        <div>
          <div className="text-xs text-gray-300">Top Contributor</div>
          <div className="font-bold text-white text-lg">
            {topContributor?.username || "-"}
          </div>
        </div>
        <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
          {topContributor?.contributions ?? 0} commits
        </span>
      </div>
      <div className="flex items-center gap-3">
        <FaFire className="text-orange-400 text-2xl" />
        <div>
          <div className="text-xs text-gray-300">Biggest Streak</div>
          <div className="font-bold text-white text-lg">
            {topStreak?.username || "-"}
          </div>
        </div>
        <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
          {topStreak?.streak ?? 0} days
        </span>
      </div>
      <div className="flex items-center gap-3">
        <FaChartLine className="text-green-400 text-2xl" />
        <div>
          <div className="text-xs text-gray-300">Recent Milestone</div>
          <div className="font-bold text-white text-lg">
            {recentMilestone?.label || "-"}
          </div>
        </div>
        <span className="ml-auto bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full">
          {recentMilestone?.date || "-"}
        </span>
      </div>
    </div>
  );
}

MobileImpactWidget.propTypes = {
  topContributor: PropTypes.shape({
    username: PropTypes.string,
    contributions: PropTypes.number,
  }),
  topStreak: PropTypes.shape({
    username: PropTypes.string,
    streak: PropTypes.number,
  }),
  recentMilestone: PropTypes.shape({
    label: PropTypes.string,
    date: PropTypes.string,
  }),
};
