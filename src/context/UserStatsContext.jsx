import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import api, { setAuthToken } from "../APIs/apiClient";
import { transformUserStats } from "../utils/transforms";

const UserStatsContext = createContext(null);

/**
 * Provider that fetches and shares user stats across all components.
 * Prevents duplicate API calls when multiple components need user data.
 */
export const UserStatsProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [rawStats, setRawStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Set auth token for API requests when user is loaded
  useEffect(() => {
    const setupAuth = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken();
          setAuthToken(token, user.id);
          setIsAuthReady(true);
        } catch (err) {
          console.error("Failed to get auth token:", err);
          setAuthToken(null, null);
          // Don't set isAuthReady to false on error to prevent flash
        }
      } else if (isLoaded && !user) {
        // Only clear auth when we're certain user is not signed in
        setAuthToken(null, null);
        setIsAuthReady(false);
      }
      // If not loaded yet, keep previous state to prevent flash
    };
    setupAuth();
  }, [isLoaded, user, getToken]);

  const fetchUserStats = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      // userId is automatically added by apiClient interceptor
      const res = await api.get("/v1/users/stat");
      setRawStats(res.data);
      setLastFetched(new Date());
    } catch (err) {
      console.error("Error fetching user stats:", err);
      setError("Failed to load your stats");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Only fetch stats after auth is ready to avoid race condition
  useEffect(() => {
    if (isLoaded && user && isAuthReady) {
      fetchUserStats();
    }
  }, [user, isLoaded, isAuthReady, fetchUserStats]);

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

UserStatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
