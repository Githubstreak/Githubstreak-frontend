import axios from "axios";

const API_BASE = "https://api.ggithubstreak.com";

/**
 * Pledges API Service
 * Handles all pledge-related backend operations
 */

// Create a new pledge
export const createPledge = async (pledgeData) => {
  try {
    const response = await axios.post(`${API_BASE}/v1/pledges`, pledgeData);
    return response.data;
  } catch (error) {
    console.error("Error creating pledge:", error);
    throw error;
  }
};

// Get active pledge for the authenticated user
export const getMyActivePledge = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/pledges/active`);
    return response.data;
  } catch (error) {
    // 404 means no active pledge - not an error
    if (error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching active pledge:", error);
    throw error;
  }
};

// Get completed pledges for the authenticated user
export const getCompletedPledges = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/pledges/completed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching completed pledges:", error);
    throw error;
  }
};

// Get all pledges for the authenticated user (active + completed)
export const getAllMyPledges = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/pledges/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my pledges:", error);
    throw error;
  }
};

// Complete a pledge and claim rewards
export const completePledge = async (pledgeId) => {
  try {
    const response = await axios.post(
      `${API_BASE}/v1/pledges/${pledgeId}/complete`
    );
    return response.data;
  } catch (error) {
    console.error("Error completing pledge:", error);
    throw error;
  }
};

// Cancel an active pledge
export const cancelPledge = async (pledgeId) => {
  try {
    const response = await axios.delete(`${API_BASE}/v1/pledges/${pledgeId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling pledge:", error);
    throw error;
  }
};

// Get public pledges feed (community pledges)
export const getPublicPledges = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE}/v1/pledges/public`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public pledges:", error);
    throw error;
  }
};

// Get pledge templates/presets
export const getPledgeTemplates = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/pledges/templates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pledge templates:", error);
    throw error;
  }
};

// Use a streak freeze token
export const useStreakFreeze = async () => {
  try {
    const response = await axios.post(`${API_BASE}/v1/pledges/freeze`);
    return response.data;
  } catch (error) {
    console.error("Error using streak freeze:", error);
    throw error;
  }
};
