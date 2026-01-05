import api from "./apiClient";

/**
 * Squads API Service
 * Handles all squad-related backend operations
 */

// Create a new squad
export const createSquad = async (squadData) => {
  try {
    const response = await api.post("/v1/squads", squadData);
    return response.data;
  } catch (error) {
    console.error("Error creating squad:", error);
    throw error;
  }
};

// Get squads for the authenticated user
export const getMySquads = async () => {
  try {
    const response = await api.get("/v1/squads/my");
    return response.data;
  } catch (error) {
    console.error("Error fetching my squads:", error);
    throw error;
  }
};

// Get public squads for discovery
export const getPublicSquads = async (page = 1, limit = 20) => {
  try {
    const response = await api.get("/v1/squads/public", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public squads:", error);
    throw error;
  }
};

// Get a specific squad by ID
export const getSquadById = async (squadId) => {
  try {
    const response = await api.get(`/v1/squads/${squadId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching squad:", error);
    throw error;
  }
};

// Join a squad with invite code
export const joinSquad = async (inviteCode) => {
  try {
    const response = await api.post("/v1/squads/join", {
      inviteCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error joining squad:", error);
    throw error;
  }
};

// Leave a squad
export const leaveSquad = async (squadId) => {
  try {
    const response = await api.delete(`/v1/squads/${squadId}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error leaving squad:", error);
    throw error;
  }
};

// Get squad leaderboard
export const getSquadLeaderboard = async (page = 1, limit = 20) => {
  try {
    const response = await api.get("/v1/squads/leaderboard", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching squad leaderboard:", error);
    throw error;
  }
};

// Update squad settings (for leaders only)
export const updateSquad = async (squadId, updateData) => {
  try {
    const response = await api.patch(`/v1/squads/${squadId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating squad:", error);
    throw error;
  }
};

// Generate new invite code (for leaders only)
export const regenerateInviteCode = async (squadId) => {
  try {
    const response = await api.post(`/v1/squads/${squadId}/regenerate-code`);
    return response.data;
  } catch (error) {
    console.error("Error regenerating invite code:", error);
    throw error;
  }
};
