import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Chip,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import {
  FaFire,
  FaSearch,
  FaTrophy,
  FaGithub,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

const Leaderboard = ({ leaderboard }) => {
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "rank",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const { user: currentUser } = useUser();
  const rankedUsers = leaderboard ?? [];

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
  const pages = Math.ceil(sortedUsers.length / rowsPerPage);
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

  const onSearchChange = useCallback((value) => {
    setFilterValue(value || "");
    setPage(1);
  }, []);

  // Check if current user
  const isCurrentUser = (username) => currentUser?.username === username;

  // Columns configuration
  const columns = [
    { key: "rank", label: "RANK", sortable: true },
    { key: "developer", label: "DEVELOPER" },
    { key: "streak", label: "STREAK", sortable: true },
    { key: "contributions", label: "CONTRIBUTIONS", sortable: true },
    { key: "tier", label: "TIER" },
    { key: "actions", label: "" },
  ];

  const renderCell = useCallback(
    (user, columnKey) => {
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
                <Avatar
                  src={user.avatar + "&s=64"}
                  size="md"
                  className={`ring-2 ${
                    user.rank <= 3 ? "ring-yellow-500" : "ring-green-500/50"
                  }`}
                />
                {isCurrentUser(user.username) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">YOU</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  {user.username}
                  {user.rank <= 10 && (
                    <FaTrophy className="text-yellow-500 text-xs" />
                  )}
                </p>
                <a
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 text-xs hover:underline flex items-center gap-1"
                >
                  <FaGithub className="text-[10px]" />@{user.username}
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
                <FaFire
                  className={`${
                    streak >= 30
                      ? "text-orange-400 animate-pulse"
                      : streak > 0
                      ? "text-orange-400"
                      : "text-gray-500"
                  }`}
                />
                <span className="font-bold text-white">{streak}</span>
                <span className="text-gray-400 text-xs">days</span>
              </div>
            </div>
          );

        case "contributions":
          return (
            <div className="flex items-center gap-2">
              <FaChartLine className="text-green-500 text-sm" />
              <span className="font-semibold text-white">
                {(user.contributions ?? 0).toLocaleString()}
              </span>
            </div>
          );

        case "tier":
          return (
            <Tooltip content={`${streak} day streak`}>
              <Chip
                startContent={<span className="pl-1">{tier.icon}</span>}
                variant="flat"
                color={tier.color}
                size="sm"
                className="capitalize"
              >
                {tier.label}
              </Chip>
            </Tooltip>
          );

        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Tooltip content="View GitHub Profile">
                <a
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <FaGithub className="text-gray-400 hover:text-white" />
                </a>
              </Tooltip>
            </div>
          );

        default:
          return null;
      }
    },
    [currentUser]
  );

  // Top content with search and filters
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Global Leaderboard
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {rankedUsers.length} developers competing
            </p>
          </div>

          {/* Search */}
          <Input
            isClearable
            className="w-full sm:max-w-xs"
            placeholder="Search developers..."
            startContent={<FaSearch className="text-gray-400" />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
            classNames={{
              input: "bg-transparent",
              inputWrapper:
                "bg-slate-800 border border-slate-700 hover:bg-slate-700",
            }}
          />
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <Chip variant="flat" color="success" size="sm">
            {filteredUsers.length} results
          </Chip>
          {filterValue && (
            <Chip
              variant="bordered"
              onClose={() => setFilterValue("")}
              size="sm"
            >
              Search: {filterValue}
            </Chip>
          )}

          {/* Quick Filters */}
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Show:</span>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-green-500"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    filteredUsers.length,
    rankedUsers.length,
    rowsPerPage,
    onSearchChange,
  ]);

  // Bottom pagination
  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
        <span className="text-gray-400 text-sm">
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, sortedUsers.length)} of{" "}
          {sortedUsers.length}
        </span>

        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
          classNames={{
            cursor: "bg-green-500",
          }}
        />

        <div className="hidden sm:flex gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={() => setPage(page - 1)}
            startContent={<FaArrowUp className="rotate-[-90deg]" />}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            color="success"
            onPress={() => setPage(page + 1)}
            endContent={<FaArrowDown className="rotate-[-90deg]" />}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, sortedUsers.length, rowsPerPage]);

  return (
    <section id="leaderboard" className="scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
        <Table
          aria-label="Leaderboard table showing developer rankings"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
          classNames={{
            wrapper: "bg-transparent shadow-none max-h-[600px]",
            table: "min-h-[200px]",
            th: "bg-slate-800/80 text-gray-300 font-semibold uppercase text-xs tracking-wider",
            td: "py-4",
            tr: "hover:bg-slate-800/50 transition-colors border-b border-slate-700/50",
          }}
        >
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
                <FaSearch className="mx-auto text-4xl text-gray-600 mb-4" />
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
              <TableRow
                key={item.username}
                className={
                  isCurrentUser(item.username)
                    ? "!bg-green-900/30 border-l-4 !border-l-green-500"
                    : ""
                }
              >
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

export default Leaderboard;
