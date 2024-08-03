import React from 'react';

const UseCases = () => {
  const useCases = [
    {
      title: 'Graphic Designers',
      description: 'Create stunning visuals and illustrations for client projects effortlessly.',
      icon: '🎨',
    },
    {
      title: 'Marketers',
      description: 'Design eye-catching social media posts and promotional materials quickly.',
      icon: '📈',
    },
    {
      title: 'Small Business Owners',
      description: 'Generate professional-quality marketing materials without hiring a designer.',
      icon: '🏪',
    },
    {
      title: 'Content Creators',
      description: 'Enhance your blog posts and videos with custom graphics and illustrations.',
      icon: '🎥',
    },
    {
      title: 'Educators',
      description: 'Create engaging teaching materials and presentations with ease.',
      icon: '📚',
    },
    {
      title: 'Event Planners',
      description: 'Design attractive flyers, banners, and invitations for your events.',
      icon: '🎉',
    },
    {
      title: 'Freelancers',
      description: 'Produce high-quality graphics and designs to impress your clients.',
      icon: '💼',
    },
    {
      title: 'Non-Profit Organizations',
      description: 'Create compelling visuals for your campaigns and outreach programs.',
      icon: '🌟',
    },
  ];

  return (
    <section id="usecases" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/geometric-web.png')] opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">Who Can Use SnapMyDesign?</h2>
          <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
            Discover how various users can benefit from SnapMyDesign to enhance their creative process.
          </p>
        </div>
        <div className="relative flex flex-wrap justify-center gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="w-60 p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-blue-800 dark:via-purple-700 dark:to-pink-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-lg text-center transform transition duration-500 hover:scale-105">
              <div className="text-4xl">{useCase.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{useCase.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
