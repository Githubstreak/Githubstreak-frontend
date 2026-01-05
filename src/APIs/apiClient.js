import axios from "axios";

/**
 * API Base URL
 * Uses environment-based URL for development/production
 */
export const API_BASE = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://api.ggithubstreak.com";

/**
 * Store the current user ID for API requests
 */
let currentUserId = null;

/**
 * Axios instance with default configuration
 * This instance should be used for all API calls
 */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Set the authentication token and user ID for API requests
 * Call this after the user signs in via Clerk
 *
 * @param {string|null} token - The Clerk session token
 * @param {string|null} userId - The Clerk user ID
 */
export const setAuthToken = (token, userId = null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
  currentUserId = userId;
};

/**
 * Get the current user ID
 */
export const getCurrentUserId = () => currentUserId;

/**
 * Request interceptor for logging and adding timestamps
 */
api.interceptors.request.use(
  (config) => {
    // Add timestamp for cache busting if needed
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Add userId to request body for POST/PUT/PATCH if not already present
    if (currentUserId && ["post", "put", "patch"].includes(config.method)) {
      if (
        config.data &&
        typeof config.data === "object" &&
        !config.data.userId
      ) {
        config.data = { ...config.data, userId: currentUserId };
      }
    }

    // Add userId to query params for GET/DELETE if not already present
    if (currentUserId && ["get", "delete"].includes(config.method)) {
      if (!config.params?.userId) {
        config.params = { ...config.params, userId: currentUserId };
      }
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - Please sign in again");
          // Could trigger a re-auth flow here
          break;
        case 403:
          console.error("Forbidden - You don't have permission");
          break;
        case 404:
          // Not found is often expected (e.g., no active pledge)
          break;
        case 500:
          console.error("Server error - Please try again later");
          break;
        default:
          console.error(`API Error: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error("Network error - Please check your connection");
    }
    return Promise.reject(error);
  }
);

export default api;
