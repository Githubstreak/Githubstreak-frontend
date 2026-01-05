import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getMyActivePledge,
  getCompletedPledges,
  createPledge,
  completePledge,
  cancelPledge,
  getPledgeTemplates,
  useStreakFreeze as streakFreezeAPI,
} from "../APIs/PledgesAPI";

// Default templates (fallback if API doesn't provide them) - defined outside hook
const DEFAULT_PLEDGE_TEMPLATES = [
  {
    id: "7-day",
    name: "Week Warrior",
    days: 7,
    icon: "⚡",
    description: "Complete a 7-day streak",
    reward: "Week Warrior badge",
    xpBonus: 100,
  },
  {
    id: "30-day",
    name: "Monthly Master",
    days: 30,
    icon: "🏆",
    description: "Commit every day for a month",
    reward: "Monthly Master badge + Freeze Token",
    xpBonus: 500,
  },
  {
    id: "100-day",
    name: "Century Legend",
    days: 100,
    icon: "💯",
    description: "Reach a 100-day streak",
    reward: "Century badge + Profile flair",
    xpBonus: 2000,
  },
  {
    id: "365-day",
    name: "Yearly Champion",
    days: 365,
    icon: "👑",
    description: "One full year of daily commits",
    reward: "Yearly Champion title + All badges",
    xpBonus: 10000,
  },
];

/**
 * usePledges - Hook for managing pledges data
 *
 * Provides:
 * - activePledge: User's current active pledge
 * - completedPledges: User's completed pledges
 * - templates: Available pledge templates
 * - Loading and error states
 * - CRUD operations
 */
export const usePledges = (currentStreak = 0) => {
  const [activePledge, setActivePledge] = useState(null);
  const [completedPledges, setCompletedPledges] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [freezeTokens, setFreezeTokens] = useState(0);

  // Memoized default templates reference
  const defaultTemplates = useMemo(() => DEFAULT_PLEDGE_TEMPLATES, []);

  // Fetch active pledge
  const fetchActivePledge = useCallback(async () => {
    try {
      const data = await getMyActivePledge();
      setActivePledge(data);
      if (data?.freezeTokens !== undefined) {
        setFreezeTokens(data.freezeTokens);
      }
      return data;
    } catch (err) {
      console.error("Failed to fetch active pledge:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // Fetch completed pledges
  const fetchCompletedPledges = useCallback(async () => {
    try {
      const data = await getCompletedPledges();
      setCompletedPledges(data.pledges || []);
      return data;
    } catch (err) {
      console.error("Failed to fetch completed pledges:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // Fetch pledge templates
  const fetchTemplates = useCallback(async () => {
    try {
      const data = await getPledgeTemplates();
      setTemplates(data.templates || defaultTemplates);
      return data;
    } catch (err) {
      // Use default templates if API fails
      setTemplates(defaultTemplates);
      return { templates: defaultTemplates };
    }
  }, [defaultTemplates]);

  // Create a new pledge
  const handleCreatePledge = useCallback(
    async (templateId) => {
      try {
        setLoading(true);
        const template =
          templates.find((t) => t.id === templateId) ||
          defaultTemplates.find((t) => t.id === templateId);

        const newPledge = await createPledge({
          templateId,
          startingStreak: currentStreak,
          targetDays: template?.days || 7,
        });

        setActivePledge(newPledge);
        return newPledge;
      } catch (err) {
        console.error("Failed to create pledge:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [templates, currentStreak, defaultTemplates]
  );

  // Complete a pledge and claim rewards
  const handleCompletePledge = useCallback(
    async (pledgeId) => {
      try {
        setLoading(true);
        const result = await completePledge(pledgeId);

        // Move to completed pledges
        if (activePledge) {
          setCompletedPledges((prev) => [
            ...prev,
            { ...activePledge, completedAt: new Date().toISOString() },
          ]);
        }
        setActivePledge(null);

        return result;
      } catch (err) {
        console.error("Failed to complete pledge:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [activePledge]
  );

  // Cancel a pledge
  const handleCancelPledge = useCallback(async (pledgeId) => {
    try {
      setLoading(true);
      await cancelPledge(pledgeId);
      setActivePledge(null);
      return true;
    } catch (err) {
      console.error("Failed to cancel pledge:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Use a streak freeze token
  const handleUseFreeze = useCallback(async () => {
    if (freezeTokens <= 0) {
      setError("No freeze tokens available");
      return false;
    }

    try {
      setLoading(true);
      await streakFreezeAPI();
      setFreezeTokens((prev) => prev - 1);
      return true;
    } catch (err) {
      console.error("Failed to use streak freeze:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [freezeTokens]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchActivePledge(),
          fetchCompletedPledges(),
          fetchTemplates(),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchActivePledge, fetchCompletedPledges, fetchTemplates]);

  // Calculate progress
  const pledgeProgress = activePledge
    ? Math.min((currentStreak / activePledge.days) * 100, 100)
    : 0;

  const daysRemaining = activePledge
    ? Math.max(activePledge.days - currentStreak, 0)
    : 0;

  const isPledgeComplete = activePledge && currentStreak >= activePledge.days;

  return {
    // Data
    activePledge,
    completedPledges,
    templates: templates.length > 0 ? templates : defaultTemplates,
    freezeTokens,

    // Computed
    pledgeProgress,
    daysRemaining,
    isPledgeComplete,

    // State
    loading,
    error,

    // Actions
    fetchActivePledge,
    fetchCompletedPledges,
    createPledge: handleCreatePledge,
    completePledge: handleCompletePledge,
    cancelPledge: handleCancelPledge,
    useFreeze: handleUseFreeze,

    // Clear error
    clearError: () => setError(null),
  };
};

export default usePledges;
