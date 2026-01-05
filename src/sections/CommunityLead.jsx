import { User, Link } from "@nextui-org/react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";

const CommunityLead = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />

          {/* Quote icon */}
          <FaQuoteLeft className="text-green-500/20 text-6xl mb-6" />

          {/* Quote */}
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              &quot;Consistency beats talent because it is more sustainable,
              adaptable, and rewarding.&quot;
            </p>
            <p className="text-gray-400 text-lg max-w-2xl">
              It helps you improve skills, achieve goals, and overcome
              challenges. Every line of code counts.
            </p>
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700 relative z-10">
            <Link href="https://x.com/Kwame_Tech1" isExternal>
              <User
                className="text-white"
                name="Kwame Edmond"
                description={
                  <span className="text-green-400">
                    GitHubStreak Community Lead
                  </span>
                }
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/107095324?v=4",
                  className: "w-12 h-12 ring-2 ring-green-500",
                }}
              />
            </Link>
            <a
              href="https://x.com/Kwame_Tech1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-gray-300 hover:text-white transition-colors"
            >
              <FaTwitter className="text-sky-400" />
              <span className="hidden sm:inline text-sm">Follow</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityLead;
