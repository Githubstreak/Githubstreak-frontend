import { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FaDownload,
  FaShare,
  FaFire,
  FaTrophy,
  FaCalendarAlt,
  FaGithub,
  FaChartLine,
  FaPalette,
  FaCheck,
  FaCopy,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import html2canvas from "html2canvas";

/**
 * ShareableProfileCard - Generate beautiful, shareable stats cards
 * This is a MAJOR differentiating feature for social proof and virality
 *
 * Features:
 * - Multiple card themes
 * - Download as PNG
 * - Direct share to X/Twitter
 * - Embed code generator
 */

const themes = {
  dark: {
    id: "dark",
    name: "Dark",
    bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    accent: "text-green-400",
    border: "border-slate-700",
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900",
    accent: "text-purple-400",
    border: "border-purple-700/50",
  },
  fire: {
    id: "fire",
    name: "Fire",
    bg: "bg-gradient-to-br from-orange-900 via-red-900 to-slate-900",
    accent: "text-orange-400",
    border: "border-orange-700/50",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    bg: "bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900",
    accent: "text-cyan-400",
    border: "border-cyan-700/50",
  },
  forest: {
    id: "forest",
    name: "Forest",
    bg: "bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900",
    accent: "text-emerald-400",
    border: "border-emerald-700/50",
  },
};

// Stats Card Component (the actual shareable card)
const StatsCard = ({ userStats, username, avatar, theme, cardRef }) => {
  const currentStreak = userStats?.currentStreak?.count ?? 0;
  const longestStreak = userStats?.longestStreak?.count ?? 0;
  const contributions = userStats?.contributions ?? 0;
  const themeConfig = themes[theme] || themes.dark;

  // Get streak tier
  const getTier = () => {
    if (currentStreak >= 365)
      return { name: "LEGENDARY", emoji: "👑", color: "text-yellow-400" };
    if (currentStreak >= 100)
      return { name: "MASTER", emoji: "💎", color: "text-purple-400" };
    if (currentStreak >= 30)
      return { name: "WARRIOR", emoji: "⚔️", color: "text-blue-400" };
    if (currentStreak >= 7)
      return { name: "RISING", emoji: "🚀", color: "text-green-400" };
    return { name: "STARTER", emoji: "🌱", color: "text-gray-400" };
  };

  const tier = getTier();

  return (
    <div
      ref={cardRef}
      className={`
        ${themeConfig.bg} ${themeConfig.border}
        border-2 rounded-2xl p-6 w-[400px] relative overflow-hidden
      `}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header with Avatar and Username */}
      <div className="relative flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={avatar || `https://github.com/${username}.png`}
            alt={username}
            className="w-16 h-16 rounded-full ring-4 ring-white/10"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <FaFire className="text-white text-xs" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{username}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-sm font-semibold ${tier.color}`}>
              {tier.emoji} {tier.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Streak Display */}
      <div className="relative text-center mb-6">
        <div className="inline-flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <FaFire className={`text-4xl ${themeConfig.accent}`} />
            <span className="text-7xl font-black text-white">
              {currentStreak}
            </span>
          </div>
          <span className={`text-lg font-medium ${themeConfig.accent} -mt-1`}>
            DAY STREAK
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <FaTrophy className="text-yellow-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{longestStreak}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Best
          </p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <FaChartLine className="text-green-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">
            {contributions.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Commits
          </p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <FaCalendarAlt className="text-blue-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">
            {Math.round((currentStreak / 365) * 100)}%
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Year
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
            <FaGithub className="text-white text-xs" />
          </div>
          <span className="text-sm font-semibold text-white">GitHubStreak</span>
        </div>
        <span className="text-xs text-gray-500">ggithubstreak.com</span>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  userStats: PropTypes.object,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  theme: PropTypes.string.isRequired,
  cardRef: PropTypes.object,
};

// Main ShareableProfileCard Component
const ShareableProfileCard = ({ userStats, username, avatar }) => {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // Generate and download image
  const downloadAsImage = useCallback(async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${username}-streak-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [username]);

  // Share on X/Twitter
  const shareOnX = () => {
    const currentStreak = userStats?.currentStreak?.count ?? 0;
    let text = "";

    if (currentStreak >= 100) {
      text = `🔥 ${currentStreak}-day coding streak! 💯\n\nConsistency is my superpower. Track your GitHub streaks at @githubstreak`;
    } else if (currentStreak >= 30) {
      text = `🔥 ${currentStreak} days of consistent coding!\n\nBuilding great habits with @githubstreak`;
    } else {
      text = `🔥 ${currentStreak}-day streak and counting!\n\nJoin me on @githubstreak to stay consistent`;
    }

    const url = encodeURIComponent("https://ggithubstreak.com");
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  // Copy embed code - uses backend API for image generation
  const copyEmbedCode = () => {
    const API_BASE = "https://api.ggithubstreak.com";
    const embedUrl = `${API_BASE}/v1/embed/${username}/svg?theme=${selectedTheme}`;
    const profileUrl = `https://ggithubstreak.com/u/${username}`;
    const code = `<a href="${profileUrl}"><img src="${embedUrl}" alt="${username}'s GitHub Streak" /></a>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!username) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
            <FaShare className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Share Your Stats</h3>
            <p className="text-xs text-gray-400">
              Generate a beautiful card to share
            </p>
          </div>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <FaPalette className="text-gray-400" />
          <span className="text-sm text-gray-400">Choose Theme</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.values(themes).map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${
                  selectedTheme === theme.id
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-gray-400 hover:text-white"
                }
              `}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Card Preview */}
      <div className="p-4 flex justify-center overflow-auto">
        <div className="transform scale-75 origin-center sm:scale-100">
          <StatsCard
            userStats={userStats}
            username={username}
            avatar={avatar}
            theme={selectedTheme}
            cardRef={cardRef}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-700/50 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={downloadAsImage}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FaDownload />
                Download PNG
              </>
            )}
          </button>
          <button
            onClick={shareOnX}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <FaXTwitter />
            Share
          </button>
        </div>

        {/* Embed Code */}
        <button
          onClick={copyEmbedCode}
          className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700/50 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg transition-colors text-sm"
        >
          {copied ? (
            <>
              <FaCheck className="text-green-400" />
              Copied Embed Code!
            </>
          ) : (
            <>
              <FaCopy />
              Copy Embed Code for README
            </>
          )}
        </button>
      </div>
    </div>
  );
};

ShareableProfileCard.propTypes = {
  userStats: PropTypes.object,
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export default ShareableProfileCard;
