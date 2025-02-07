import React from 'react';
import { Bookmark } from 'lucide-react';


const Card = ({ title, description, author, points, progress }) => {
  return (
    <div className="bg-[#1C2128] rounded-lg p-6 w-[360px] text-white hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{author.name}</h3>
            <p className="text-sm text-gray-400">{author.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{points}</span>
          <Bookmark className="w-5 h-5" />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div
            className="bg-[#3FB950] h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">{progress}% complete</p>
      </div>
    </div>
  );
};

export default Card;