import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'animate.css'; // Import Animate.css for animations

function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const itemsPerPage = 2; // Number of mentors per page
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch mentors data from your API
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch('/api/mentors'); // Replace with your actual API endpoint
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = mentors.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(mentors.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((mentor, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp hover:animate__pulse transition-transform duration-300 transform hover:scale-105"
          >
            <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">{mentor.name}</h2>
            <p className="text-center text-gray-600">{mentor.expertise}</p>
            <p className="mt-4 text-gray-800">{mentor.bio}</p>
            <div className="mt-4 text-center">
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${mentor.serviceType === 'Free' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {mentor.serviceType}
              </span>
            </div>
            <div className="mt-6 text-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
                Book Me
              </button>
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

export default Mentorship;
