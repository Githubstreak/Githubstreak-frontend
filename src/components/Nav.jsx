import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { FaFire, FaUsers, FaUser, FaCode, FaImages } from "react-icons/fa";
import { Github } from "../components/icons/Github";
import { useUserStats } from "../context/UserStatsContext";
import "../index.css";

export default function Nav() {
  const { userStats, streakStatus } = useUserStats();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  // Streak fire color based on status
  const getFireConfig = () => {
    switch (streakStatus) {
      case "today":
        return { color: "text-green-500", animation: "fire-active" };
      case "pending":
        return { color: "text-yellow-500", animation: "fire-flicker" };
      case "broken":
        return { color: "text-red-500", animation: "" };
      default:
        return { color: "text-green-500", animation: "" };
    }
  };

  const fireConfig = getFireConfig();

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

  // Navigation links configuration
  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: FaFire },
    { path: "/project", label: "Projects", icon: FaCode },
    { path: "/meme", label: "Memes", icon: FaImages },
    {
      href: "https://nas.io/githubstreak",
      label: "Community",
      icon: FaUsers,
      external: true,
    },
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      <div
        className={`
          w-full px-4 md:px-6 lg:px-8 py-3
          bg-slate-900/95 backdrop-blur-md 
          border-b border-slate-800
          transition-all duration-300
          ${scrolled ? "shadow-lg shadow-black/20" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              height={36}
              width={36}
              src="/logo.png"
              className="transition-transform group-hover:scale-110"
              alt="Githubstreak"
            />
            <span className="hidden sm:block text-white font-bold text-lg">
              GitHub<span className="text-green-500">Streak</span>
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.external) {
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                                   text-gray-300 hover:text-white hover:bg-slate-800 transition-all"
                      >
                        <Icon className="text-sm" />
                        {link.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${
                          isActive(link.path)
                            ? "text-white bg-green-600 shadow-md shadow-green-500/20"
                            : "text-gray-300 hover:text-white hover:bg-slate-800"
                        }
                      `}
                    >
                      <Icon className="text-sm" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <SignedIn>
                <li>
                  <Link
                    to="/profile"
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        isActive("/profile")
                          ? "text-white bg-green-600 shadow-md shadow-green-500/20"
                          : "text-gray-300 hover:text-white hover:bg-slate-800"
                      }
                    `}
                  >
                    <FaUser className="text-sm" />
                    Profile
                  </Link>
                </li>
              </SignedIn>
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Streak Badge */}
            {userStats && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full cursor-default"
                title={getTooltip()}
                role="status"
                aria-label={`Current streak: ${
                  userStats.currentStreak?.count ?? 0
                } days`}
              >
                <FaFire
                  size={16}
                  className={`${fireConfig.color} ${fireConfig.animation}`}
                  aria-hidden="true"
                />
                <span className="text-white font-bold text-sm">
                  {userStats.currentStreak?.count ?? 0}
                </span>
              </div>
            )}

            {/* GitHub Link */}
            <a
              href="https://github.com/Githubstreak"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
              aria-label="Githubstreak on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton className="hidden sm:block rounded-full py-2 px-5 bg-green-500 hover:bg-green-600 text-gray-900 text-sm font-semibold transition-colors" />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          md:hidden fixed inset-x-0 top-[60px] 
          bg-slate-900/98 backdrop-blur-lg border-b border-slate-700
          transition-all duration-300 ease-in-out overflow-hidden
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              if (link.external) {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      <Icon className="text-lg text-green-500" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${
                        isActive(link.path)
                          ? "text-white bg-green-600"
                          : "text-gray-300 hover:text-white hover:bg-slate-800"
                      }
                    `}
                  >
                    <Icon
                      className={`text-lg ${
                        isActive(link.path) ? "text-white" : "text-green-500"
                      }`}
                    />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              );
            })}
            <SignedIn>
              <li>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${
                      isActive("/profile")
                        ? "text-white bg-green-600"
                        : "text-gray-300 hover:text-white hover:bg-slate-800"
                    }
                  `}
                >
                  <FaUser
                    className={`text-lg ${
                      isActive("/profile") ? "text-white" : "text-green-500"
                    }`}
                  />
                  <span className="font-medium">Profile</span>
                </Link>
              </li>
            </SignedIn>

            {/* Mobile-only: GitHub Link */}
            <li>
              <a
                href="https://github.com/Githubstreak"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                <Github className="text-lg text-green-500" />
                <span className="font-medium">GitHub</span>
              </a>
            </li>

            {/* Mobile-only: Sign In */}
            <SignedOut>
              <li className="pt-2">
                <SignInButton className="w-full rounded-xl py-3 bg-green-500 hover:bg-green-600 text-gray-900 font-semibold transition-colors" />
              </li>
            </SignedOut>
          </ul>
        </nav>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] bg-black/50 z-[-1]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
