export type Streak = {
  count: number;
  range: string;
};

// TODO: Review this type, should developer and streak be there?
export type UserRank = {
  rank: number;
  username: string;
  contributions: number;
  avatar: string;
  currentStreak: Streak;
  developer?: string;
  streak?: string;
};

export type Leaderboard = UserRank[];
