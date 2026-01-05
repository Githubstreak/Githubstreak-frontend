// Utility to get most impactful project progress for the mobile widget
export function getImpactfulProgress(projects) {
  if (!Array.isArray(projects) || projects.length === 0)
    return {
      topContributor: null,
      topStreak: null,
      recentMilestone: null,
    };

  // Top contributor: most contributions
  let topContributor = null;
  let maxContrib = -1;
  // Biggest streak: highest streak (if available)
  let topStreak = null;
  let maxStreak = -1;
  // Recent milestone: most recently updated project
  let recentMilestone = null;
  let recentDate = null;

  for (const p of projects) {
    if ((p.contributions ?? 0) > maxContrib) {
      topContributor = {
        username: p.owner,
        contributions: p.contributions ?? 0,
      };
      maxContrib = p.contributions ?? 0;
    }
    if ((p.streak ?? 0) > maxStreak) {
      topStreak = { username: p.owner, streak: p.streak ?? 0 };
      maxStreak = p.streak ?? 0;
    }
    if (
      p.lastUpdated &&
      (!recentDate || new Date(p.lastUpdated) > new Date(recentDate))
    ) {
      recentMilestone = {
        label: p.name,
        date: new Date(p.lastUpdated).toLocaleDateString(),
      };
      recentDate = p.lastUpdated;
    }
  }

  return { topContributor, topStreak, recentMilestone };
}
