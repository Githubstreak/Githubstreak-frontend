import background from "../assets/images/background.jpg";
import summary from "../assets/images/summary.png";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import {
  FaGithub,
  FaFire,
  FaTrophy,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Hero = () => {
  const stats = [
    { icon: FaUsers, value: "5K+", label: "Active Developers" },
    { icon: FaFire, value: "100K+", label: "Streaks Tracked" },
    { icon: FaTrophy, value: "500+", label: "Achievements Earned" },
  ];

  return (
    <div
      className="hero min-h-screen pt-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 py-20 gap-12 relative z-10">
        {/* Left Content */}
        <div className="text-left w-full lg:w-1/2 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <FaChartLine className="text-green-500" />
            <span className="text-green-400 text-sm font-medium">
              Track Your Coding Journey
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
            <span className="text-white">Build Your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Coding Habit
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mt-6 leading-relaxed">
            One commit at a time. Join thousands of developers who stay
            accountable and maintain their GitHub contribution streaks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105">
                  <FaGithub size={22} />
                  <span>Get Started Free</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <a
                href="#leaderboard"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
              >
                <FaTrophy size={20} />
                <span>View Leaderboard</span>
              </a>
            </SignedIn>
            <a
              href="https://nas.io/githubstreak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105"
            >
              <FaUsers size={20} />
              <span>Join Community</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Icon className="text-green-500 text-lg" />
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl scale-110" />
            <img
              src={summary}
              alt="GitHub Streak Dashboard Preview"
              className="relative object-contain w-full max-w-[600px] drop-shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-gray-400 text-sm">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
