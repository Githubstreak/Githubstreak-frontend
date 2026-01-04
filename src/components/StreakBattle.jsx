import { useState } from "react";
import {
  FaSwords,
  FaUserFriends,
  FaCopy,
  FaCheck,
  FaTrophy,
  FaFire,
} from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

const StreakBattle = ({ userStats, username }) => {
  const [battleCode, setBattleCode] = useState("");
  const [opponent, setOpponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("challenge"); // 'challenge' or 'join'

  const currentStreak = userStats?.currentStreak?.count ?? 0;
  const longestStreak = userStats?.longestStreak?.count ?? currentStreak;

  // Generate a unique battle code
  const generateBattleCode = () => {
    const code = `${username}-${Date.now().toString(36).toUpperCase()}`;
    return code;
  };

  const [myBattleCode] = useState(generateBattleCode());

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myBattleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinBattle = async () => {
    if (!battleCode.trim()) return;

    setIsLoading(true);
    // Simulate API call - in production this would fetch opponent data
    setTimeout(() => {
      // Mock opponent data
      setOpponent({
        username: battleCode.split("-")[0],
        currentStreak: Math.floor(Math.random() * 50),
        longestStreak: Math.floor(Math.random() * 100) + 20,
        avatar: `https://github.com/${battleCode.split("-")[0]}.png`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const getWinner = () => {
    if (!opponent) return null;
    if (currentStreak > opponent.currentStreak) return "you";
    if (currentStreak < opponent.currentStreak) return "opponent";
    return "tie";
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <GiCrossedSwords className="text-red-400" />
          Streak Battle
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Challenge a friend to see who has the longest streak!
      </p>

      {/* Tab switcher */}
      <div className="flex mb-4 bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("challenge")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "challenge"
              ? "bg-green-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Challenge
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "join"
              ? "bg-green-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Join Battle
        </button>
      </div>

      {activeTab === "challenge" ? (
        // Create challenge tab
        <div>
          <p className="text-xs text-gray-400 mb-2">
            Share this code with a friend:
          </p>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-900 rounded-lg p-3 font-mono text-sm text-green-400">
              {myBattleCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-lg transition-colors"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Your friend enters this code to start the battle
          </p>
        </div>
      ) : (
        // Join battle tab
        <div>
          <p className="text-xs text-gray-400 mb-2">Enter battle code:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={battleCode}
              onChange={(e) => setBattleCode(e.target.value)}
              placeholder="friend-ABC123"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleJoinBattle}
              disabled={isLoading || !battleCode.trim()}
              className="bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 rounded-lg transition-colors"
            >
              {isLoading ? "..." : "Battle!"}
            </button>
          </div>
        </div>
      )}

      {/* Battle results */}
      {opponent && (
        <div className="mt-6 pt-6 border-t border-slate-700">
          <h4 className="text-center text-sm text-gray-400 mb-4">
            Battle Results
          </h4>

          <div className="flex items-center justify-between">
            {/* You */}
            <div
              className={`text-center flex-1 p-4 rounded-xl ${
                getWinner() === "you"
                  ? "bg-green-900/30 border border-green-700"
                  : "bg-slate-800/50"
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-2">
                <span className="text-xl">👤</span>
              </div>
              <p className="text-white font-medium text-sm truncate">You</p>
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white mt-2">
                <FaFire className="text-orange-400" />
                {currentStreak}
              </div>
              <p className="text-xs text-gray-400">current streak</p>
              {getWinner() === "you" && (
                <div className="mt-2 flex items-center justify-center gap-1 text-yellow-400 text-sm">
                  <FaTrophy /> Winner!
                </div>
              )}
            </div>

            {/* VS */}
            <div className="px-4">
              <div className="w-10 h-10 rounded-full bg-red-900/50 border border-red-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
            </div>

            {/* Opponent */}
            <div
              className={`text-center flex-1 p-4 rounded-xl ${
                getWinner() === "opponent"
                  ? "bg-green-900/30 border border-green-700"
                  : "bg-slate-800/50"
              }`}
            >
              <img
                src={opponent.avatar}
                alt={opponent.username}
                className="w-12 h-12 mx-auto rounded-full mb-2"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <p className="text-white font-medium text-sm truncate">
                {opponent.username}
              </p>
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white mt-2">
                <FaFire className="text-orange-400" />
                {opponent.currentStreak}
              </div>
              <p className="text-xs text-gray-400">current streak</p>
              {getWinner() === "opponent" && (
                <div className="mt-2 flex items-center justify-center gap-1 text-yellow-400 text-sm">
                  <FaTrophy /> Winner!
                </div>
              )}
            </div>
          </div>

          {getWinner() === "tie" && (
            <div className="text-center mt-4 text-yellow-400">
              <FaUserFriends className="inline mr-2" />
              It's a tie! Both at {currentStreak} days!
            </div>
          )}

          {/* Battle again */}
          <button
            onClick={() => setOpponent(null)}
            className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Start New Battle
          </button>
        </div>
      )}
    </div>
  );
};

export default StreakBattle;
