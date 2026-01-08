import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useUser } from "@clerk/clerk-react";

const Leaderboard = ({ leaderboard }) => {
  const [filterValue] = useState("");
  const [rowsPerPage] = useState(50);
  const [sortDescriptor] = useState({
    column: "rank",
    direction: "ascending",
  });
  const [page] = useState(1);

  const { user: currentUser, isLoaded } = useUser();
  const [rankedUsers, setRankedUsers] = useState(leaderboard ?? []);

  // Fetch leaderboard with userId
  useEffect(() => {
    if (!isLoaded) return;
    const fetchLeaderboard = async () => {
      try {
        const userId = currentUser?.id;
        const res = await fetch(
          "https://api.ggithubstreak.com/v1/users/leaderboard",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userId ? { userId } : {}),
          }
        );
        const data = await res.json();
        if (Array.isArray(data.leaderboard)) {
          setRankedUsers(data.leaderboard);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchLeaderboard();
  }, [isLoaded, currentUser]);

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

  // --- ADVANCED FEATURES COMMENTED OUT FOR DEBUGGING ---
  /*
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
  */

  // Check if current user
  // const isCurrentUser = (username) => currentUser?.username === username;

  // Columns configuration
  const columns = [
    { key: "rank", label: "RANK", sortable: true },
    { key: "developer", label: "DEVELOPER" },
    // --- ADVANCED FEATURES COMMENTED OUT FOR DEBUGGING ---
    /*
    const renderCell = useCallback(
      (user, columnKey) => {
        const streak = user.currentStreak?.count ?? 0;
        const tier = getStreakTier(streak);
        const rankDisplay = getRankDisplay(user.rank);
        // ...existing advanced cell rendering code...
      },
      [currentUser]
    );
    */
  ];

  // Basic cell rendering for username and rank only
  function renderCell(user, columnKey) {
    switch (columnKey) {
      case "rank":
        return <span>#{user.rank}</span>;
      case "developer":
        return <span>{user.username}</span>;
      case "streak":
        return <span>{user.currentStreak?.count ?? 0}</span>;
      case "contributions":
        return <span>{user.contributions ?? 0}</span>;
      case "tier":
        return <span>-</span>;
      case "actions":
        return null;
      default:
        return null;
    }
  }
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
