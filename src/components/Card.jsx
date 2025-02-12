
import { Bookmark } from 'lucide-react';



const Card = ({ title, description, author, points, progress }) => {
  return (
    <div className="bg-[#1C2128] rounded-lg p-4  sm:p-6 w-full text-white hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-sm sm:text-base">{author.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{author.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm sm:text-base">{points}</span>
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-3">{description}</p>
      </div>

      <div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mb-2">
          <div
            className="bg-[#3FB950] h-1.5 sm:h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs sm:text-sm text-gray-400">{progress}% complete</p>
      </div>
    </div>
  );
};

export default Card;