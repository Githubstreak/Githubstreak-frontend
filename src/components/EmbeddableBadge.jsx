import { useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaGithub,
  FaCode,
  FaExternalLinkAlt,
} from "react-icons/fa";

const EmbeddableBadge = ({ username, currentStreak = 0 }) => {
  const [copied, setCopied] = useState(null);

  if (!username) {
    return null;
  }

  // Badge URL - this would point to a serverless function or API
  const badgeUrl = `https://api.ggithubstreak.com/badge/${username}`;
  const profileUrl = `https://githubstreak.com/u/${username}`;

  // Different embed formats
  const embedFormats = {
    markdown: `[![GitHub Streak](${badgeUrl})](${profileUrl})`,
    html: `<a href="${profileUrl}"><img src="${badgeUrl}" alt="GitHub Streak" /></a>`,
    url: badgeUrl,
  };

  const handleCopy = (format) => {
    navigator.clipboard.writeText(embedFormats[format]);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  // Determine badge color based on streak
  const getBadgeColor = () => {
    if (currentStreak >= 100) return "from-yellow-400 to-amber-600";
    if (currentStreak >= 30) return "from-green-400 to-emerald-600";
    if (currentStreak >= 7) return "from-blue-400 to-blue-600";
    return "from-gray-400 to-gray-600";
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaCode className="text-purple-400" />
          Embed Your Streak
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Show off your streak on your GitHub README or website!
      </p>

      {/* Badge preview */}
      <div className="flex justify-center mb-6">
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gradient-to-r ${getBadgeColor()}
            shadow-lg transform hover:scale-105 transition-transform
          `}
        >
          <FaGithub className="text-white" />
          <span className="text-white font-bold">{currentStreak}</span>
          <span className="text-white/80 text-sm">day streak</span>
        </div>
      </div>

      {/* Embed options */}
      <div className="space-y-3">
        {/* Markdown */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 font-medium">
              Markdown (for README.md)
            </span>
            <button
              onClick={() => handleCopy("markdown")}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              {copied === "markdown" ? (
                <>
                  <FaCheck className="text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto">
            {embedFormats.markdown}
          </div>
        </div>

        {/* HTML */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 font-medium">
              HTML (for websites)
            </span>
            <button
              onClick={() => handleCopy("html")}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              {copied === "html" ? (
                <>
                  <FaCheck className="text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto">
            {embedFormats.html}
          </div>
        </div>

        {/* Direct URL */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 font-medium">Image URL</span>
            <button
              onClick={() => handleCopy("url")}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              {copied === "url" ? (
                <>
                  <FaCheck className="text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto">
            {embedFormats.url}
          </div>
        </div>
      </div>

      {/* Link to profile */}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
      >
        View your GitHub Profile <FaExternalLinkAlt className="text-xs" />
      </a>

      {/* Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Badge updates automatically with your streak progress.
      </p>
    </div>
  );
};

export default EmbeddableBadge;
