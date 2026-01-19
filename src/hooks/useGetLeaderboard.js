import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { transformLeaderboard } from "../utils/transforms";
import { API_BASE } from "../APIs/apiClient";

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

        const token = await getToken();
        const userIdParam = currentUser?.id ? `?userId=${currentUser.id}` : "";
        const res = await fetch(`${API_BASE}/v1/leaderboard${userIdParam}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Leaderboard API response:", data);
        if (Array.isArray(data)) {
          const transformedData = transformLeaderboard(data);
          setLeaderboard(transformedData);
        } else if (data && Array.isArray(data.data)) {
          const transformedData = transformLeaderboard(data.data);
          setLeaderboard(transformedData);
        } else if (data && Array.isArray(data.leaderboard)) {
          const transformedData = transformLeaderboard(data.leaderboard);
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
    [leaderboard, currentUser],
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
