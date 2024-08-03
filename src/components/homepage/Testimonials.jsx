import React from 'react'

const Testimonials = () => {
  return (
    <div className="text-gray-600 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-gray-300" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-20 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Our Users Love Us!
          </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Ananya Sharma</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">Graphic Designer</p>
              </div>
            </div>
            <p className="mt-8">snapmydesign has changed the game for me. The AI tool is super easy to use and it saves me so much time. Can't imagine designing without it now!</p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Raj Patel</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">Marketer</p>
              </div>
            </div>
            <p className="mt-8">SMD is a total lifesaver. I can quickly whip up high-quality designs for my campaigns. The customization options are fantastic too. Love it!</p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Priya Kumar</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">App Developer</p>
              </div>
            </div>
            <p className="mt-8">smd fits perfectly into my workflow. The AI is smart and the designs it generates are amazing. It has really helped me bring my ideas to life.</p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Vikram Mehta</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">Brand Manager</p>
              </div>
            </div>
            <p className="mt-8">For any brand manager, snapmydesign is a must-have. The AI-generated designs are always on-brand and the process is super easy. It's a huge time-saver!</p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Nisha Singh</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">Freelancer</p>
              </div>
            </div>
            <p className="mt-8">As a freelancer, smd is an essential tool. It lets me create professional designs for my clients quickly, helping me stand out in a competitive market.</p>
          </div>
          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <div>
                <h6 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Amit Joshi</h6>
                <p className="text-sm text-gray-500 dark:text-gray-400">Content Creator</p>
              </div>
            </div>
            <p className="mt-8">Creating content is so much easier with snapmydesign. The designs it generates are eye-catching and perfect for engaging my audience. Highly recommend!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
