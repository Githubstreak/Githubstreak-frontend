import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const ProjectIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/project-ideas'); // Replace with your actual API endpoint
      const data = await response.json();
      setIdeas(data);
    } catch (error) {
      console.error('Error fetching project ideas:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = ideas.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(ideas.length / itemsPerPage);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white-900">Project Ideas</h1>
        <p className="mt-4 text-lg text-gray-500">Explore various project ideas and their current status.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInUp hover:animate__pulse transition-transform duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <p className="mt-2 text-gray-500"><strong>Client:</strong> {project.client}</p>
              <p className={`mt-4 text-lg font-semibold ${
                project.status === "In Progress" ? "text-yellow-500" : 
                project.status === "Done" ? "text-green-500" : 
                "text-gray-500"
              }`}>
                Status: {project.status}
              </p>
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

export default ProjectIdea;
