import { Fragment, useState, useEffect } from "react";
import { Leaderboard, Topthree, CommunityLead } from "../sections";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { useUserStats } from "../context/UserStatsContext";
import PersonalStreakCard from "../components/PersonalStreakCard";
import AchievementBadges from "../components/AchievementBadges";
import DailyChallenge from "../components/DailyChallenge";
import LevelProgress from "../components/LevelProgress";
import ConfettiCelebration from "../components/ConfettiCelebration";
import MotivationalQuote from "../components/MotivationalQuote";
import AIStreakCoach from "../components/AIStreakCoach";
import StreakSquads from "../components/StreakSquads";
import StreakPledge from "../components/StreakPledge";
import ShareableProfileCard from "../components/ShareableProfileCard";
import CodingPatternsAnalytics from "../components/CodingPatternsAnalytics";
import Nav from "../components/Nav";
import { TopThreeSkeleton, LeaderboardSkeleton } from "../components/Skeleton";
import {
  FaExclamationTriangle,
  FaThLarge,
  FaThList,
  FaFire,
} from "react-icons/fa";

const Dashboard = () => {
  const { leaderboard, topThree, isLoading, error, refetch } =
    useGetLeaderboard();
  const {
    userStats,
    isLoading: userLoading,
    error: userError,
    streakStatus,
    isSignedIn,
    isLoaded,
    user,
    refetch: refetchUser,
  } = useUserStats();

  // Dashboard view mode: 'simple' or 'full'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("dashboard_view") || "full";
  });

  // Save view preference to localStorage
  const toggleViewMode = () => {
    const newMode = viewMode === "full" ? "simple" : "full";
    setViewMode(newMode);
    localStorage.setItem("dashboard_view", newMode);
  };

  // Track previous streak for confetti celebration
  const [previousStreak, setPreviousStreak] = useState(0);

  useEffect(() => {
    if (userStats?.currentStreak?.count !== undefined) {
      const current = userStats.currentStreak.count;
      if (current !== previousStreak && previousStreak !== 0) {
        // Streak changed, confetti will handle the celebration
      }
      setPreviousStreak(current);
    }
  }, [userStats?.currentStreak?.count, previousStreak]);

  const currentStreak = userStats?.currentStreak?.count ?? 0;
  const longestStreak = userStats?.longestStreak?.count ?? currentStreak;
  const totalContributions = userStats?.contributions ?? 0;

  // Show loading state while Clerk is initializing
  console.log(
    "[Dashboard] Render: isLoaded:",
    isLoaded,
    "isSignedIn:",
    isSignedIn,
    "user:",
    user
  );
  if (!isLoaded) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-20">
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <FaFire className="text-5xl text-green-500 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400">Loading your dashboard...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-20">
        {/* Confetti celebration for milestones */}
        {isSignedIn && (
          <ConfettiCelebration
            currentStreak={currentStreak}
            previousStreak={previousStreak}
          />
        )}

        {/* Dashboard Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <FaFire className="text-green-500" />
                Your Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Track your progress and stay consistent
              </p>
            </div>

            {/* View Toggle */}
            <button
              onClick={toggleViewMode}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 
                         rounded-xl text-sm text-gray-300 transition-all duration-200
                         border border-slate-700 hover:border-slate-600 self-start sm:self-auto"
              aria-label={`Switch to ${
                viewMode === "full" ? "simple" : "full"
              } view`}
            >
              {viewMode === "full" ? (
                <>
                  <FaThList className="text-green-400" />
                  <span>Simple View</span>
                </>
              ) : (
                <>
                  <FaThLarge className="text-green-400" />
                  <span>Full View</span>
                </>
              )}
            </button>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Streak Card & Quote */}
            <div className="lg:col-span-1 space-y-6">
              <PersonalStreakCard
                userStats={userStats}
                isLoading={userLoading}
                error={userError}
                streakStatus={streakStatus}
                isSignedIn={isSignedIn}
                refetch={refetchUser}
              />
              {/* Motivational Quote - Full view only */}
              {viewMode === "full" && <MotivationalQuote />}
            </div>

            {/* Right Column - Challenges & Level */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Streak Coach - Always visible */}
              <AIStreakCoach />

              {/* Daily Challenge - Full view only */}
              {viewMode === "full" && <DailyChallenge />}

              {/* Level & XP Progress - Only when signed in AND full view */}
              {viewMode === "full" && isSignedIn && userStats && (
                <LevelProgress
                  totalContributions={totalContributions}
                  currentStreak={currentStreak}
                  longestStreak={longestStreak}
                />
              )}
            </div>
          </div>
        </section>

        {/* Achievements Section - Only when signed in AND full view */}
        {viewMode === "full" && isSignedIn && userStats && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <AchievementBadges
              currentStreak={currentStreak}
              totalContributions={totalContributions}
            />
          </section>
        )}

        {/* New Features Section - Squads, Pledges, Analytics, Share */}
        {viewMode === "full" && isSignedIn && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Streak Squads - Team challenges */}
              <StreakSquads />

              {/* Streak Pledge - Public commitments */}
              <StreakPledge currentStreak={currentStreak} />

              {/* Coding Patterns Analytics */}
              <CodingPatternsAnalytics
                contributionDays={userStats?.contributionDays}
                currentStreak={currentStreak}
              />

              {/* Shareable Profile Card */}
              <ShareableProfileCard
                userStats={userStats}
                username={user?.username || userStats?.username}
                avatar={user?.imageUrl}
              />
            </div>
          </section>
        )}

        {/* Leaderboard Section */}
        <section id="leaderboard" className="bg-slate-950/50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error ? (
              <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8 text-center">
                <FaExclamationTriangle className="mx-auto text-4xl text-red-500 mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={refetch}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : isLoading ? (
              <Fragment>
                <TopThreeSkeleton />
                <div className="mt-8">
                  <LeaderboardSkeleton />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <Topthree topThree={topThree} />
                <div className="mt-8">
                  <Leaderboard leaderboard={leaderboard} />
                </div>
              </Fragment>
            )}
          </div>
        </section>

        {/* Community Quote */}
        <CommunityLead />
      </main>
    </>
  );
};

export default Dashboard;
