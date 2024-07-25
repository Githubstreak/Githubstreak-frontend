import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    content: "Detailed content about React Hooks...",
    date: "2024-07-01",
  },
  {
    id: 2,
    title: "Tailwind CSS for Rapid Development",
    content: "Detailed content about Tailwind CSS...",
    date: "2024-06-15",
  },
  {
    id: 3,
    title: "How to Build a REST API with Node.js",
    content: "Detailed content about Node.js REST API...",
    date: "2024-05-20",
  },
];

const BlogPosts = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900">{post.title}</h1>
        <p className="mt-2 text-gray-500">{post.date}</p>
        <div className="mt-4">
          <p className="text-lg text-gray-700">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
