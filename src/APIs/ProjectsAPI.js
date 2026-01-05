import api from "./apiClient";

/**
 * Projects API Service
 * Handles all project-related API calls
 */

/**
 * Get all projects with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @param {string} params.language - Filter by language
 * @param {boolean} params.lookingForContributors - Filter projects seeking contributors
 * @param {string} params.search - Search query
 */
export const getProjects = async (params = {}) => {
  const response = await api.get("/v1/projects", { params });
  return response.data;
};

/**
 * Get a single project by ID
 * @param {string} projectId - The project ID
 */
export const getProjectById = async (projectId) => {
  const response = await api.get(`/v1/projects/${projectId}`);
  return response.data;
};

/**
 * Submit a new project
 * @param {Object} projectData - Project data
 * @param {string} projectData.repoUrl - GitHub repository URL
 * @param {string} projectData.description - Custom description
 * @param {string[]} projectData.techStack - Array of technologies
 * @param {boolean} projectData.lookingForContributors - Seeking contributors flag
 */
export const submitProject = async (projectData) => {
  const response = await api.post("/v1/projects", projectData);
  return response.data;
};

/**
 * Update a project
 * @param {string} projectId - The project ID
 * @param {Object} updateData - Fields to update
 */
export const updateProject = async (projectId, updateData) => {
  const response = await api.put(`/v1/projects/${projectId}`, updateData);
  return response.data;
};

/**
 * Delete a project
 * @param {string} projectId - The project ID
 */
export const deleteProject = async (projectId) => {
  const response = await api.delete(`/v1/projects/${projectId}`);
  return response.data;
};

/**
 * Refresh project stats from GitHub
 * @param {string} projectId - The project ID
 */
export const refreshProjectStats = async (projectId) => {
  const response = await api.post(`/v1/projects/${projectId}/refresh`);
  return response.data;
};
