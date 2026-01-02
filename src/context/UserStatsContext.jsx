import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../utils/constants";
import { transformUserStats } from "../utils/transforms";

const UserStatsContext = createContext(null);

/**
 * Provider that fetches and shares user stats across all components.
 * Prevents duplicate API calls when multiple components need user data.
 */
export const UserStatsProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [rawStats, setRawStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchUserStats = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/v1/users/stat?id=${user.id}`);
      setRawStats(res.data);
      setLastFetched(new Date());
    } catch (err) {
      console.error("Error fetching user stats:", err);
      setError("Failed to load your stats");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserStats();
    }
  }, [user, isLoaded, fetchUserStats]);

  // Transform raw backend data to stable frontend shape
  const userStats = useMemo(() => {
    if (!rawStats) return null;
    return transformUserStats(rawStats);
  }, [rawStats]);

  // Calculate streak status based on last contribution
  const streakStatus = useMemo(() => {
    if (!userStats?.lastContributionDate) return null;

    const lastContrib = new Date(userStats.lastContributionDate);
    const now = new Date();

    // Use UTC for consistent comparison with backend
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const yesterdayUTC = new Date(todayUTC);
    yesterdayUTC.setUTCDate(yesterdayUTC.getUTCDate() - 1);

    const lastContribDateUTC = new Date(
      Date.UTC(
        lastContrib.getUTCFullYear(),
        lastContrib.getUTCMonth(),
        lastContrib.getUTCDate()
      )
    );

    if (lastContribDateUTC.getTime() === todayUTC.getTime()) {
      return "today"; // Committed today - streak safe
    } else if (lastContribDateUTC.getTime() === yesterdayUTC.getTime()) {
      return "pending"; // Committed yesterday - needs to commit today
    } else {
      return "broken"; // Streak is broken
    }
  }, [userStats?.lastContributionDate]);

  // Calculate time until streak resets (midnight UTC)
  const timeUntilReset = useMemo(() => {
    const now = new Date();
    const midnightUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1, // Next day
        0,
        0,
        0 // Midnight
      )
    );

    const msUntilReset = midnightUTC.getTime() - now.getTime();
    const hours = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes, msUntilReset };
  }, []);

  const value = useMemo(
    () => ({
      user,
      userStats,
      isLoading,
      error,
      isSignedIn: !!user,
      streakStatus,
      timeUntilReset,
      lastFetched,
      refetch: fetchUserStats,
    }),
    [
      user,
      userStats,
      isLoading,
      error,
      streakStatus,
      timeUntilReset,
      lastFetched,
      fetchUserStats,
    ]
  );

  return (
    <UserStatsContext.Provider value={value}>
      {children}
    </UserStatsContext.Provider>
  );
};

/**
 * Hook to access user stats from context.
 * Must be used within UserStatsProvider.
 */
export const useUserStats = () => {
  const context = useContext(UserStatsContext);
  if (context === null) {
    throw new Error("useUserStats must be used within a UserStatsProvider");
  }
  return context;
};

export default UserStatsContext;
