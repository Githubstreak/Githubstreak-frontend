import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { transformLeaderboard } from "../utils/transforms";

const useGetLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState(null);
  const [error, setError] = useState(null);

  const getLeaderboard = useCallback(
    async (forceRefresh = false) => {
      // Don't refetch if board is already present (unless forced)
      if (leaderboard && !forceRefresh) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/v1/users/leaderboard`);

        // Transform and sort using centralized transform layer
        const transformedData = transformLeaderboard(response.data);

        setLeaderboard(transformedData);
      } catch (e) {
        console.error("Error fetching leaderboard:", e);
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [leaderboard]
  );

  useEffect(() => {
    getLeaderboard();
  }, []);

  return {
    isLoading,
    leaderboard,
    error,
    topThree: leaderboard ? leaderboard.slice(0, 3) : [],
    refetch: () => getLeaderboard(true),
  };
};

export default useGetLeaderboard;
