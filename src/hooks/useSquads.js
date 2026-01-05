import { useState, useEffect, useCallback } from "react";
import {
  getMySquads,
  getPublicSquads,
  createSquad,
  joinSquad,
  leaveSquad,
  getSquadLeaderboard,
} from "../APIs/SquadsAPI";

/**
 * useSquads - Hook for managing squads data
 *
 * Provides:
 * - mySquads: User's squads
 * - publicSquads: Discoverable public squads
 * - squadLeaderboard: Top squads ranking
 * - Loading and error states
 * - CRUD operations
 */
export const useSquads = () => {
  const [mySquads, setMySquads] = useState([]);
  const [publicSquads, setPublicSquads] = useState([]);
  const [squadLeaderboard, setSquadLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's squads
  const fetchMySquads = useCallback(async () => {
    try {
      const data = await getMySquads();
      setMySquads(data.squads || []);
      return data;
    } catch (err) {
      console.error("Failed to fetch my squads:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // Fetch public squads for discovery
  const fetchPublicSquads = useCallback(async (page = 1) => {
    try {
      const data = await getPublicSquads(page);
      setPublicSquads(data.squads || []);
      return data;
    } catch (err) {
      console.error("Failed to fetch public squads:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // Fetch squad leaderboard
  const fetchLeaderboard = useCallback(async (page = 1) => {
    try {
      const data = await getSquadLeaderboard(page);
      setSquadLeaderboard(data.squads || []);
      return data;
    } catch (err) {
      console.error("Failed to fetch squad leaderboard:", err);
      setError(err.message);
      return null;
    }
  }, []);

  // Create a new squad
  const handleCreateSquad = useCallback(async (squadData) => {
    try {
      setLoading(true);
      const newSquad = await createSquad(squadData);
      setMySquads((prev) => [...prev, newSquad]);
      return newSquad;
    } catch (err) {
      console.error("Failed to create squad:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Join a squad with invite code
  const handleJoinSquad = useCallback(async (inviteCode) => {
    try {
      setLoading(true);
      const joinedSquad = await joinSquad(inviteCode);
      setMySquads((prev) => [...prev, joinedSquad]);
      // Remove from public squads if it was there
      setPublicSquads((prev) => prev.filter((s) => s.id !== joinedSquad.id));
      return joinedSquad;
    } catch (err) {
      console.error("Failed to join squad:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Leave a squad
  const handleLeaveSquad = useCallback(async (squadId) => {
    try {
      setLoading(true);
      await leaveSquad(squadId);
      setMySquads((prev) => prev.filter((s) => s.id !== squadId));
      return true;
    } catch (err) {
      console.error("Failed to leave squad:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMySquads(), fetchPublicSquads()]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchMySquads, fetchPublicSquads]);

  // Check if user is member of a squad
  const isUserMemberOf = useCallback(
    (squadId) => {
      return mySquads.some((squad) => squad.id === squadId);
    },
    [mySquads]
  );

  return {
    // Data
    mySquads,
    publicSquads,
    squadLeaderboard,

    // State
    loading,
    error,

    // Actions
    fetchMySquads,
    fetchPublicSquads,
    fetchLeaderboard,
    createSquad: handleCreateSquad,
    joinSquad: handleJoinSquad,
    leaveSquad: handleLeaveSquad,

    // Helpers
    isUserMemberOf,

    // Clear error
    clearError: () => setError(null),
  };
};

export default useSquads;
