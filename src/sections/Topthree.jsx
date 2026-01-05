import { User } from "@nextui-org/react";
import { FaFire, FaGithub, FaCrown } from "react-icons/fa";

const Topthree = ({ topThree }) => {
  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder =
    topThree.length >= 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  const getPodiumConfig = (originalIndex) => {
    switch (originalIndex) {
      case 0: // 1st place
        return {
          medal: "🥇",
          height: "h-40",
          gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
          border: "border-yellow-500/50",
          ring: "ring-yellow-500",
          glow: "shadow-yellow-500/20",
          position: "1st",
          crown: true,
        };
      case 1: // 2nd place
        return {
          medal: "🥈",
          height: "h-32",
          gradient: "from-gray-400/20 via-gray-500/10 to-transparent",
          border: "border-gray-400/50",
          ring: "ring-gray-400",
          glow: "shadow-gray-400/20",
          position: "2nd",
          crown: false,
        };
      case 2: // 3rd place
        return {
          medal: "🥉",
          height: "h-28",
          gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
          border: "border-amber-600/50",
          ring: "ring-amber-600",
          glow: "shadow-amber-600/20",
          position: "3rd",
          crown: false,
        };
      default:
        return {};
    }
  };

  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
          <FaCrown className="text-yellow-500" />
          <span className="text-yellow-400 text-sm font-medium">
            Hall of Fame
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Top Contributors This Week
        </h2>
        <p className="text-gray-400 mt-2">
          The most consistent developers in our community
        </p>
      </div>

      {/* Podium Display */}
      <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
        {podiumOrder.map((user, displayIndex) => {
          // Get original index (0=1st, 1=2nd, 2=3rd)
          const originalIndex =
            displayIndex === 1 ? 0 : displayIndex === 0 ? 1 : 2;
          const config = getPodiumConfig(originalIndex);

          return (
            <div
              key={user.username}
              className={`flex flex-col items-center ${
                displayIndex === 1
                  ? "order-2"
                  : displayIndex === 0
                  ? "order-1"
                  : "order-3"
              }`}
            >
              {/* Crown for 1st place */}
              {config.crown && (
                <div className="mb-2 animate-bounce">
                  <FaCrown className="text-yellow-500 text-2xl sm:text-3xl" />
                </div>
              )}

              {/* Avatar Card */}
              <div
                className={`
                  relative bg-gradient-to-b ${config.gradient}
                  border ${config.border} rounded-2xl p-4 sm:p-6
                  backdrop-blur-sm transition-all duration-300
                  hover:scale-105 hover:shadow-xl ${config.glow}
                  cursor-pointer group
                `}
              >
                {/* Medal Badge */}
                <div className="absolute -top-3 -right-3 text-3xl sm:text-4xl">
                  {config.medal}
                </div>

                {/* Avatar */}
                <div className="relative mb-4">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className={`
                      w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full
                      ring-4 ${config.ring} object-cover
                      group-hover:ring-offset-2 group-hover:ring-offset-slate-900
                      transition-all
                    `}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <FaFire className="text-white text-xs sm:text-sm" />
                  </div>
                </div>

                {/* Username */}
                <div className="text-center">
                  <p className="font-bold text-white text-sm sm:text-base truncate max-w-[80px] sm:max-w-[100px]">
                    {user.username}
                  </p>
                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 text-xs hover:underline flex items-center justify-center gap-1 mt-1"
                  >
                    <FaGithub className="text-xs" />
                    <span className="hidden sm:inline">@{user.username}</span>
                  </a>
                </div>

                {/* Stats */}
                <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-white">
                    <span className="text-lg">🔥</span>
                    <span className="font-bold">
                      {user.currentStreak?.count ?? 0}
                    </span>
                    <span className="text-gray-400 text-xs">days</span>
                  </div>
                  <p className="text-gray-400 text-xs text-center">
                    {user.contributions?.toLocaleString()} contributions
                  </p>
                </div>
              </div>

              {/* Podium Stand */}
              <div
                className={`
                  ${config.height} w-20 sm:w-24 lg:w-28
                  bg-gradient-to-t from-slate-700 to-slate-800
                  border-t-4 ${config.border.replace("/50", "")}
                  rounded-t-lg mt-4 flex items-start justify-center pt-3
                  shadow-lg
                `}
              >
                <span className="text-2xl sm:text-3xl font-bold text-white/80">
                  {config.position}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topthree;
