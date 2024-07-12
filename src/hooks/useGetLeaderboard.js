import { useEffect, useState } from "react";
import axios from "axios";

const useGetLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState();

  const getLeaderboard = async () => {
    // Don't refetch if board is already present
    if (leaderboard) return;

    try {
      setIsLoading(true);

      const response = await axios.get(
        "http://localhost:3001/v1/users/leaderboard",
      );

      setLeaderboard(response.data);
    } catch (e) {
      //TODO: Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return {
    isLoading,
    leaderboard,
    topThree: leaderboard ? leaderboard.slice(0, 3) : [],
  };
};

export default useGetLeaderboard;
