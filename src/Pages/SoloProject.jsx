import React, { useState } from 'react';
import 'animate.css';
import ReactPaginate from 'react-paginate';

const soloProjects = [
  {
    id: 1,
    developer: "John Doe",
    username: "johndoe",
    projectName: "Personal Portfolio",
    description: "A personal portfolio website to showcase my projects and skills.",
    github: "https://github.com/johndoe",
    progress: 75 // Progress in percentage
  },
  {
    id: 2,
    developer: "Jane Smith",
    username: "janesmith",
    projectName: "Recipe App",
    description: "A mobile app for browsing and sharing recipes.",
    github: "https://github.com/janesmith",
    progress: 40
  },
  {
    id: 3,
    developer: "Alice Johnson",
    username: "alicejohnson",
    projectName: "Task Manager",
    description: "A web application to manage and organize tasks.",
    github: "https://github.com/alicejohnson",
    progress: 90
  },
  {
    id: 4,
    developer: "John Doe",
    username: "johndoe",
    projectName: "Personal Portfolio",
    description: "A personal portfolio website to showcase my projects and skills.",
    github: "https://github.com/johndoe",
    progress: 75 // Progress in percentage
  },
  {
    id: 5,
    developer: "Jane Smith",
    username: "janesmith",
    projectName: "Recipe App",
    description: "A mobile app for browsing and sharing recipes.",
    github: "https://github.com/janesmith",
    progress: 40
  },
  {
    id: 6,
    developer: "Alice Johnson",
    username: "alicejohnson",
    projectName: "Task Manager",
    description: "A web application to manage and organize tasks.",
    github: "https://github.com/alicejohnson",
    progress: 90
  },
  {
    id: 7,
    developer: "John Doe",
    username: "johndoe",
    projectName: "Personal Portfolio",
    description: "A personal portfolio website to showcase my projects and skills.",
    github: "https://github.com/johndoe",
    progress: 75 // Progress in percentage
  },
  {
    id: 8,
    developer: "Jane Smith",
    username: "janesmith",
    projectName: "Recipe App",
    description: "A mobile app for browsing and sharing recipes.",
    github: "https://github.com/janesmith",
    progress: 40
  },
  {
    id: 9,
    developer: "Alice Johnson",
    username: "alicejohnson",
    projectName: "Task Manager",
    description: "A web application to manage and organize tasks.",
    github: "https://github.com/alicejohnson",
    progress: 90
  },
  // Add more solo projects as needed
];

const SoloProject = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = soloProjects.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(soloProjects.length / itemsPerPage);

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

export default SoloProject;
