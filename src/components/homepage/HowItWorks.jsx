import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">How SnapMyDesign Works </h2>
          {/* <p className="lg:mx-auto lg:w-6/12 pt-4 text-gray-600 dark:text-gray-300">
            See how it transforms your input image & prompt into stunning designs with various styles.
          </p> */}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="relative overflow-hidden rounded-xl">
              <img src="https://ilus.ai/_next/image?url=%2Fhand-shake%2Fink%20businessman%20and%20a%20businesswoman%20shaking%20hands.png&w=1920&q=75" alt="Woman & man shaking hands" loading="lazy" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-6 relative">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Step 1: Upload Image</h3>
              <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                Upload an image that represents your brand or the visual you want to enhance.
              </p>
            </div>
          </div>
          <div className="group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="relative overflow-hidden rounded-xl h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <p className="text-xl font-semibold text-gray-800 dark:text-white">A boy and girl shaking hands</p>
            </div>
            <div className="mt-6 relative">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Step 2: Write Prompt</h3>
              <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                Describe the design you want to create. Be specific to get the best results.
              </p>
            </div>
          </div>
          <div className="group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="relative overflow-hidden rounded-xl">
              <img src="https://ilus.ai/_next/image?url=%2Fhand-shake%2Fink%20girl%20and%20boy%20shaking%20hands.png&w=1920&q=75" alt="Generate" loading="lazy" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-6 relative">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Step 3: Hit Generate</h3>
              <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                Hit the generate button and let our AI create amazing designs for you in seconds.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-white md:text-4xl">An Example</h2>
          <img src="/images/examples/example.png" alt="User Flow of SnapMyDesign" loading="lazy" className="mx-auto mt-8 rounded-3xl shadow-2xl shadow-gray-600/10 dark:shadow-none" />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
