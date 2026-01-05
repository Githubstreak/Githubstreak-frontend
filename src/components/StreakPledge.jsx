import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaFlag,
  FaTrophy,
  FaFire,
  FaPlus,
  FaBullseye,
  FaClock,
  FaAward,
  FaExclamationTriangle,
  FaChevronRight,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

/**
 * StreakPledge - Public commitment system for streak goals
 *
 * This is a UNIQUE feature that no competitor has!
 *
 * Psychology-backed features:
 * - Public accountability
 * - Milestone rewards
 * - Streak insurance options
 * - Community witness system
 */

// Predefined pledge templates
const pledgeTemplates = [
  {
    id: "7-day",
    name: "Week Warrior",
    days: 7,
    icon: "⚡",
    description: "Complete a 7-day streak",
    reward: "Week Warrior badge",
    xpBonus: 100,
  },
  {
    id: "30-day",
    name: "Monthly Master",
    days: 30,
    icon: "🏆",
    description: "Commit every day for a month",
    reward: "Monthly Master badge + Freeze Token",
    xpBonus: 500,
  },
  {
    id: "100-day",
    name: "Century Legend",
    days: 100,
    icon: "💯",
    description: "Reach a 100-day streak",
    reward: "Century badge + Profile flair",
    xpBonus: 2000,
  },
  {
    id: "365-day",
    name: "Yearly Champion",
    days: 365,
    icon: "👑",
    description: "One full year of daily commits",
    reward: "Yearly Champion title + All badges",
    xpBonus: 10000,
  },
];

