import { track } from "@vercel/analytics";
import { XLogo, YoutubeLogo, Discord } from "../components/icons";
import { Github } from "../components/icons/Github";
import logo from "/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <img src={logo} alt="Githubstreak logo" className="w-28 mb-4" />
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Build your coding habit, one commit at a time. Join thousands of
              developers who stay accountable and maintain their GitHub
              contribution streaks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nas.io/githubstreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Join Community
                </a>
              </li>
              <li>
                <a
                  href="https://analytics.ggithubstreak.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#leaderboard"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/Githubstreak"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("footer_github_click")}
                className="bg-slate-800 p-2.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-slate-700 transition-all"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href="https://x.com/githubstreak"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("footer_x_click")}
                className="bg-slate-800 p-2.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-slate-700 transition-all"
                aria-label="X (Twitter)"
              >
                <XLogo />
              </a>
              <a
                href="https://youtube.com/@githubstreak01"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("footer_youtube_click")}
                className="bg-slate-800 p-2.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-slate-700 transition-all"
                aria-label="YouTube"
              >
                <YoutubeLogo />
              </a>
              <a
                href="https://discord.gg/BqrYjZZ9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("footer_discord_click")}
                className="bg-slate-800 p-2.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-slate-700 transition-all"
                aria-label="Discord"
              >
                <Discord />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Githubstreak. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-medium">
              #githubstreak '26 — Built with 💚 for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
