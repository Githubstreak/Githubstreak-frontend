import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Leaderboard } from "../types/leaderboard";

const useGetLeaderboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<
    Leaderboard | null | undefined
  >(undefined);

  const getLeaderboard = async () => {
    // Don't refetch if board is already present
    if (leaderboard) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get(`${API_URL}/v1/users/leaderboard`);

      if (response.status > 299) {
        throw new Error("Failed to fetch leaderboard");
      }

      setLeaderboard(response.data);
    } catch (e) {
      console.error(e);
      setLeaderboard(null);
      //TODO: Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => await getLeaderboard())();
  }, []);

  return {
    isLoading,
    leaderboard,
    topThree: leaderboard ? leaderboard.slice(0, 3) : [],
  };
};

export default useGetLeaderboard;
