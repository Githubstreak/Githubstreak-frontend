import axios from "axios";

const API_BASE = "https://api.ggithubstreak.com";

/**
 * Badges & Embed API Service
 * Handles badges, achievements, and embeddable profile cards
 */

// Get all badges for a user
export const getUserBadges = async (username) => {
  try {
    const response = await axios.get(`${API_BASE}/v1/badges/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user badges:", error);
    throw error;
  }
};

// Get my badges (authenticated)
export const getMyBadges = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/badges/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my badges:", error);
    throw error;
  }
};

// Get embeddable profile card data
export const getEmbedData = async (username, theme = "dark") => {
  try {
    const response = await axios.get(`${API_BASE}/v1/embed/${username}`, {
      params: { theme },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching embed data:", error);
    throw error;
  }
};

// Get embed SVG URL
export const getEmbedSVGUrl = (username, theme = "dark") => {
  return `${API_BASE}/v1/embed/${username}/svg?theme=${theme}`;
};

// Get embed PNG URL
export const getEmbedPNGUrl = (username, theme = "dark") => {
  return `${API_BASE}/v1/embed/${username}/png?theme=${theme}`;
};

// Get all available badge types
export const getBadgeTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/v1/badges/types`);
    return response.data;
  } catch (error) {
    console.error("Error fetching badge types:", error);
    throw error;
  }
};

// Check for new unlocked badges
export const checkNewBadges = async () => {
  try {
    const response = await axios.post(`${API_BASE}/v1/badges/check`);
    return response.data;
  } catch (error) {
    console.error("Error checking for new badges:", error);
    throw error;
  }
};

// Claim a badge reward
export const claimBadge = async (badgeId) => {
  try {
    const response = await axios.post(`${API_BASE}/v1/badges/${badgeId}/claim`);
    return response.data;
  } catch (error) {
    console.error("Error claiming badge:", error);
    throw error;
  }
};
