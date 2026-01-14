import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { transformLeaderboard } from "../utils/transforms";

const useGetLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState(null);
  const [error, setError] = useState(null);
  const { user: currentUser, isLoaded } = useUser();

  const getLeaderboard = useCallback(
    async (forceRefresh = false) => {
      // Don't refetch if board is already present (unless forced)
      if (leaderboard && !forceRefresh) return;

      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("https://api.ggithubstreak.com/v1/leaderboard");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Leaderboard API response:", data);
        if (Array.isArray(data)) {
          const transformedData = transformLeaderboard(data);
          setLeaderboard(transformedData);
        } else {
          throw new Error("Invalid leaderboard data");
        }
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
