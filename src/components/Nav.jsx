import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { Github } from "../components/icons/Github";
import { useUserStats } from "../context/UserStatsContext";
import "../index.css";

export default function Nav() {
  const { userStats, streakStatus } = useUserStats();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Streak fire color based on status
  const getFireColor = () => {
    switch (streakStatus) {
      case "today":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "broken":
        return "text-red-500";
      default:
        return "text-green-500";
    }
  };

  // Get tooltip text based on status
  const getTooltip = () => {
    switch (streakStatus) {
      case "today":
        return "✓ Committed today!";
      case "pending":
        return "⚠️ Commit today to keep streak!";
      case "broken":
        return "Start a new streak!";
      default:
        return "Your streak";
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40">
      <div className="flex justify-between md:justify-center px-3 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="w-full flex md:w-auto justify-between items-center md:py-2.5 sm:px-7 rounded-xl lg:max-w-3xl gap-10 sm:gap-16">
          <div>
            <Link to="/">
              <img
                height={100}
                width={100}
                src="/logo.png"
                className="p-2"
                alt="Githubstreak logo"
              />
            </Link>
          </div>
          <nav className="hidden md:block text-white">
            <ul className="flex gap-8 text-sm items-center">
              <li>
                <a
                  href="https://nas.io/githubstreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Join Community
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex gap-4 items-center">
            {userStats && (
              <div
                className="flex items-center text-white gap-1 cursor-default"
                title={getTooltip()}
                role="status"
                aria-label={`Current streak: ${
                  userStats.currentStreak?.count ?? 0
                } days`}
              >
                <FaFire
                  size={22}
                  className={getFireColor()}
                  aria-hidden="true"
                />
                <span className="font-semibold">
                  {userStats.currentStreak?.count ?? 0}
                </span>
              </div>
            )}
            <a
              href="https://github.com/Githubstreak"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-1.5 rounded-full hover:bg-green-400 transition-colors"
              aria-label="Githubstreak on GitHub"
            >
              <Github />
            </a>
            <SignedOut>
              <SignInButton className="rounded-full py-2 px-4 bg-green-500 hover:bg-green-600 text-gray-900 font-semibold transition-colors" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-1 hover:text-green-400 transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              id="mobile-menu"
              className="absolute left-0 right-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700 py-6 md:hidden top-full"
            >
              <nav className="flex flex-col p-4">
                <ul className="flex flex-col justify-center items-center space-y-4 text-white">
                  <li>
                    <a
                      href="https://nas.io/githubstreak"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="text-lg text-white hover:text-green-400 transition-colors"
                    >
                      Join Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Githubstreak"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="text-lg text-white hover:text-green-400 transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
