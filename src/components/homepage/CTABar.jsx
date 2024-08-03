import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBar = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 text-center">
        <p className="text-lg font-semibold">
          Elevate Your Brand with SnapMyDesign
        </p>
        <Link to="/login"
          className="mt-2 inline-block bg-white text-indigo-500 font-semibold rounded-full px-6 py-2 shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Start Generating Now
        </Link>
      </div>
    </div>
  );
}

export default CallToActionBar;
