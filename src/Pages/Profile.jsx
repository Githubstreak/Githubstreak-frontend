import { useState } from "react";
import { useUserStats } from "../context/UserStatsContext";
import { SignInButton } from "@clerk/clerk-react";
import {
  FaUser,
  FaCog,
  FaGamepad,
  FaCode,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import PersonalStreakCard from "../components/PersonalStreakCard";
import AchievementBadges from "../components/AchievementBadges";
import LevelProgress from "../components/LevelProgress";
import StreakBattle from "../components/StreakBattle";
import EmbeddableBadge from "../components/EmbeddableBadge";
import NotificationSettings from "../components/NotificationSettings";
import StreakFreezeTokens from "../components/StreakFreezeTokens";
import Nav from "../components/Nav";

const Profile = () => {
  const { userStats, isLoading, error, streakStatus, isSignedIn, refetch } =
    useUserStats();

  const [activeTab, setActiveTab] = useState("overview");

  const currentStreak = userStats?.currentStreak?.count ?? 0;
  const longestStreak = userStats?.longestStreak?.count ?? currentStreak;
  const totalContributions = userStats?.contributions ?? 0;

  // Not signed in
  if (!isSignedIn) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
            <div className="text-center py-20">
              <FaUser className="mx-auto text-6xl text-gray-600 mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">
                Your Profile
              </h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Sign in to view your stats, achievements, and access exclusive
                features like streak battles and embeddable badges.
              </p>
              <SignInButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg" />
            </div>
          </div>
        </main>
      </>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "battle", label: "Battle", icon: FaGamepad },
    { id: "embed", label: "Embed", icon: FaCode },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {userStats?.avatarUrl ? (
                <img
                  src={userStats.avatarUrl}
                  alt={userStats.username}
                  className="w-16 h-16 rounded-full border-2 border-green-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <FaUser className="text-2xl text-white" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userStats?.username || "Your Profile"}
                </h1>
                <p className="text-gray-400">
                  Member since{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Tab navigation - responsive */}
            <div className="flex gap-1 sm:gap-2 bg-slate-800 rounded-2xl p-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`${tab.label} tab`}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                      min-w-[44px] justify-center
                      ${
                        activeTab === tab.id
                          ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                          : "text-gray-400 hover:text-white hover:bg-slate-700"
                      }
                    `}
                  >
                    <Icon className="text-sm flex-shrink-0" />
                    <span className="hidden xs:inline sm:inline">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <PersonalStreakCard
                    userStats={userStats}
                    isLoading={isLoading}
                    error={error}
                    streakStatus={streakStatus}
                    isSignedIn={isSignedIn}
                    refetch={refetch}
                  />
                </div>
                <div className="lg:col-span-2">
                  <LevelProgress
                    totalContributions={totalContributions}
                    currentStreak={currentStreak}
                    longestStreak={longestStreak}
                  />
                </div>
              </div>

              <AchievementBadges
                currentStreak={currentStreak}
                totalContributions={totalContributions}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StreakFreezeTokens
                  longestStreak={longestStreak}
                  usedFreezes={0}
                  streakStatus={streakStatus}
                  onUseFreeze={() => {
                    // TODO: Implement freeze usage
                    console.log("Freeze used!");
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "battle" && (
            <div className="max-w-2xl mx-auto">
              <StreakBattle
                userStats={userStats}
                username={userStats?.username}
              />
            </div>
          )}

          {activeTab === "embed" && (
            <div className="max-w-2xl mx-auto">
              <EmbeddableBadge
                username={userStats?.username}
                currentStreak={currentStreak}
              />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <NotificationSettings streakStatus={streakStatus} />

              {/* Additional settings */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaCog className="text-gray-400" />
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">
                        Connected GitHub
                      </p>
                      <p className="text-gray-400 text-xs">
                        @{userStats?.username}
                      </p>
                    </div>
                    <span className="text-green-400 text-xs font-medium">
                      ✓ Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">
                        Sync Frequency
                      </p>
                      <p className="text-gray-400 text-xs">
                        How often we check your GitHub
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs">Every hour</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
