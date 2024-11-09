import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const faqData = [
  {
    question: "What is this platform about?",
    answer: "This platform (Githubstreak) is designed to help developers in any way as much as possible."
  },
  {
    question: "How do I get involved?",
    answer: "Joining Githubstreak is simple! On this our community website, signup with your Github account, and start your coding journey. Engage with solo projects, team projects, and contribute to open-source initiatives.."
  },
  {
    question: "What if I'm new to coding?",
    answer: "The Githubstreak community is inclusive and beginner-friendly. Our community values growth, and members at all skill levels are encouraged to participate. Ask questions, seek guidance, and learn alongside experienced developers."
  },
  {
    question: "What's the significance of the green boxes?",
    answer: "The green boxes represent your coding journey. They showcase your dedication to personal projects, teamwork, and open-source contributions. It's a visual representation of your progress and the collective achievements of the community."
  },
  {
    question: "Can I track the progress of my project?",
    answer: "Yes, the platform provides tools to track the progress of your project at every stage."
  }
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
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white-900">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-gray-500">Find answers to the most commonly asked questions below.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-semibold text-gray-700 p-4 bg-gray-200 rounded-md focus:outline-none flex items-center justify-between"
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className="p-4 text-gray-600 bg-gray-50 rounded-md">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;