// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function ProjectDetail(prop) {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);

//   const sampleProjects = [
//     {
//       id: 1,
//       title: 'Build a Personal Portfolio',
//       description: 'Create a responsive personal portfolio to showcase projects.',
//       progress: 75,
//       github: 'https://github.com/sample-user',
//       username: 'sample-user',
//       developer: 'John Doe',
//     },
//     {
//       id: 2,
//       title: 'E-Commerce Website',
//       description: 'Develop a fully functional e-commerce site with a shopping cart.',
//       progress: 40,
//       github: 'https://github.com/sample-user',
//       username: 'sample-user',
//       developer: 'Jane Smith',
//     },
//   ];
  
//   // const project = sampleProjects.find((proj) => proj.id === parseInt(projectId));
  

//   useEffect(() => {
//     // Fetch project details using the projectId
//     const fetchProject = async () => {
//       try {
//         const response = await fetch(`/api/solo-projects/${projectId}`);
//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };

//     fetchProject();
//   }, [projectId]);

//   if (!project) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-center">{project.title}</h1>
//       <p className="mt-4 text-lg text-center">{project.description}</p>
//       <div className="mt-8 flex justify-center space-x-4">
//         {/* Action buttons */}
//       </div>
//       <div className="mt-4 text-center">
//         <a
//           href={project.github}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           View Developer's GitHub Profile
//         </a>
//       </div>
//     </div>
//   );
// }

// export default ProjectDetail;
