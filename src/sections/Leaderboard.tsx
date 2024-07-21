import { useState, useMemo, useCallback } from "react";
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
  SortDescriptor,
} from "@nextui-org/react";
import { FaMedal } from "react-icons/fa";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, users } from "./data";
import { capitalize } from "./utils";
import { Leaderboard as LeaderboardType, UserRank } from "../types";

const INITIAL_VISIBLE_COLUMNS = [
  "rank",
  "developer",
  "streak",
  "contributions",
];

const Leaderboard = ({ leaderboard }: { leaderboard: LeaderboardType }) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [visibleColumns, setVisibleColumns] = useState<any>( // TODO: Fix any type
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [statusFilter] = useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "streak",
    direction: "ascending" as SortDescriptor["direction"],
  });

  const [page, setPage] = useState(1);

  const rankedUsers = leaderboard ?? [];

  const hasSearchFilter = Boolean(filterValue);
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") {
      return columns;
    }

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(rankedUsers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rankedUsers
      .filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      )
      .slice(start, end);
  }, [page, rankedUsers, rowsPerPage, filterValue]);

  const renderCell = useCallback(
    (userRank: UserRank, columnKey: keyof UserRank) => {
      const cellValue = userRank[columnKey];
      switch (columnKey) {
        case "rank":
          return (
            <div className="flex items-center">
              {userRank.rank === 1 && (
                <FaMedal className="mr-1 text-yellow-600" />
              )}
              {userRank.rank === 2 && (
                <FaMedal className="mr-1 text-gray-700" />
              )}
              {userRank.rank === 3 && (
                <FaMedal className="mr-1 text-brown-500" />
              )}
              {userRank.rank}
            </div>
          );
        case "developer":
          return (
            <Link
              isExternal
              href={`https://awesome-gh-insights.vercel.app/devs/${userRank.username}`}
            >
              <User
                avatarProps={{ radius: "lg", src: userRank.avatar }}
                description={userRank.username}
                className="text-green-400"
                name={userRank.username}
              />
            </Link>
          );
        case "streak":
          return (
            <div className="flex flex-col">
              <p className="capitalize text-bold text-small">
                {userRank.currentStreak.count}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback(
    (value: React.ChangeEvent<HTMLSelectElement>["target"]["value"]) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    []
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3 ">
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
            Total users {rankedUsers.length}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    rankedUsers,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
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
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            color="success"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      className="p-4 md:p-10 xl:p-24"
      color="success"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // @ts-expect-error TODO: Fix, add types
      onSelectionChange={setSelectedKeys}
      // @ts-expect-error TODO: Fix, add types
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={"start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={items}>
        {(item) => (
          <TableRow key={item.rank}>
            {(columnKey) => (
              // @ts-expect-error TODO: Fix
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;
