import { Hero, Leaderboard, Topthree, CommunityLead } from "../sections";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import { useUserStats } from "../context/UserStatsContext";
import { Fragment, useState, useEffect } from "react";
import CompareButton from "../components/CompareButton";
import PersonalStreakCard from "../components/PersonalStreakCard";
import AchievementBadges from "../components/AchievementBadges";
import DailyChallenge from "../components/DailyChallenge";
import LevelProgress from "../components/LevelProgress";
import ConfettiCelebration from "../components/ConfettiCelebration";
import MotivationalQuote from "../components/MotivationalQuote";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const { leaderboard, topThree, isLoading, error, refetch } =
    useGetLeaderboard();
  const {
    userStats,
    isLoading: userLoading,
    error: userError,
    streakStatus,
    isSignedIn,
    refetch: refetchUser,
  } = useUserStats();

  // Track previous streak for confetti celebration
  const [previousStreak, setPreviousStreak] = useState(0);

  useEffect(() => {
    if (userStats?.currentStreak?.count !== undefined) {
      // Only update previous if current changed
      const current = userStats.currentStreak.count;
      if (current !== previousStreak && previousStreak !== 0) {
        // Streak changed, confetti will handle the celebration
      }
      setPreviousStreak(current);
    }
  }, [userStats?.currentStreak?.count]);

  const currentStreak = userStats?.currentStreak?.count ?? 0;
  const longestStreak = userStats?.longestStreak?.count ?? currentStreak;
  const totalContributions = userStats?.contributions ?? 0;

  return (
    <main>
      {/* Confetti celebration for milestones */}
      {isSignedIn && (
        <ConfettiCelebration
          currentStreak={currentStreak}
          previousStreak={previousStreak}
        />
      )}

      <section>
        <Hero />
      </section>

      {/* Personal Streak Dashboard */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <PersonalStreakCard
              userStats={userStats}
              isLoading={userLoading}
              error={userError}
              streakStatus={streakStatus}
              isSignedIn={isSignedIn}
              refetch={refetchUser}
            />
            {/* Motivational Quote */}
            <MotivationalQuote />
          </div>
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Challenge - Always visible */}
            <DailyChallenge />

            {/* Level & XP Progress - Only when signed in */}
            {isSignedIn && userStats && (
              <LevelProgress
                totalContributions={totalContributions}
                currentStreak={currentStreak}
                longestStreak={longestStreak}
              />
            )}
          </div>
        </div>
      </section>

      {/* Achievements Section - Only when signed in */}
      {isSignedIn && userStats && (
        <section className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 pb-8">
          <AchievementBadges
            currentStreak={currentStreak}
            totalContributions={totalContributions}
          />
        </section>
      )}

      {/* Error state for leaderboard */}
      {error ? (
        <section className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-8 text-center">
            <FaExclamationTriangle className="mx-auto text-4xl text-red-500 mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-12">
          <span className="text-center loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <Fragment>
          <section>
            <Topthree topThree={topThree} />
          </section>
          <section>
            <Leaderboard leaderboard={leaderboard} />
          </section>
        </Fragment>
      )}

      <section>
        <CommunityLead />
      </section>
      <div className="fixed z-41 bottom-0 right-0 left-0 md:w-1/2 flex align-center px-10 mb-5">
        <CompareButton />
      </div>
    </main>
  );
};

export default Home;
