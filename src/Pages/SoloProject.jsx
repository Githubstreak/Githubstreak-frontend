import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function SoloProject() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [newProject, setNewProject] = useState({ title: '', description: '', progress: 0 });
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/solo-projects');
      const data = await response.json();
      // Add a 'watchersCount' and 'isWatching' property to each project
      const projectsWithWatchers = data.map((project) => ({
        ...project,
        watchersCount: project.watchersCount || 0,
        isWatching: false,
      }));
      setProjects(projectsWithWatchers);
    } catch (error) {
      console.error('Error fetching solo projects:', error);
    }
  };

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleAddProject = () => setShowModal(true);

  const handleSaveProject = () => {
    setProjects([...projects, { ...newProject, id: projects.length + 1, watchersCount: 0, isWatching: false }]);
    setShowModal(false);
    setNewProject({ title: '', description: '', progress: 0 });
  };

  const toggleWatch = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const newWatchersCount = project.isWatching ? project.watchersCount - 1 : project.watchersCount + 1;
          return { ...project, isWatching: !project.isWatching, watchersCount: newWatchersCount };
        }
        return project;
      })
    );
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = projects.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white-900">Solo Projects</h1>
        <button
          onClick={handleAddProject}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Project
        </button>
      </div>

      {/* Modal for Adding New Project */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <button
              onClick={handleSaveProject}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Project
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            onClick={() => window.location.href = `/project/${project.id}`} // Navigate to project detail
          >
            <div className="p-6 flex items-center space-x-4">
              {/* GitHub Profile Picture on the Left */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://github.com/${project.username}.png`}
                  alt={`${project.developer}'s avatar`}
                  className="w-16 h-16 rounded-full hover:opacity-80 transition-opacity"
                />
              </a>

              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                <p className="mt-2 text-gray-600">{project.description}</p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{project.progress}% complete</p>
                </div>
              </div>

              {/* Watching Feature */}
              <div className="ml-auto text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents card click
                    toggleWatch(project.id);
                  }}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={project.isWatching ? "blue" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.32 4.32a2 2 0 01-2.83 2.83l-.47-.47m-7.58-7.58a5.979 5.979 0 00-1.68 4.24 6 6 0 0010.35 4.24M3 3l18 18"
                    />
                  </svg>
                </button>
                <p className="text-sm text-gray-500">{project.watchersCount} watching</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center space-x-2 mt-8"}
        activeClassName={"active bg-blue-500 text-white"}
      />
    </div>
  );
}

export default SoloProject;
