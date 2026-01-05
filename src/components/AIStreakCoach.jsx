import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaChartLine,
  FaCheckCircle,
  FaFire,
  FaClock,
  FaSpinner,
  FaPaperPlane,
  FaExpand,
  FaCompress,
  FaMagic,
  FaHistory,
} from "react-icons/fa";
import { useUserStats } from "../context/UserStatsContext";

// AI Analysis Engine - Client-side intelligence
const AIAnalysisEngine = {
  // Analyze contribution patterns
  analyzePatterns: (userStats, streakStatus, timeUntilReset) => {
    const insights = [];
    const currentStreak = userStats?.currentStreak?.count ?? 0;
    const longestStreak = userStats?.longestStreak?.count ?? 0;
    const contributions = userStats?.contributions ?? 0;
    const hoursLeft = timeUntilReset?.hours ?? 24;

    // Streak momentum analysis
    if (currentStreak > 0) {
      const momentum = currentStreak / Math.max(longestStreak, 1);
      if (momentum >= 1) {
        insights.push({
          type: "achievement",
          icon: "🏆",
          title: "Personal Best Alert!",
          message: `You're at your all-time best streak of ${currentStreak} days! Every commit now is a new record.`,
          priority: 1,
        });
      } else if (momentum >= 0.75) {
        insights.push({
          type: "motivation",
          icon: "🔥",
          title: "Approaching Your Best",
          message: `You're at ${Math.round(
            momentum * 100
          )}% of your longest streak. Just ${
            longestStreak - currentStreak
          } more days to beat your record!`,
          priority: 2,
        });
      }
    }

    // Time-based urgency
    if (streakStatus === "pending") {
      if (hoursLeft <= 4) {
        insights.push({
          type: "urgent",
          icon: "⏰",
          title: "Critical Time Alert!",
          message: `Only ${hoursLeft}h ${
            timeUntilReset?.minutes ?? 0
          }m left! Make a commit now to save your ${currentStreak}-day streak.`,
          priority: 0,
        });
      } else if (hoursLeft <= 8) {
        insights.push({
          type: "warning",
          icon: "⚠️",
          title: "Streak at Risk",
          message: `You haven't committed today. ${hoursLeft} hours remaining to maintain your streak.`,
          priority: 1,
        });
      }
    }

    // Contribution rate analysis
    if (currentStreak > 7) {
      const avgContribsPerDay = contributions / Math.max(currentStreak, 1);
      if (avgContribsPerDay >= 5) {
        insights.push({
          type: "praise",
          icon: "⭐",
          title: "Power Contributor",
          message: `Averaging ${avgContribsPerDay.toFixed(
            1
          )} contributions per day! You're in the top tier of active developers.`,
          priority: 3,
        });
      }
    }

    // Milestone predictions
    const daysToMilestones = [7, 14, 30, 50, 100, 365].filter(
      (m) => m > currentStreak
    );
    if (daysToMilestones.length > 0) {
      const nextMilestone = daysToMilestones[0];
      const daysLeft = nextMilestone - currentStreak;
      if (daysLeft <= 3) {
        insights.push({
          type: "milestone",
          icon: "🎯",
          title: `${nextMilestone}-Day Milestone Incoming!`,
          message: `Just ${daysLeft} more day${
            daysLeft > 1 ? "s" : ""
          } until you hit the ${nextMilestone}-day milestone! Keep pushing!`,
          priority: 2,
        });
      }
    }

    // Streak recovery encouragement
    if (streakStatus === "broken" || currentStreak === 0) {
      insights.push({
        type: "encouragement",
        icon: "💪",
        title: "Fresh Start",
        message:
          "Every master was once a beginner. Start your streak today and build momentum one commit at a time!",
        priority: 1,
      });
    }

    return insights.sort((a, b) => a.priority - b.priority);
  },

  // Generate personalized tips
  generateTips: (userStats, streakStatus) => {
    const currentStreak = userStats?.currentStreak?.count ?? 0;
    const tips = [];

    if (currentStreak === 0) {
      tips.push(
        "Start small: even a README update counts as a contribution",
        "Set a daily reminder for your most productive hour",
        "Work on a personal project you're passionate about"
      );
    } else if (currentStreak < 7) {
      tips.push(
        "Building habits takes 21 days. You're on day " + currentStreak + "!",
        "Try coding at the same time each day to build routine",
        "Keep a 'quick wins' list for low-effort commits"
      );
    } else if (currentStreak < 30) {
      tips.push(
        "You've proven consistency. Now focus on quality commits",
        "Consider contributing to open source projects",
        "Document your journey - it helps others too"
      );
    } else {
      tips.push(
        "You're a streak master! Consider mentoring others",
        "Challenge yourself with more complex contributions",
        "Your consistency is inspiring - share your tips with the community"
      );
    }

    if (streakStatus === "pending") {
      tips.unshift("⚡ Quick tip: Review and merge a PR, or fix a small bug!");
    }

    return tips;
  },

  // Generate AI response to user questions
  generateResponse: (question, userStats, streakStatus, timeUntilReset) => {
    const currentStreak = userStats?.currentStreak?.count ?? 0;
    const longestStreak = userStats?.longestStreak?.count ?? 0;
    const contributions = userStats?.contributions ?? 0;
    const q = question.toLowerCase();

    // Streak-related questions
    if (q.includes("streak") && (q.includes("how") || q.includes("what"))) {
      if (currentStreak > 0) {
        return `Your current streak is **${currentStreak} days**! ${
          currentStreak >= longestStreak
            ? "You're at your personal best! 🏆"
            : `Your record is ${longestStreak} days - you're ${
                longestStreak - currentStreak
              } days away from beating it!`
        }`;
      }
      return "You don't have an active streak right now. Make a commit today to start one! 🚀";
    }

    // Time-related questions
    if (q.includes("time") || q.includes("left") || q.includes("deadline")) {
      const hours = timeUntilReset?.hours ?? 0;
      const mins = timeUntilReset?.minutes ?? 0;
      return `You have **${hours} hours and ${mins} minutes** until the daily reset (midnight UTC). ${
        streakStatus === "pending"
          ? "⚠️ You need to commit before then to keep your streak!"
          : streakStatus === "today"
          ? "✅ You're safe - you've already committed today!"
          : "Start a new streak with a commit!"
      }`;
    }

    // Contribution questions
    if (q.includes("contribution") || q.includes("commit")) {
      return `You have **${contributions.toLocaleString()} total contributions**. ${
        contributions > 1000
          ? "That's impressive! You're a dedicated developer. 💎"
          : contributions > 100
          ? "Great progress! Keep building your portfolio. 📈"
          : "Every contribution counts - keep going! 🌱"
      }`;
    }

    // Motivation requests
    if (
      q.includes("motivat") ||
      q.includes("inspire") ||
      q.includes("encourage")
    ) {
      const motivations = [
        "Consistency beats intensity. Your daily commits compound into mastery.",
        "The best developers aren't the smartest - they're the most persistent.",
        "Every line of code you write today is an investment in your future self.",
        "Streaks aren't about perfection - they're about showing up.",
        "You're not just writing code. You're building discipline that transfers to everything.",
      ];
      return (
        motivations[Math.floor(Math.random() * motivations.length)] + " 💪"
      );
    }

    // Tips requests
    if (
      q.includes("tip") ||
      q.includes("advice") ||
      q.includes("suggest") ||
      q.includes("help")
    ) {
      const tips = AIAnalysisEngine.generateTips(userStats, streakStatus);
      return `Here's my advice for you:\n\n${tips
        .map((t, i) => `${i + 1}. ${t}`)
        .join("\n")}`;
    }

    // Prediction questions
    if (q.includes("predict") || q.includes("chance") || q.includes("risk")) {
      if (streakStatus === "today") {
        return "✅ Your streak is safe today! Based on your pattern, you have a **high chance** of maintaining it.";
      } else if (streakStatus === "pending") {
        const riskLevel = timeUntilReset?.hours < 8 ? "high" : "moderate";
        return `⚠️ **${
          riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)
        } risk** detected. You haven't committed today with ${
          timeUntilReset?.hours
        }h remaining. Make a commit soon!`;
      }
      return "Start fresh today! Your next streak awaits. 🚀";
    }

    // Default helpful response
    return `I'm your AI Streak Coach! I can help you with:\n\n• **Streak status** - Ask about your current streak\n• **Time remaining** - Check time until daily reset\n• **Tips & advice** - Get personalized coding tips\n• **Motivation** - Need a boost? Just ask!\n• **Predictions** - Analyze your streak risk\n\nTry asking: "How's my streak doing?" or "Give me some motivation!"`;
  },
};

