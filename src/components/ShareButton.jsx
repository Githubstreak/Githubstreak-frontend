import { FaShare, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

/**
 * ShareButton - Allows users to share their streak on X/Twitter
 */
const ShareButton = ({ currentStreak, username }) => {
  const [copied, setCopied] = useState(false);

  const getShareText = () => {
    if (currentStreak >= 100) {
      return `🔥 I've hit a ${currentStreak}-day coding streak on @githubstreak! 💯\n\nConsistency beats talent. Join the community and build your coding habit!\n\n#GitHubStreak #100DaysOfCode #Developer`;
    } else if (currentStreak >= 30) {
      return `🔥 ${currentStreak}-day coding streak and counting! 📈\n\nBuilding consistency one commit at a time with @githubstreak\n\n#GitHubStreak #Developer #CodingStreak`;
    } else if (currentStreak >= 7) {
      return `🔥 ${currentStreak} days of consistent coding!\n\nKeeping the streak alive with @githubstreak. Who's with me?\n\n#GitHubStreak #Developer`;
    } else {
      return `🔥 Building my coding streak: ${currentStreak} ${
        currentStreak === 1 ? "day" : "days"
      } and growing!\n\nJoin me on @githubstreak to stay consistent.\n\n#GitHubStreak #Developer`;
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent("https://ggithubstreak.com");
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${getShareText()}\n\nhttps://ggithubstreak.com`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!currentStreak || currentStreak < 1) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={shareOnX}
        className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all hover:scale-[1.02]"
      >
        <FaXTwitter className="text-base" />
        Share on X
      </button>
      <button
        onClick={copyToClipboard}
        className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-2.5 px-3 rounded-lg transition-all hover:scale-[1.02]"
        title="Copy to clipboard"
      >
        {copied ? (
          <span className="text-green-400">✓</span>
        ) : (
          <FaShare className="text-base" />
        )}
      </button>
    </div>
  );
};

export default ShareButton;
