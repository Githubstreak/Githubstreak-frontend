import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaPlus,
  FaSearch,
  FaFilter,
  FaExternalLinkAlt,
  FaHandsHelping,
  FaSpinner,
  FaExclamationCircle,
  FaTimes,
  FaCode,
  FaRocket,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import Nav from "../components/Nav";
import { getProjects, submitProject } from "../APIs/ProjectsAPI";

/**
 * Projects Page - Community Project Showcase
 *
 * Features:
 * - Browse community open-source projects
 * - Filter by language, looking for contributors
 * - Submit your own projects
 * - GitHub integration for stats
 */

// Language colors for badges
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  React: "#61dafb",
  default: "#6e7681",
};

// Project Card Component
const ProjectCard = ({ project, onViewDetails }) => {
  const langColor = languageColors[project.language] || languageColors.default;

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700 p-5 hover:border-green-500/50 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={
              project.ownerAvatar || `https://github.com/${project.owner}.png`
            }
            alt={project.owner}
            className="w-10 h-10 rounded-full border-2 border-slate-700"
          />
          <div>
            <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-400 text-xs">by {project.owner}</p>
          </div>
        </div>
        {project.lookingForContributors && (
          <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
            <FaHandsHelping className="text-[10px]" />
            <span>Help Wanted</span>
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {project.description || "No description provided"}
      </p>

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-slate-700/50 text-gray-300 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 bg-slate-700/50 text-gray-400 text-xs rounded-md">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-gray-400">
          <FaStar className="text-yellow-500 text-xs" />
          <span>{project.stars?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <FaCodeBranch className="text-gray-500 text-xs" />
          <span>{project.forks?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <FaEye className="text-gray-500 text-xs" />
          <span>{project.watchers?.toLocaleString() || 0}</span>
        </div>
        {project.language && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            <span>{project.language}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href={
            project.repoUrl ||
            `https://github.com/${project.owner}/${project.name}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
        >
          <FaGithub />
          View Repo
        </a>
        <button
          onClick={() => onViewDetails(project)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FaExternalLinkAlt className="text-xs" />
          Details
        </button>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Submit Project Modal
const SubmitProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [lookingForContributors, setLookingForContributors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    // Validate GitHub URL
    const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
    if (!githubUrlPattern.test(repoUrl.trim())) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit({
        repoUrl: repoUrl.trim(),
        description: description.trim(),
        techStack: techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        lookingForContributors,
      });
      onClose();
      // Reset form
      setRepoUrl("");
      setDescription("");
      setTechStack("");
      setLookingForContributors(false);
    } catch (err) {
      setError(err.message || "Failed to submit project");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaRocket className="text-green-400" />
            Submit Your Project
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
            <FaExclamationCircle className="text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* GitHub URL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              GitHub Repository URL *
            </label>
            <div className="relative">
              <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Why should people check this out?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share what makes your project special..."
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Tech Stack (comma separated)
            </label>
            <div className="relative">
              <FaCode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="React, Node.js, MongoDB..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* Looking for Contributors */}
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaHandsHelping className="text-purple-400" />
              <div>
                <p className="text-white text-sm">Looking for contributors?</p>
                <p className="text-gray-500 text-xs">
                  Get a badge to attract helpers
                </p>
              </div>
            </div>
            <button
              onClick={() => setLookingForContributors(!lookingForContributors)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                lookingForContributors ? "bg-purple-600" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  lookingForContributors ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !repoUrl.trim()}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FaRocket />
                Submit Project
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

SubmitProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// Project Details Modal
const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const langColor = languageColors[project.language] || languageColors.default;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={
                project.ownerAvatar || `https://github.com/${project.owner}.png`
              }
              alt={project.owner}
              className="w-16 h-16 rounded-xl border-2 border-slate-700"
            />
            <div>
              <h3 className="text-2xl font-bold text-white">{project.name}</h3>
              <p className="text-gray-400">by {project.owner}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.lookingForContributors && (
            <span className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-400 text-sm rounded-full">
              <FaHandsHelping />
              Looking for Contributors
            </span>
          )}
          {project.language && (
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full"
              style={{ backgroundColor: `${langColor}20`, color: langColor }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {project.language}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            About
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {project.description || "No description provided"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <FaStar className="text-yellow-500 text-xl mx-auto mb-2" />
            <p className="text-xl font-bold text-white">
              {project.stars?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-400">Stars</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <FaCodeBranch className="text-green-400 text-xl mx-auto mb-2" />
            <p className="text-xl font-bold text-white">
              {project.forks?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-400">Forks</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <FaEye className="text-blue-400 text-xl mx-auto mb-2" />
            <p className="text-xl font-bold text-white">
              {project.watchers?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-400">Watchers</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <FaUsers className="text-purple-400 text-xl mx-auto mb-2" />
            <p className="text-xl font-bold text-white">
              {project.contributors || 0}
            </p>
            <p className="text-xs text-gray-400">Contributors</p>
          </div>
        </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-700 text-gray-300 text-sm rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm rounded-lg"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={
              project.repoUrl ||
              `https://github.com/${project.owner}/${project.name}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
          >
            <FaGithub className="text-lg" />
            View on GitHub
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors"
            >
              <FaExternalLinkAlt />
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProjectDetailsModal.propTypes = {
  project: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Filter languages list
const POPULAR_LANGUAGES = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C++",
  "Ruby",
  "PHP",
];

// Main Projects Component
const Project = () => {
  const { isSignedIn } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [showContributorsOnly, setShowContributorsOnly] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjectsData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (selectedLanguage !== "All") {
          params.language = selectedLanguage;
        }
        if (showContributorsOnly) {
          params.lookingForContributors = true;
        }
        if (searchQuery) {
          params.search = searchQuery;
        }

        const response = await getProjects(params);
        setProjects(response.projects || response || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, [selectedLanguage, showContributorsOnly, searchQuery]);

  // Projects are now filtered on the backend, so we just use the returned list
  const filteredProjects = projects;

  const handleSubmitProject = async (projectData) => {
    const newProject = await submitProject(projectData);
    setProjects([newProject, ...projects]);
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <FaRocket className="text-green-500" />
                Community Projects
              </h1>
              <p className="text-gray-400 mt-1">
                Discover and contribute to amazing open-source projects
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {isSignedIn && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors"
                >
                  <FaPlus />
                  Submit Project
                </button>
              )}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, tech stack, or owners..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-xl transition-colors"
              >
                <FaFilter />
                Filters
              </button>

              {/* Filters (Desktop always visible, Mobile toggle) */}
              <div
                className={`${
                  showFilters ? "flex" : "hidden"
                } lg:flex flex-col lg:flex-row gap-4`}
              >
                {/* Language Filter */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 cursor-pointer"
                >
                  {POPULAR_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === "All" ? "All Languages" : lang}
                    </option>
                  ))}
                </select>

                {/* Contributors Filter */}
                <button
                  onClick={() => setShowContributorsOnly(!showContributorsOnly)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                    showContributorsOnly
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  <FaHandsHelping />
                  <span className="whitespace-nowrap">Help Wanted</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              {loading
                ? "Loading projects..."
                : `${filteredProjects.length} project${
                    filteredProjects.length !== 1 ? "s" : ""
                  } found`}
            </p>
            {(searchQuery ||
              selectedLanguage !== "All" ||
              showContributorsOnly) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLanguage("All");
                  setShowContributorsOnly(false);
                }}
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8 text-center mb-8">
              <FaExclamationCircle className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <FaSpinner className="text-4xl text-green-500 animate-spin" />
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={setSelectedProject}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center">
                  <FaCode className="text-5xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery ||
                    selectedLanguage !== "All" ||
                    showContributorsOnly
                      ? "Try adjusting your filters"
                      : "Be the first to submit a project!"}
                  </p>
                  {isSignedIn && (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors"
                    >
                      <FaPlus />
                      Submit Your Project
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          {!loading && filteredProjects.length > 0 && isSignedIn && (
            <div className="mt-12 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl border border-green-500/30 p-8 text-center">
              <FaHeart className="text-4xl text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Have a project to share?
              </h3>
              <p className="text-gray-300 mb-6">
                Showcase your open-source work to the GitHubStreak community
              </p>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors"
              >
                <FaRocket />
                Submit Your Project
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <SubmitProjectModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmitProject}
      />
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Project;
