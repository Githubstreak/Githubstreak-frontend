import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUsers,
  FaFire,
  FaPlus,
  FaLink,
  FaCopy,
  FaCheck,
  FaUserPlus,
  FaArrowRight,
  FaLock,
  FaGlobe,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

/**
 * StreakSquads - Team-based streak challenges
 * This is a major differentiating feature that no competitor has!
 *
 * Features:
 * - Create/join squads with friends
 * - Team streak multipliers
 * - Weekly squad challenges
 * - Squad leaderboards
 */

// Mock data for demo - in production this would come from backend
const mockSquads = [
  {
    id: "squad-1",
    name: "Code Warriors",
    code: "CW2026",
    members: [
      {
        username: "alice",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        streak: 45,
        isLeader: true,
      },
      {
        username: "bob",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        streak: 32,
        isLeader: false,
      },
      {
        username: "carol",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        streak: 28,
        isLeader: false,
      },
    ],
    weeklyGoal: 7,
    weeklyProgress: 5,
    totalStreak: 105,
    rank: 3,
    isPrivate: false,
  },
];

// Squad Card Component
const SquadCard = ({ squad, isUserMember, onJoin }) => {
  const teamStreak = squad.members.reduce((sum, m) => sum + m.streak, 0);
  const avgStreak = Math.round(teamStreak / squad.members.length);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700 p-4 hover:border-green-500/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white">{squad.name}</h4>
            {squad.isPrivate ? (
              <FaLock className="text-gray-500 text-xs" />
            ) : (
              <FaGlobe className="text-green-400 text-xs" />
            )}
          </div>
          <p className="text-gray-400 text-xs mt-0.5">
            {squad.members.length} members • Rank #{squad.rank}
          </p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
          <FaFire className="text-orange-400 text-xs" />
          <span className="text-orange-400 text-sm font-bold">
            {teamStreak}
          </span>
        </div>
      </div>

      {/* Members */}
      <div className="flex -space-x-2 mb-3">
        {squad.members.slice(0, 5).map((member, idx) => (
          <img
            key={member.username}
            src={member.avatar}
            alt={member.username}
            className={`w-8 h-8 rounded-full border-2 ${
              member.isLeader ? "border-yellow-500" : "border-slate-700"
            }`}
            style={{ zIndex: 5 - idx }}
          />
        ))}
        {squad.members.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
            <span className="text-xs text-gray-400">
              +{squad.members.length - 5}
            </span>
          </div>
        )}
      </div>

      {/* Weekly Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-400">Weekly Goal</span>
          <span className="text-white font-medium">
            {squad.weeklyProgress}/{squad.weeklyGoal} days
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(
                (squad.weeklyProgress / squad.weeklyGoal) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-white">{avgStreak}</p>
          <p className="text-[10px] text-gray-400">Avg Streak</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-green-400">
            ×{(1 + squad.members.length * 0.1).toFixed(1)}
          </p>
          <p className="text-[10px] text-gray-400">XP Bonus</p>
        </div>
      </div>

      {/* Action */}
      {!isUserMember && (
        <button
          onClick={() => onJoin(squad)}
          className="w-full py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaUserPlus className="text-xs" />
          Join Squad
        </button>
      )}
    </div>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object.isRequired,
  isUserMember: PropTypes.bool,
  onJoin: PropTypes.func.isRequired,
};

