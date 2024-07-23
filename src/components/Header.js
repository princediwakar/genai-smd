// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="w-full max-w-screen-lg flex justify-between items-center py-4">
      <div className="text-2xl font-bold text-white">
        <span className="text-yellow-300">SnapMyDesign</span>
      </div>
      {/* <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium">
        Login
      </button> */}
    </header>
  );
};

export default Header;
