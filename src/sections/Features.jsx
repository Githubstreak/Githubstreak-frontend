import {
  FaFire,
  FaTrophy,
  FaChartLine,
  FaBell,
  FaUsers,
  FaRocket,
  FaMedal,
  FaCalendarCheck,
} from "react-icons/fa";

const features = [
  {
    icon: FaFire,
    title: "Streak Tracking",
    description:
      "Monitor your daily GitHub contributions and build an unbreakable coding habit.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FaTrophy,
    title: "Leaderboards",
    description:
      "Compete with developers worldwide and see where you rank in the community.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: FaMedal,
    title: "Achievements",
    description:
      "Unlock badges as you hit milestones - from Week Warrior to Century Legend.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FaChartLine,
    title: "Progress Analytics",
    description:
      "Visualize your coding journey with detailed contribution heatmaps and stats.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaBell,
    title: "Smart Reminders",
    description:
      "Get notified before your streak breaks so you never miss a day.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FaUsers,
    title: "Community",
    description:
      "Join a supportive community of developers who keep each other accountable.",
    color: "from-indigo-500 to-violet-500",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
            <FaRocket className="text-green-500" />
            <span className="text-green-400 text-sm font-medium">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Stay Consistent
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built by developers, for developers. All the tools you need to build
            and maintain your coding streak.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white text-2xl" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect GitHub",
                description:
                  "Sign in with your GitHub account to automatically sync your contributions.",
                icon: FaCalendarCheck,
              },
              {
                step: "02",
                title: "Track Your Streak",
                description:
                  "Watch your streak grow as you make daily commits and contributions.",
                icon: FaFire,
              },
              {
                step: "03",
                title: "Compete & Grow",
                description:
                  "Climb the leaderboard, earn achievements, and join the community.",
                icon: FaTrophy,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative text-center">
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-500/50 to-transparent" />
                  )}

                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-green-500/25">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
