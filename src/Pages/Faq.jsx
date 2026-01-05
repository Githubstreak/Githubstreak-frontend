import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqData = [
  {
    question: "What is GitHubStreak?",
    answer:
      "GitHubStreak is a platform designed to help developers build consistent coding habits by tracking their GitHub contribution streaks, competing on leaderboards, and earning achievements.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign in with your GitHub account and we'll automatically start tracking your contributions. Your streak, achievements, and leaderboard position will be updated in real-time.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! GitHubStreak is completely free. We believe every developer should have access to tools that help them build better coding habits.",
  },
  {
    question: "What counts as a contribution?",
    answer:
      "Any commit pushed to a public or private repository, opening issues, creating pull requests, and contributing to discussions all count toward your daily contribution.",
  },
  {
    question: "What if I'm new to coding?",
    answer:
      "GitHubStreak is beginner-friendly! Our community values growth at all skill levels. Start small, stay consistent, and watch your streak grow.",
  },
  {
    question: "What are the green boxes?",
    answer:
      "The green boxes represent your GitHub contribution graph - each box is a day, and the intensity shows how many contributions you made. It's a visual representation of your coding journey.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
            <FaQuestionCircle className="text-green-500" />
            <span className="text-green-400 text-sm font-medium">FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about GitHubStreak
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "border-green-500/50"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-inset"
                aria-expanded={activeIndex === index}
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-green-500 flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="https://nas.io/githubstreak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
