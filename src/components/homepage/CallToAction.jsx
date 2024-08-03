import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="relative py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Elevate Your Brand. Faster.</h2>
        <p className="mt-4 text-lg md:text-xl">Join thousands of creators using SnapMyDesign to elevate their brand visuals. It's quick, easy, and fun!</p>
        <div className="mt-8 flex flex-wrap justify-center gap-y-4 gap-x-6">
          <Link
            to="/login"
            className="relative flex h-11 w-full items-center justify-center px-6 py-3 bg-white text-indigo-500 font-semibold rounded-full shadow-lg before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
          >
            <span className="relative text-primary">Get Started Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
