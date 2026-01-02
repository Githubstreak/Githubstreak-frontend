import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Link,
} from "@nextui-org/react";
import { FaMedal } from "react-icons/fa";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import { columns } from "./data";
import { capitalize } from "./utils";
import { useUser } from "@clerk/clerk-react";

const INITIAL_VISIBLE_COLUMNS = [
  "rank",
  "developer",
  "streak",
  "contributions",
  "compare",
];

const Leaderboard = ({ leaderboard }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "streak",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const { user: currentUser } = useUser();

  const rankedUsers = leaderboard ?? [];

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // Filter, sort, and paginate users
  const filteredUsers = React.useMemo(() => {
    return rankedUsers.filter((user) =>
      user.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [rankedUsers, filterValue]);

  const sortedUsers = React.useMemo(() => {
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

  const pages = Math.ceil(sortedUsers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedUsers.slice(start, end);
  }, [page, sortedUsers, rowsPerPage]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "rank":
          return (
            <div className="flex items-center gap-1 font-semibold">
              {user.rank === 1 && (
                <FaMedal className="text-yellow-500" size={18} />
              )}
              {user.rank === 2 && (
                <FaMedal className="text-gray-400" size={18} />
              )}
              {user.rank === 3 && (
                <FaMedal className="text-amber-600" size={18} />
              )}
              <span>{user.rank}</span>
            </div>
          );
        case "developer":
          return (
            <Link
              isExternal
              href={`https://analytics.ggithubstreak.com/devs/${user.username}`}
            >
              <User
                avatarProps={{ radius: "lg", src: user.avatar + "&s=48" }}
                description={`@${user.username}`}
                className="text-green-400"
                name={user.username}
              />
            </Link>
          );
        case "streak":
          return (
            <div className="flex items-center gap-1">
              <span className="text-lg">🔥</span>
              <span className="font-semibold">
                {user.currentStreak?.count ?? 0} days
              </span>
            </div>
          );
        case "contributions":
          return (
            <span className="font-medium">
              {(user.contributions ?? 0).toLocaleString()}
            </span>
          );
        case "compare":
          return !currentUser ? (
            <span className="text-gray-400 text-sm">Sign in to compare</span>
          ) : (
            <a href={`/meme?me=${currentUser.username}&other=${user.username}`}>
              <Button variant="flat" color="success" size="sm">
                Compare
              </Button>
            </a>
          );
        default:
          return cellValue;
      }
    },
    [currentUser]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex h-full gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  color="success"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            {filteredUsers.length} of {rankedUsers.length} developers
          </span>
          <label className="flex items-center text-default-400 text-small gap-1">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-1"
              onChange={onRowsPerPageChange}
              defaultValue={15}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    filteredUsers.length,
    rankedUsers.length,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages <= 1}
            size="sm"
            variant="flat"
            color="success"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages <= 1}
            size="sm"
            variant="flat"
            color="success"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <section id="leaderboard" className="scroll-mt-20">
      <Table
        className="p-4 md:p-10 xl:p-16"
        color="success"
        isHeaderSticky
        aria-label="Leaderboard table showing developer rankings"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[500px] md:max-h-[600px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "compare" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No developers found</p>
              <p className="text-gray-500 text-sm mt-1">
                {filterValue
                  ? "Try a different search term"
                  : "Check back soon!"}
              </p>
            </div>
          }
          items={items}
        >
          {(item) => (
            <TableRow
              key={item.username}
              className={
                currentUser?.username === item.username
                  ? "bg-green-900/30 border-l-4 border-green-500"
                  : ""
              }
            >
              {(columnKey) => (
                <TableCell>
                  {columnKey === "developer" &&
                  currentUser?.username === item.username ? (
                    <div className="flex items-center gap-2">
                      {renderCell(item, columnKey)}
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        YOU
                      </span>
                    </div>
                  ) : (
                    renderCell(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default Leaderboard;
