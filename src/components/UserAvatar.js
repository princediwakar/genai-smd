import React from 'react';

const UserAvatar = ({ photoURL, displayName, onClick }) => {
  return photoURL ? (
    <img
      src={photoURL}
      alt="User Avatar"
      className="w-10 h-10 rounded-full cursor-pointer"
      onClick={onClick}
    />
  ) : (
    <div
      className="w-10 h-10 rounded-full bg-gray-500 cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      {displayName ? displayName[0].toUpperCase() : 'U'}
    </div>
  );
};

export default UserAvatar;