// Active Pledge Card
const ActivePledgeCard = ({ pledge, currentStreak, onComplete }) => {
  const progress = Math.min((currentStreak / pledge.days) * 100, 100);
  const daysRemaining = Math.max(pledge.days - currentStreak, 0);
  const isComplete = currentStreak >= pledge.days;

  return (
    <div
      className={`
      relative p-4 rounded-xl border-2 transition-all duration-300
      ${
        isComplete
          ? "bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500"
          : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
      }
    `}
    >
      {/* Completion Glow Effect */}
      {isComplete && (
        <div className="absolute inset-0 bg-green-500/10 rounded-xl animate-pulse" />
      )}

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-2xl
            ${isComplete ? "bg-green-500" : "bg-slate-700"}
          `}
          >
            {pledge.icon}
          </div>
          <div>
            <h4 className="font-bold text-white">{pledge.name}</h4>
            <p className="text-sm text-gray-400">{pledge.description}</p>
          </div>
        </div>
        {isComplete && (
          <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            COMPLETE!
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">
            {currentStreak}/{pledge.days} days
          </span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isComplete
                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                : "bg-gradient-to-r from-orange-500 to-yellow-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
          <FaFire className="text-orange-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{currentStreak}</p>
          <p className="text-[10px] text-gray-400">Current</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
          <FaClock className="text-blue-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{daysRemaining}</p>
          <p className="text-[10px] text-gray-400">Remaining</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
          <FaAward className="text-yellow-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-400">+{pledge.xpBonus}</p>
          <p className="text-[10px] text-gray-400">XP Bonus</p>
        </div>
      </div>

      {/* Reward Preview */}
      <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg">
        <FaTrophy className="text-yellow-500" />
        <div className="flex-1">
          <p className="text-xs text-gray-400">Reward</p>
          <p className="text-sm text-white">{pledge.reward}</p>
        </div>
        {isComplete ? (
          <FaUnlock className="text-green-400" />
        ) : (
          <FaLock className="text-gray-500" />
        )}
      </div>

      {/* Claim Button */}
      {isComplete && (
        <button
          onClick={() => onComplete(pledge)}
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <FaTrophy />
          Claim Reward
        </button>
      )}
    </div>
  );
};

ActivePledgeCard.propTypes = {
  pledge: PropTypes.object.isRequired,
  currentStreak: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

// Pledge Template Card
const PledgeTemplateCard = ({ template, onSelect, isLocked }) => (
  <button
    onClick={() => !isLocked && onSelect(template)}
    disabled={isLocked}
    className={`
      w-full p-4 rounded-xl border text-left transition-all
      ${
        isLocked
          ? "bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed"
          : "bg-slate-800 border-slate-700 hover:border-green-500/50 hover:bg-slate-700/50 cursor-pointer"
      }
    `}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{template.icon}</span>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{template.name}</h4>
        <p className="text-sm text-gray-400">{template.days} days</p>
      </div>
      <div className="text-right">
        <p className="text-green-400 font-bold">+{template.xpBonus} XP</p>
        {isLocked ? (
          <FaLock className="text-gray-500 ml-auto mt-1" />
        ) : (
          <FaChevronRight className="text-gray-400 ml-auto mt-1" />
        )}
      </div>
    </div>
  </button>
);

PledgeTemplateCard.propTypes = {
  template: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
};

// Main StreakPledge Component
const StreakPledge = ({ currentStreak = 0 }) => {
  const { isSignedIn } = useUser();
  const [activePledge, setActivePledge] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [completedPledges, setCompletedPledges] = useState([]);

  // Load saved pledge from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("streak_pledge");
    if (saved) {
      setActivePledge(JSON.parse(saved));
    }
    const completed = localStorage.getItem("completed_pledges");
    if (completed) {
      setCompletedPledges(JSON.parse(completed));
    }
  }, []);

  const handleSelectPledge = (template) => {
    const pledge = {
      ...template,
      startedAt: new Date().toISOString(),
      startingStreak: currentStreak,
    };
    setActivePledge(pledge);
    localStorage.setItem("streak_pledge", JSON.stringify(pledge));
    setShowTemplates(false);
  };

  const handleCompletePledge = (pledge) => {
    const completed = [...completedPledges, pledge.id];
    setCompletedPledges(completed);
    localStorage.setItem("completed_pledges", JSON.stringify(completed));
    setActivePledge(null);
    localStorage.removeItem("streak_pledge");

    // In production, this would trigger a celebration and update backend
    alert(
      `🎉 Congratulations! You earned the ${pledge.name} badge and ${pledge.xpBonus} XP!`
    );
  };

  const handleAbandonPledge = () => {
    if (
      window.confirm(
        "Are you sure you want to abandon this pledge? Your progress will be lost."
      )
    ) {
      setActivePledge(null);
      localStorage.removeItem("streak_pledge");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
        <FaFlag className="text-4xl text-purple-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Streak Pledges</h3>
        <p className="text-gray-400 text-sm">
          Sign in to make a public commitment!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <FaFlag className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Streak Pledges
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                  COMMIT
                </span>
              </h3>
              <p className="text-xs text-gray-400">Make a public commitment</p>
            </div>
          </div>

          {/* Completed Count */}
          {completedPledges.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
              <FaTrophy className="text-green-400 text-xs" />
              <span className="text-green-400 text-sm font-bold">
                {completedPledges.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activePledge ? (
          <>
            <ActivePledgeCard
              pledge={activePledge}
              currentStreak={currentStreak}
              onComplete={handleCompletePledge}
            />

            {/* Abandon option */}
            <button
              onClick={handleAbandonPledge}
              className="w-full mt-3 py-2 text-red-400 hover:text-red-300 text-sm flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <FaExclamationTriangle className="text-xs" />
              Abandon Pledge
            </button>
          </>
        ) : showTemplates ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Choose Your Pledge</h4>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Cancel
              </button>
            </div>

            {pledgeTemplates.map((template) => (
              <PledgeTemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectPledge}
                isLocked={completedPledges.includes(template.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBullseye className="text-2xl text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              No Active Pledge
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Make a public commitment to level up faster!
            </p>
            <button
              onClick={() => setShowTemplates(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all"
            >
              <FaPlus />
              Start a Pledge
            </button>
          </div>
        )}
      </div>

      {/* Completed Pledges */}
      {completedPledges.length > 0 && !showTemplates && (
        <div className="p-4 border-t border-slate-700/50">
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <FaAward className="text-yellow-500" />
            Completed Pledges
          </p>
          <div className="flex gap-2 flex-wrap">
            {pledgeTemplates
              .filter((t) => completedPledges.includes(t.id))
              .map((pledge) => (
                <span
                  key={pledge.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-full text-sm"
                >
                  <span>{pledge.icon}</span>
                  <span className="text-gray-300">{pledge.name}</span>
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

StreakPledge.propTypes = {
  currentStreak: PropTypes.number,
};

export default StreakPledge;
