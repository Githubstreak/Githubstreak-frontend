// /src/components/Mentorship.jsx
import React from 'react';

const mentors = [
  {
    name: 'John Doe',
    expertise: 'Frontend Development',
    image: 'https://via.placeholder.com/150',
    bio: 'Experienced frontend developer with a passion for building beautiful and responsive web applications.'
  },
  {
    name: 'Jane Smith',
    expertise: 'Backend Development',
    image: 'https://via.placeholder.com/150',
    bio: 'Skilled in server-side technologies and database management. Loves to optimize and scale applications.'
  },
  {
    name: 'Alice Johnson',
    expertise: 'Full Stack Development',
    image: 'https://via.placeholder.com/150',
    bio: 'Adept at both frontend and backend development, with a strong focus on creating seamless user experiences.'
  }
];

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">{mentor.name}</h2>
            <p className="text-center text-gray-600">{mentor.expertise}</p>
            <p className="mt-4 text-gray-800">{mentor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;
