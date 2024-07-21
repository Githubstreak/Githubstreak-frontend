export type Streak = {
  count: number;
  range: string;
};

export type UserRank = {
  rank: number;
  username: string;
  contributions: number;
  avatar: string;
  currentStreak: Streak;
};

export type Leaderboard = UserRank[];
