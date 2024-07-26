import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'animate.css'; // Import Animate.css for animations

function SoloProject() {
  const [projects, setProjects] = useState([]);
  const itemsPerPage = 6; // Number of projects per page
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch solo projects from your API
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/solo-projects'); // Replace with your actual API endpoint
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching solo projects:', error);
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
        <h1 className="text-3xl font-extrabold text-white-900">Solo Projects</h1>
        <p className="mt-4 text-lg text-gray-500">Explore various solo projects and their details.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInUp hover:animate__pulse transition-transform duration-300 transform hover:scale-105"
          >
            <div className="p-6 text-center">
              <img
                src={`https://github.com/${project.username}.png`}
                alt={`${project.developer}'s avatar`}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="mt-2 text-lg font-semibold text-gray-800">{project.developer}</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{project.projectName}</h2>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                View GitHub Profile
              </a>
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
          containerClassName={"pagination flex justify-center space-x-2"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active bg-blue-500 text-white"}
          pageClassName="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SoloProject;
