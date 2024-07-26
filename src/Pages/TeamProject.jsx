import React, { useState, useEffect } from 'react';
import 'animate.css';
import ReactPaginate from 'react-paginate';

const TeamProject = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/team-projects'); // Replace with your actual API endpoint
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching team projects:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = projects.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white-900">Team Projects</h1>
        <p className="mt-4 text-lg text-gray-500">Explore various team projects and their details.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInUp hover:animate__pulse transition-transform duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{project.projectName}</h2>
              <p className="mt-2 text-sm font-medium text-gray-600">{project.type}</p>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <div className="mt-4">
                {project.developers.map((dev) => (
                  <div key={dev.id} className="mt-4 flex items-center space-x-4">
                    <img
                      src={`https://github.com/${dev.username}.png`}
                      alt={`${dev.name}'s avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{dev.name}</p>
                      <p className="text-sm text-gray-500">{dev.role}</p>
                      <a
                        href={`https://github.com/${dev.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View GitHub Profile
                      </a>
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${dev.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{dev.progress}% complete</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          className="flex justify-center space-x-2"
          pageClassName="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
          active ClassName="bg-blue-500 text-white"
        />
      </div>
    </div>
  );
};

export default TeamProject;
