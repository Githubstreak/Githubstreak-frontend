import { useState, useEffect } from "react";
import { FaQuoteLeft, FaRedo } from "react-icons/fa";
import { getDailyQuote, getRandomQuote } from "../utils/quotes";

const MotivationalQuote = ({ className = "" }) => {
  const [quote, setQuote] = useState(getDailyQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <FaQuoteLeft className="text-green-500/50 text-2xl" />
        <button
          onClick={handleNewQuote}
          className="text-gray-400 hover:text-white transition-colors p-1"
          title="Get new quote"
        >
          <FaRedo className={`text-sm ${isAnimating ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-gray-300 text-sm md:text-base italic mb-3 leading-relaxed">
          "{quote.text}"
        </p>
        <p className="text-gray-500 text-xs text-right">— {quote.author}</p>
      </div>
    </div>
  );
};

export default MotivationalQuote;
