import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetail({ projects }) {
  const { projectId } = useParams();
  const project = projects.find((proj) => proj.id === parseInt(projectId));
  const [isRunning, setIsRunning] = useState(false);

  if (!project) return <p>Project not found</p>;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center">{project.title}</h1>
      <p className="mt-4 text-lg text-center">{project.description}</p>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {isRunning ? 'Running' : 'Start Project'}
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Pause Project
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Stop Project
        </button>
      </div>

      <div className="mt-4 text-center">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Developer's GitHub Profile
        </a>
      </div>
    </div>
  );
}

export default ProjectDetail;
