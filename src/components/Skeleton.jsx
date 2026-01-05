import PropTypes from "prop-types";

/**
 * Reusable skeleton loader component for consistent loading states
 */
const Skeleton = ({ className = "", variant = "rectangle", count = 1 }) => {
  const baseClasses = "skeleton animate-pulse bg-slate-700/50";

  const variants = {
    rectangle: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4",
    card: "rounded-2xl",
  };

  const elements = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    />
  ));

  return count === 1 ? elements[0] : <>{elements}</>;
};

/**
 * Skeleton for the Daily Challenge component
 */
export const DailyChallengeSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-6 w-24 rounded-full mb-4" />
    <Skeleton className="h-20 w-full rounded-xl mb-4" />
    <div className="flex gap-3">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-20 rounded-lg" />
    </div>
  </div>
);

/**
 * Skeleton for the Level Progress component
 */
export const LevelProgressSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
    <Skeleton className="h-3 w-full rounded-full mb-6" />
    <div className="grid grid-cols-3 gap-2">
      <Skeleton className="h-20 rounded-lg" />
      <Skeleton className="h-20 rounded-lg" />
      <Skeleton className="h-20 rounded-lg" />
    </div>
  </div>
);

/**
 * Skeleton for the Achievement Badges component
 */
export const AchievementsSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-2 w-full rounded-full mb-6" />
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-16 h-16 rounded-xl" />
      ))}
    </div>
  </div>
);

/**
 * Skeleton for the Motivational Quote component
 */
export const QuoteSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
    <Skeleton className="h-6 w-6 rounded mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-3" />
    <Skeleton className="h-3 w-24 ml-auto" />
  </div>
);

/**
 * Skeleton for a leaderboard row
 */
export const LeaderboardRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
    <Skeleton className="w-8 h-8 rounded-full" />
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);

/**
 * Skeleton for the Leaderboard component
 */
export const LeaderboardSkeleton = () => (
  <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
    <Skeleton className="h-8 w-48 mx-auto mb-6" />
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <LeaderboardRowSkeleton key={i} />
      ))}
    </div>
  </div>
);

/**
 * Skeleton for Top Three component
 */
export const TopThreeSkeleton = () => (
  <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
    <Skeleton className="h-8 w-48 mx-auto mb-8" />
    <div className="flex justify-center items-end gap-4">
      <Skeleton className="w-32 h-48 rounded-2xl" />
      <Skeleton className="w-36 h-56 rounded-2xl" />
      <Skeleton className="w-32 h-44 rounded-2xl" />
    </div>
  </div>
);

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["rectangle", "circle", "text", "card"]),
  count: PropTypes.number,
};

export default Skeleton;
