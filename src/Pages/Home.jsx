import { Hero, Leaderboard, Topthree, CommunityLead } from "../sections";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import useUserStats from "../hooks/useUserStats";
import { Fragment } from "react";
import CompareButton from "../components/CompareButton";
import PersonalStreakCard from "../components/PersonalStreakCard";
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

  return (
    <main>
      <section>
        <Hero />
      </section>

      {/* Personal Streak Dashboard */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PersonalStreakCard
              userStats={userStats}
              isLoading={userLoading}
              error={userError}
              streakStatus={streakStatus}
              isSignedIn={isSignedIn}
              refetch={refetchUser}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                Why Daily Streaks Matter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <span className="text-3xl mb-2 block">🧠</span>
                  <h4 className="font-medium text-white text-sm">
                    Build Muscle Memory
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    Daily practice turns coding into a habit
                  </p>
                </div>
                <div className="text-center p-4">
                  <span className="text-3xl mb-2 block">📈</span>
                  <h4 className="font-medium text-white text-sm">
                    Compound Progress
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    Small daily wins add up to big results
                  </p>
                </div>
                <div className="text-center p-4">
                  <span className="text-3xl mb-2 block">🏆</span>
                  <h4 className="font-medium text-white text-sm">
                    Join Top Developers
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    Climb the leaderboard with consistency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
