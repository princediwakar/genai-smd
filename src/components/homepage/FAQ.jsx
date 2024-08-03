import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-800 dark:text-white text-lg font-medium">
          {question}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-600 dark:text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const faqData = [
    {
      question: 'What is SnapMyDesign?',
      answer: 'SnapMyDesign is an AI-powered tool that helps you create stunning graphics, illustrations, and more by simply uploading a sample image and writing a prompt.',
    },
    {
      question: 'How does SnapMyDesign work?',
      answer: 'Using SnapMyDesign is easy! Upload your sample image, write a prompt, and let our AI generate the design. You can customize the output to perfectly match your vision.',
    },
    {
      question: 'Can I use SnapMyDesign for commercial projects?',
      answer: 'Yes, you can use SnapMyDesign for both personal and commercial projects. Our tool is designed to help you create professional-grade designs for any purpose.',
    },
    {
      question: 'What types of designs can SnapMyDesign generate?',
      answer: 'SnapMyDesign can generate a variety of designs, including social media posters, banners, illustrations, doodles, and more.',
    },
    {
      question: 'Is there a limit to the number of designs I can create?',
      answer: 'There are no limits to the number of designs you can create with SnapMyDesign. Let your creativity flow and generate as many designs as you need.',
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">Frequently Asked Questions</h2>
          <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
            Find answers to some of the most commonly asked questions about SnapMyDesign.
          </p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
