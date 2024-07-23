import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserAvatar from './UserAvatar';
import ChatList from './ChatList';

const Sidebar = ({ chats, localChat, onNewChat, onSelectChat, onRenameChat, onDeleteChat }) => {
  const [user] = useAuthState(auth);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl">Chats</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={onNewChat}
        >
          New Chat
        </button>
      </div>
      <ChatList
        chats={localChat ? [localChat, ...chats] : chats}
        onSelectChat={onSelectChat}
        onRenameChat={onRenameChat}
        onDeleteChat={onDeleteChat}
      />
      <div className="p-4 flex justify-between items-center relative">
        <UserAvatar
          photoURL={user?.photoURL}
          displayName={user?.displayName}
          onClick={() => setShowLogout(!showLogout)}
        />
        {showLogout && (
          <div className="absolute bottom-12 left-0 w-full bg-gray-700 text-white rounded-lg shadow-lg py-2 z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