// Create Squad Modal
const CreateSquadModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(7);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaUsers className="text-green-400" />
          Create Your Squad
        </h3>

        <div className="space-y-4">
          {/* Squad Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Squad Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Code Warriors"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              maxLength={30}
            />
          </div>

          {/* Weekly Goal */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Weekly Goal (days)
            </label>
            <div className="flex gap-2">
              {[5, 7].map((goal) => (
                <button
                  key={goal}
                  onClick={() => setWeeklyGoal(goal)}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    weeklyGoal === goal
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-slate-700 border-slate-600 text-gray-400 hover:border-slate-500"
                  }`}
                >
                  {goal} days
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Private Squad</p>
              <p className="text-gray-500 text-xs">
                Only invited members can join
              </p>
            </div>
            <button
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                isPrivate ? "bg-green-600" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  isPrivate ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate({ name, isPrivate, weeklyGoal })}
            disabled={!name.trim()}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Create Squad
          </button>
        </div>
      </div>
    </div>
  );
};

CreateSquadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

// Join Squad Modal
const JoinSquadModal = ({ isOpen, onClose, onJoin }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaLink className="text-blue-400" />
          Join a Squad
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          Enter the squad invite code to join your friends!
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter code (e.g., CW2026)"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-xl tracking-widest font-mono placeholder-gray-500 focus:outline-none focus:border-green-500 uppercase"
          maxLength={8}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onJoin(code)}
            disabled={code.length < 4}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Join Squad
          </button>
        </div>
      </div>
    </div>
  );
};

JoinSquadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired,
};

// Main StreakSquads Component
const StreakSquads = () => {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("discover"); // discover, my-squads
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [mySquads, setMySquads] = useState([]);
  const [publicSquads] = useState(mockSquads);
  const [inviteCode, setInviteCode] = useState(null);
  const [copied, setCopied] = useState(false);

  // Generate invite code for user's squad
  const generateInviteCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateSquad = (data) => {
    const newSquad = {
      id: `squad-${Date.now()}`,
      name: data.name,
      code: generateInviteCode(),
      members: [
        {
          username: user?.username || "you",
          avatar:
            user?.imageUrl || "https://avatars.githubusercontent.com/u/0?v=4",
          streak: 0,
          isLeader: true,
        },
      ],
      weeklyGoal: data.weeklyGoal,
      weeklyProgress: 0,
      totalStreak: 0,
      rank: publicSquads.length + 1,
      isPrivate: data.isPrivate,
    };
    setMySquads([...mySquads, newSquad]);
    setInviteCode(newSquad.code);
    setShowCreateModal(false);
    setActiveTab("my-squads");
  };

  const handleJoinSquad = (squad) => {
    if (!mySquads.find((s) => s.id === squad.id)) {
      setMySquads([...mySquads, squad]);
    }
  };

  const handleJoinByCode = (code) => {
    // In production, this would validate the code against the backend
    const squad = publicSquads.find((s) => s.code === code);
    if (squad) {
      handleJoinSquad(squad);
      setShowJoinModal(false);
      setActiveTab("my-squads");
    }
  };

  const copyInviteCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
        <FaUsers className="text-4xl text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Streak Squads</h3>
        <p className="text-gray-400 text-sm">
          Sign in to create or join squads with friends!
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
              <FaUsers className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Streak Squads
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                  NEW
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Team up, compete, earn bonus XP
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowJoinModal(true)}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              title="Join with code"
            >
              <FaLink className="text-gray-400" />
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
              title="Create squad"
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        {/* Invite Code Banner */}
        {inviteCode && (
          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Squad Created!
              </p>
              <p className="text-gray-400 text-xs">
                Share this code with friends
              </p>
            </div>
            <button
              onClick={copyInviteCode}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
            >
              <span className="font-mono font-bold text-white">
                {inviteCode}
              </span>
              {copied ? (
                <FaCheck className="text-white" />
              ) : (
                <FaCopy className="text-white" />
              )}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { id: "discover", label: "Discover", icon: FaGlobe },
            { id: "my-squads", label: "My Squads", icon: FaUsers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon className="text-xs" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "discover" && (
          <div className="space-y-3">
            {publicSquads.map((squad) => (
              <SquadCard
                key={squad.id}
                squad={squad}
                isUserMember={mySquads.some((s) => s.id === squad.id)}
                onJoin={handleJoinSquad}
              />
            ))}
            {publicSquads.length === 0 && (
              <div className="text-center py-8">
                <FaUsers className="text-3xl text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No public squads yet</p>
                <p className="text-gray-500 text-sm">
                  Be the first to create one!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "my-squads" && (
          <div className="space-y-3">
            {mySquads.length > 0 ? (
              mySquads.map((squad) => (
                <SquadCard
                  key={squad.id}
                  squad={squad}
                  isUserMember={true}
                  onJoin={() => {}}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <FaUsers className="text-3xl text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">
                  You haven&apos;t joined any squads
                </p>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  Discover Squads
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateSquadModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateSquad}
      />
      <JoinSquadModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinByCode}
      />
    </div>
  );
};

export default StreakSquads;
