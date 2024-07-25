import React, { useState } from 'react';
import 'animate.css';
import ReactPaginate from 'react-paginate';

const projectIdeas = [
  {
    id: 1,
    name: "E-Waste Management System",
    description: "A platform to manage and recycle electronic waste efficiently.",
    client: "Environmental Agencies",
    status: "In Progress"
  },
  {
    id: 2,
    name: "Online Learning Platform",
    description: "An interactive platform for online courses and learning resources.",
    client: "Educational Institutions",
    status: "Completed"
  },
  {
    id: 3,
    name: "Freelance Job Portal",
    description: "A website connecting freelancers with clients looking for various services.",
    client: "Small Businesses",
    status: "In Progress"
  },
  {
    id: 4,
    name: "E-Waste Management System",
    description: "A platform to manage and recycle electronic waste efficiently.",
    client: "Environmental Agencies",
    status: "In Progress"
  },
  {
    id: 5,
    name: "Online Learning Platform",
    description: "An interactive platform for online courses and learning resources.",
    client: "Educational Institutions",
    status: "Completed"
  },
  {
    id: 6,
    name: "Freelance Job Portal",
    description: "A website connecting freelancers with clients looking for various services.",
    client: "Small Businesses",
    status: "In Progress"
  },
  {
    id: 7,
    name: "E-Waste Management System",
    description: "A platform to manage and recycle electronic waste efficiently.",
    client: "Environmental Agencies",
    status: "In Progress"
  },
  {
    id: 8,
    name: "Online Learning Platform",
    description: "An interactive platform for online courses and learning resources.",
    client: "Educational Institutions",
    status: "Completed"
  },
  {
    id: 9,
    name: "Freelance Job Portal",
    description: "A website connecting freelancers with clients looking for various services.",
    client: "Small Businesses",
    status: "In Progress"
  },
  {
    id: 10,
    name: "E-Waste Management System",
    description: "A platform to manage and recycle electronic waste efficiently.",
    client: "Environmental Agencies",
    status: "In Progress"
  },
  {
    id: 11,
    name: "Online Learning Platform",
    description: "An interactive platform for online courses and learning resources.",
    client: "Educational Institutions",
    status: "Completed"
  },
  {
    id: 12,
    name: "Freelance Job Portal",
    description: "A website connecting freelancers with clients looking for various services.",
    client: "Small Businesses",
    status: "In Progress"
  },
  {
    id: 13,
    name: "E-Waste Management System",
    description: "A platform to manage and recycle electronic waste efficiently.",
    client: "Environmental Agencies",
    status: "In Progress"
  },
  {
    id: 14,
    name: "Online Learning Platform",
    description: "An interactive platform for online courses and learning resources.",
    client: "Educational Institutions",
    status: "Completed"
  },
  {
    id: 15,
    name: "Freelance Job Portal",
    description: "A website connecting freelancers with clients looking for various services.",
    client: "Small Businesses",
    status: "In Progress"
  },
  // Add more project ideas as needed
];

const ProjectIdea = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = projectIdeas.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(projectIdeas.length / itemsPerPage);

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
              <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <p className="mt-2 text-gray-500"><strong>Client:</strong> {project.client}</p>
              <p className={`mt-4 text-lg font-semibold ${
                project.status === "In Progress" ? "text-yellow-500" : "text-green-500"
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