// Chat Message Component
const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
    <div
      className={`
        max-w-[85%] px-4 py-3 rounded-2xl
        ${
          isUser
            ? "bg-green-600 text-white rounded-br-md"
            : "bg-slate-700 text-gray-100 rounded-bl-md"
        }
      `}
    >
      {!isUser && (
        <div className="flex items-center gap-2 mb-1 text-xs text-green-400">
          <FaRobot className="text-sm" />
          <span className="font-medium">AI Coach</span>
        </div>
      )}
      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
    </div>
  </div>
);

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

// Insight Card Component
const InsightCard = ({ insight }) => {
  const typeStyles = {
    urgent: "bg-red-500/20 border-red-500/50 text-red-100",
    warning: "bg-yellow-500/20 border-yellow-500/50 text-yellow-100",
    achievement: "bg-purple-500/20 border-purple-500/50 text-purple-100",
    motivation: "bg-orange-500/20 border-orange-500/50 text-orange-100",
    praise: "bg-green-500/20 border-green-500/50 text-green-100",
    milestone: "bg-blue-500/20 border-blue-500/50 text-blue-100",
    encouragement: "bg-teal-500/20 border-teal-500/50 text-teal-100",
  };

  return (
    <div
      className={`
        p-3 rounded-xl border ${
          typeStyles[insight.type] || typeStyles.motivation
        }
        transition-all duration-200 hover:scale-[1.02]
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{insight.icon}</span>
        <div>
          <h4 className="font-semibold text-sm">{insight.title}</h4>
          <p className="text-xs mt-1 opacity-90">{insight.message}</p>
        </div>
      </div>
    </div>
  );
};

InsightCard.propTypes = {
  insight: PropTypes.shape({
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

// Quick Action Button
const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 
               rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200
               border border-slate-600/50 hover:border-slate-500"
  >
    <Icon className="text-green-400 text-sm" />
    <span>{label}</span>
  </button>
);

QuickAction.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Main AI Streak Coach Component
const AIStreakCoach = () => {
  const { userStats, streakStatus, timeUntilReset, isSignedIn, isLoading } =
    useUserStats();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("insights"); // insights, chat, tips
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Generate insights based on user data
  const insights = useMemo(() => {
    if (!userStats) return [];
    return AIAnalysisEngine.analyzePatterns(
      userStats,
      streakStatus,
      timeUntilReset
    );
  }, [userStats, streakStatus, timeUntilReset]);

  // Generate tips
  const tips = useMemo(() => {
    return AIAnalysisEngine.generateTips(userStats, streakStatus);
  }, [userStats, streakStatus]);

  // Initial greeting
  useEffect(() => {
    if (isSignedIn && userStats && chatMessages.length === 0) {
      const currentStreak = userStats?.currentStreak?.count ?? 0;
      let greeting = "";

      if (streakStatus === "today") {
        greeting = `Great job! You've already committed today. Your ${currentStreak}-day streak is safe! 🔥 How can I help you stay motivated?`;
      } else if (streakStatus === "pending") {
        greeting = `Hey! You haven't committed yet today. You have ${timeUntilReset?.hours}h left to keep your ${currentStreak}-day streak alive! Need some quick commit ideas?`;
      } else {
        greeting =
          "Welcome! Ready to start a new streak? I'm here to help you build consistent coding habits. Ask me anything!";
      }

      setChatMessages([{ text: greeting, isUser: false }]);
    }
  }, [
    isSignedIn,
    userStats,
    streakStatus,
    timeUntilReset,
    chatMessages.length,
  ]);

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setChatMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    // Simulate AI thinking
    setIsTyping(true);

    // Small delay for natural feel
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 500)
    );

    const response = AIAnalysisEngine.generateResponse(
      userMessage,
      userStats,
      streakStatus,
      timeUntilReset
    );

    setChatMessages((prev) => [...prev, { text: response, isUser: false }]);
    setIsTyping(false);
  }, [inputValue, userStats, streakStatus, timeUntilReset]);

  // Handle quick actions
  const quickActions = [
    { icon: FaFire, label: "Streak Status", query: "How's my streak?" },
    {
      icon: FaClock,
      label: "Time Left",
      query: "How much time do I have left?",
    },
    { icon: FaLightbulb, label: "Get Tips", query: "Give me some tips" },
    { icon: FaMagic, label: "Motivate Me", query: "I need motivation" },
  ];

  const handleQuickAction = (query) => {
    setInputValue(query);
    setActiveTab("chat");
  };

  // Key press handler
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isSignedIn) {
    return (
      <div
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl 
                      border border-slate-700 p-6 text-center"
      >
        <FaRobot className="text-4xl text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">AI Streak Coach</h3>
        <p className="text-gray-400 text-sm">
          Sign in to get personalized AI insights and coaching!
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl 
                      border border-slate-700 p-6"
      >
        <div className="flex items-center justify-center gap-3">
          <FaSpinner className="text-green-500 animate-spin text-xl" />
          <span className="text-gray-400">Loading AI Coach...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl 
        border border-slate-700 overflow-hidden transition-all duration-300
        ${isExpanded ? "col-span-full" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl 
                            flex items-center justify-center shadow-lg shadow-green-500/20"
            >
              <FaBrain className="text-white text-lg" />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full 
                            flex items-center justify-center border-2 border-slate-800"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              AI Streak Coach
              <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full font-medium">
                BETA
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Personalized insights & coaching
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/50">
        {[
          { id: "insights", label: "Insights", icon: FaLightbulb },
          { id: "chat", label: "Chat", icon: FaRobot },
          { id: "tips", label: "Tips", icon: FaChartLine },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium
              transition-all duration-200
              ${
                activeTab === tab.id
                  ? "text-green-400 border-b-2 border-green-400 bg-green-500/5"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/30"
              }
            `}
          >
            <tab.icon className="text-xs" />
            {tab.label}
            {tab.id === "insights" && insights.length > 0 && (
              <span className="w-5 h-5 bg-green-500 rounded-full text-[10px] flex items-center justify-center text-white">
                {insights.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={`p-4 ${isExpanded ? "min-h-[400px]" : "min-h-[250px]"}`}>
        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="space-y-3">
            {insights.length > 0 ? (
              insights.map((insight, idx) => (
                <InsightCard key={idx} insight={insight} />
              ))
            ) : (
              <div className="text-center py-8">
                <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-3" />
                <p className="text-gray-300 font-medium">
                  You&apos;re doing great!
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  No urgent insights right now
                </p>
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div
              className={`flex-1 overflow-y-auto mb-4 ${
                isExpanded ? "max-h-[300px]" : "max-h-[150px]"
              }`}
            >
              {chatMessages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-sm pl-2">
                  <FaSpinner className="animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {quickActions.map((action, idx) => (
                <QuickAction
                  key={idx}
                  icon={action.icon}
                  label={action.label}
                  onClick={() => handleQuickAction(action.query)}
                />
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI coach..."
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 
                           disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <FaPaperPlane className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <FaHistory className="text-green-400" />
              <span>Personalized tips based on your streak</span>
            </div>
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-xl border border-slate-600/30
                           hover:bg-slate-700/50 transition-colors"
              >
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs font-bold">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStreakCoach;
