import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useUser, useAuth } from "@clerk/clerk-react";

const Leaderboard = ({ leaderboard }) => {
  const [filterValue] = useState("");
  const [rowsPerPage] = useState(50);
  const [sortDescriptor] = useState({
    column: "rank",
    direction: "ascending",
  });
  const [page] = useState(1);

  const { user: currentUser, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [rankedUsers, setRankedUsers] = useState(leaderboard ?? []);

  // Fetch leaderboard with userId
  useEffect(() => {
    if (!isLoaded) return;
    if (leaderboard && leaderboard.length > 0) {
      setRankedUsers(leaderboard);
      return;
    }
    const fetchLeaderboard = async () => {
      try {
        const token = await getToken();
        const res = await fetch(
          "https://api.ggithubstreak.com/v1/leaderboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setRankedUsers(data);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchLeaderboard();
  }, [isLoaded, currentUser, leaderboard]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return rankedUsers.filter((user) =>
      user.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [rankedUsers, filterValue]);

  // Sort users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let first, second;

      switch (sortDescriptor.column) {
        case "rank":
          first = a.rank;
          second = b.rank;
          break;
        case "streak":
          first = a.currentStreak?.count ?? 0;
          second = b.currentStreak?.count ?? 0;
          break;
        case "contributions":
          first = a.contributions ?? 0;
          second = b.contributions ?? 0;
          break;
        default:
          return 0;
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredUsers, sortDescriptor]);

  // Pagination
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedUsers.slice(start, start + rowsPerPage);
  }, [page, sortedUsers, rowsPerPage]);

  // Get streak tier
  const getStreakTier = (streak) => {
    if (streak >= 100) return { label: "Legend", color: "warning", icon: "👑" };
    if (streak >= 30)
      return { label: "Master", color: "secondary", icon: "💎" };
    if (streak >= 7) return { label: "Warrior", color: "primary", icon: "⚡" };
    if (streak >= 1) return { label: "Starter", color: "success", icon: "🌱" };
    return { label: "New", color: "default", icon: "🆕" };
  };

  // Get rank display
  const getRankDisplay = (rank) => {
    if (rank === 1) return { emoji: "🥇", class: "text-yellow-500 font-bold" };
    if (rank === 2) return { emoji: "🥈", class: "text-gray-400 font-bold" };
    if (rank === 3) return { emoji: "🥉", class: "text-amber-600 font-bold" };
    if (rank <= 10)
      return { emoji: "🔥", class: "text-orange-400 font-semibold" };
    return { emoji: "", class: "text-gray-400" };
  };

  // Check if current user
  // const isCurrentUser = (username) => currentUser?.username === username;

  // Columns configuration
  const columns = [
    { key: "rank", label: "RANK", sortable: true },
    { key: "developer", label: "DEVELOPER" },
    { key: "streak", label: "STREAK", sortable: true },
    { key: "contributions", label: "CONTRIBUTIONS", sortable: true },
    { key: "tier", label: "TIER" },
    { key: "actions", label: "" },
  ];

  // Advanced cell rendering
  const renderCell = useCallback((user, columnKey) => {
    const streak = user.currentStreak?.count ?? 0;
    const tier = getStreakTier(streak);
    const rankDisplay = getRankDisplay(user.rank);

    switch (columnKey) {
      case "rank":
        return (
          <div className={`flex items-center gap-2 ${rankDisplay.class}`}>
            {rankDisplay.emoji && (
              <span className="text-lg">{rankDisplay.emoji}</span>
            )}
            <span className="text-lg font-mono">#{user.rank}</span>
          </div>
        );

      case "developer":
        return (
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Avatar and highlight for current user */}
              <img
                src={user.avatar + "&s=64"}
                alt={user.username}
                className={`w-10 h-10 rounded-full border-2 ${
                  user.rank <= 3 ? "border-yellow-500" : "border-green-500/50"
                }`}
              />
              {/* Optionally highlight current user */}
            </div>
            <div>
              <p className="font-semibold text-white flex items-center gap-2">
                {user.username}
                {user.rank <= 10 && (
                  <span className="text-yellow-500 text-xs">🏆</span>
                )}
              </p>
              <a
                href={`https://github.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 text-xs hover:underline flex items-center gap-1"
              >
                @{user.username}
              </a>
            </div>
          </div>
        );

      case "streak":
        return (
          <div className="flex items-center gap-2">
            <div
              className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  ${streak > 0 ? "bg-orange-500/20" : "bg-slate-700"}
                `}
            >
              <span
                className={`font-bold ${
                  streak >= 30
                    ? "text-orange-400 animate-pulse"
                    : streak > 0
                    ? "text-orange-400"
                    : "text-gray-500"
                }`}
              >
                🔥
              </span>
              <span className="font-bold text-white">{streak}</span>
              <span className="text-gray-400 text-xs">days</span>
            </div>
          </div>
        );

      case "contributions":
        return (
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-sm">📈</span>
            <span className="font-semibold text-white">
              {(user.contributions ?? 0).toLocaleString()}
            </span>
          </div>
        );

      case "tier":
        return (
          <span className="capitalize px-2 py-1 rounded bg-slate-700 text-white">
            {tier.icon} {tier.label}
          </span>
        );

      case "actions":
        return (
          <div className="flex items-center gap-2">
            <a
              href={`https://github.com/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <span className="text-gray-400 hover:text-white">🔗</span>
            </a>
          </div>
        );

      default:
        return null;
    }
  }, []);
  // (Removed duplicate/unreachable code from previous renderCell implementation)

  // --- ADVANCED FEATURES COMMENTED OUT FOR DEBUGGING ---
  /*
  const topContent = useMemo(() => {
    // ...existing advanced top content code...
  }, [
    filterValue,
    filteredUsers.length,
    rankedUsers.length,
    rowsPerPage,
    onSearchChange,
  ]);
  */

  // --- ADVANCED FEATURES COMMENTED OUT FOR DEBUGGING ---
  /*
  const bottomContent = useMemo(() => {
    // ...existing advanced bottom content code...
  }, [page, pages, sortedUsers.length, rowsPerPage]);
  */

  // Don't render if no data
  if (!rankedUsers || rankedUsers.length === 0) {
    return (
      <section id="leaderboard" className="scroll-mt-20">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-12 text-center">
          <p className="text-gray-400 text-lg">No leaderboard data available</p>
          <p className="text-gray-500 text-sm mt-1">Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="leaderboard" className="scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
        <Table aria-label="Leaderboard table showing developer rankings">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.key === "actions" ? "end" : "start"}
                allowsSorting={column.sortable}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={items}
            emptyContent={
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No developers found</p>
                <p className="text-gray-500 text-sm mt-1">
                  {filterValue
                    ? "Try a different search term"
                    : "Check back soon!"}
                </p>
              </div>
            }
          >
            {(item) => (
              <TableRow key={item.username}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      rank: PropTypes.number,
      contributions: PropTypes.number,
      currentStreak: PropTypes.shape({
        count: PropTypes.number,
      }),
    })
  ),
};

Leaderboard.defaultProps = {
  leaderboard: [],
};

export default Leaderboard;
