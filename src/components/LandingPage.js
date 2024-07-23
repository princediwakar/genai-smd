// src/components/LandingPage.js
import React from 'react';
import Header from './Header';
import AuthForm from './AuthForm';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center p-4">
      {/* <Header /> */}
      <div className="flex flex-col items-center mt-12 w-full">
        <div className="bg-glass-primary backdrop-blur-xs border border-glass-border rounded-lg shadow-glass p-8 w-full max-w-lg">
          <h1 className="text-5xl font-bold text-white text-center">
            Welcome to <span className="text-yellow-300">SnapMyDesign</span>
          </h1>
          <p className="text-lg text-gray-200 text-center mt-4">
            Generate stunning images, graphics, designs, and posters based on your prompts with our AI-powered tool.
          </p>
          <div className="mt-8 w-full">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
