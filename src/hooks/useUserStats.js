import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../utils/constants";

const useUserStats = () => {
  const { user, isLoaded } = useUser();
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/v1/users/stat?id=${user.id}`);
      setUserStats(res.data);
    } catch (err) {
      console.error("Error fetching user stats:", err);
      setError("Failed to load your stats");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserStats();
    }
  }, [user, isLoaded]);

  /**
   * Determines the streak status based on last contribution date
   * @returns 'today' | 'pending' | 'broken' | null
   */
  const getStreakStatus = () => {
    if (!userStats?.lastContributionDate) return null;

    const lastContrib = new Date(userStats.lastContributionDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastContribDate = new Date(
      lastContrib.getFullYear(),
      lastContrib.getMonth(),
      lastContrib.getDate()
    );

    if (lastContribDate.getTime() === today.getTime()) {
      return "today"; // Committed today - streak safe
    } else if (lastContribDate.getTime() === yesterday.getTime()) {
      return "pending"; // Committed yesterday - needs to commit today
    } else {
      return "broken"; // Streak is broken
    }
  };

  return {
    user,
    userStats,
    isLoading,
    error,
    isSignedIn: !!user,
    streakStatus: getStreakStatus(),
    refetch: fetchUserStats,
  };
};

export default useUserStats;
