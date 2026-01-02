import { track } from "@vercel/analytics";
import { XLogo, YoutubeLogo, Discord } from "../components/icons";

import logo from "/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-white py-6 px-4">
      <div className="max-w-[1280px] mx-auto flex sm:flex-row flex-col items-center justify-between gap-4">
        <aside className="flex mx-auto sm:mx-0 items-center">
          <img src={logo} alt="logo" className="w-24" />
        </aside>
        <div>
          <p className="font-medium text-gray-400 text-sm text-center sm:text-left">
            Copyright © {new Date().getFullYear()} - All rights reserved
            #githubstreak '25
          </p>
        </div>
        <nav className="flex gap-4 mx-auto sm:m-0">
          <Link
            to={"https://x.com/githubstreak"}
            target="_blank"
            onClick={() => {
              track(<XLogo />);
            }}
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <XLogo />
          </Link>
          <Link
            to={"https://youtube.com/@githubstreak01?si=tUr9EsmpuhAzgGad"}
            target="_blank"
            onClick={() => {
              track(<YoutubeLogo />);
            }}
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <YoutubeLogo />
          </Link>
          <Link
            to={"https://discord.gg/BqrYjZZ9"}
            target="_blank"
            onClick={() => {
              track(<Discord />);
            }}
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <Discord />
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
