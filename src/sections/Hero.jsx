import background from "../assets/images/background.jpg";
import summary from "../assets/images/summary.png";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { FaGithub } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen mb-5 pt-16 relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full px-6 py-12 gap-8 sm:px-12 lg:px-16 relative z-10">
        <div className="text-left w-full md:w-2/5 max-w-2xl">
          <h1 className="pt-16 text-4xl font-extrabold sm:text-6xl md:text-6xl lg:text-7xl">
            Welcome to
            <span className="text-green-500"> Githubstreak</span>
          </h1>
          <p className="text-2xl font-bold md:text-4xl text-white mt-8">
            Build your coding habit, one commit at a time.
          </p>
          <p className="text-lg text-gray-300 mb-8 mt-6 leading-relaxed">
            Join a community of developers who stay accountable to each other
            and maintain their GitHub contribution streaks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-6 rounded-full transition-colors">
                  <FaGithub size={20} />
                  Get Started with GitHub
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <a
                href="#leaderboard"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-6 rounded-full transition-colors"
              >
                View Leaderboard
              </a>
            </SignedIn>
            <a
              href="https://nas.io/githubstreak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white hover:border-green-500 hover:text-green-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Join Community
            </a>
          </div>
        </div>

        <div className="w-full md:w-3/5 h-auto flex justify-end">
          <img
            src={summary}
            alt="GitHub Streak Cards"
            className="object-contain w-full max-w-[800px] drop-shadow-2xl rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
