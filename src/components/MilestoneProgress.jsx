/**
 * Milestone progress bar component.
 * Shows progress toward next streak milestone (7, 30, 100 days).
 */
const MilestoneProgress = ({ currentStreak }) => {
  const milestones = [7, 30, 100];
  const nextMilestone = milestones.find((m) => m > currentStreak) || 100;
  const prevMilestone = milestones.filter((m) => m <= currentStreak).pop() || 0;

  // Avoid division by zero
  const range = nextMilestone - prevMilestone;
  const progress =
    range > 0 ? ((currentStreak - prevMilestone) / range) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{prevMilestone > 0 ? `${prevMilestone} days ✓` : "Start"}</span>
        <span>{nextMilestone} days</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">
        {nextMilestone - currentStreak} days to {nextMilestone}-day milestone 🎯
      </p>
    </div>
  );
};

export default MilestoneProgress;
