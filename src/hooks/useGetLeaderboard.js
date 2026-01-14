import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { transformLeaderboard } from "../utils/transforms";

const useGetLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState(null);
  const [error, setError] = useState(null);
  const { user: currentUser, isLoaded } = useUser();
  const { getToken } = useAuth();

  const getLeaderboard = useCallback(
    async (forceRefresh = false) => {
      // Don't refetch if board is already present (unless forced)
      if (leaderboard && !forceRefresh) return;

      try {
        setIsLoading(true);
        setError(null);

        // Mock data for testing
        const mockData = [
          {
            username: "testuser1",
            avatar: "https://github.com/images/error/testuser1_happy.gif",
            rank: 1,
            contributions: 1500,
            currentStreak: { count: 50 },
          },
          {
            username: "testuser2",
            avatar: "https://github.com/images/error/testuser2_happy.gif",
            rank: 2,
            contributions: 1200,
            currentStreak: { count: 40 },
          },
          {
            username: "testuser3",
            avatar: "https://github.com/images/error/testuser3_happy.gif",
            rank: 3,
            contributions: 1000,
            currentStreak: { count: 30 },
          },
        ];

        const transformedData = transformLeaderboard(mockData);
        setLeaderboard(transformedData);
      } catch (e) {
        console.error("Error fetching leaderboard:", e);
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [leaderboard, currentUser]
  );

  useEffect(() => {
    if (isLoaded) {
      getLeaderboard();
    }
  }, [isLoaded]);

  return {
    isLoading,
    leaderboard,
    error,
    topThree: leaderboard ? leaderboard.slice(0, 3) : [],
    refetch: () => getLeaderboard(true),
  };
};

export default useGetLeaderboard;
