/**
 * Transform functions to normalize backend API responses
 * into stable frontend shapes. This creates a buffer between
 * backend changes and frontend components.
 */

/**
 * Transforms user stats from backend to frontend shape.
 * Handles missing fields gracefully.
 *
 * @param {Object} data - Raw backend response
 * @returns {Object} Normalized user stats
 */
export const transformUserStats = (data) => {
  if (!data) return null;

  return {
    currentStreak: {
      count: data.currentStreak?.count ?? 0,
      startDate: data.currentStreak?.startDate ?? null,
    },
    longestStreak: {
      count: data.longestStreak?.count ?? data.currentStreak?.count ?? 0,
      startDate: data.longestStreak?.startDate ?? null,
      endDate: data.longestStreak?.endDate ?? null,
    },
    contributions: data.contributions ?? 0,
    lastContributionDate: data.lastContributionDate ?? null,
    username: data.username ?? null,
  };
};

/**
 * Transforms a single leaderboard user from backend to frontend shape.
 *
 * @param {Object} user - Raw user object from backend
 * @param {number} index - Position in array (for fallback rank)
 * @returns {Object} Normalized leaderboard user
 */
export const transformLeaderboardUser = (user, index) => {
  if (!user) return null;

  // Ensure avatar URL is properly formatted
  let avatar = user.avatar || "";
  // If avatar doesn't have size param, add it
  if (avatar && !avatar.includes("s=")) {
    avatar = avatar.includes("?") ? `${avatar}&s=48` : `${avatar}?s=48`;
  }

  return {
    username: user.username ?? "unknown",
    avatar,
    rank: user.rank ?? index + 1, // Fallback to array position if no rank
    contributions: user.contributions ?? 0,
    currentStreak: {
      count: user.currentStreak?.count ?? 0,
    },
  };
};

/**
 * Transforms and sorts the full leaderboard response.
 *
 * @param {Array} data - Raw backend leaderboard array
 * @returns {Array} Normalized and sorted leaderboard
 */
export const transformLeaderboard = (data) => {
  if (!Array.isArray(data)) return [];

  const transformed = data.map((user, index) =>
    transformLeaderboardUser(user, index)
  );

  // Sort by streak descending
  const sorted = transformed.sort((a, b) => {
    return (b.currentStreak?.count ?? 0) - (a.currentStreak?.count ?? 0);
  });

  // Re-assign ranks after sorting
  return sorted.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};
