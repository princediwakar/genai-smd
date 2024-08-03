import React, { useState, useEffect, useRef } from 'react';
import { FiLogOut, FiPlus, FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = ({ selectedChat, selectChat, onNewChat, onLogout }) => {
  const [chats, setChats] = useState([]);
  const [user] = useAuthState(auth);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'chats'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedChats = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChats(fetchedChats);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleRenameChat = async (chatId) => {
    const docRef = doc(db, 'chats', chatId);
    await updateDoc(docRef, { title: newTitle });
    setEditingChatId(null);
  };

  const handleDeleteChat = async (chatId) => {
    await deleteDoc(doc(db, 'chats', chatId));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <div className="w-64 h-full fixed top-0 left-0 bg-gray-200 dark:bg-gray-900 shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chats</h2>
        <button
          onClick={onNewChat}
          className="flex items-center justify-center p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
        >
          <FiPlus />
        </button>
      </div>
      <div className="flex flex-col overflow-y-auto h-[calc(100vh-150px)] space-y-1">
        {chats.map((chat, index) => (
          <div key={index} className="relative group">
            {editingChatId === chat.id ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameChat(chat.id);
                  }
                }}
                className="w-full py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              />
            ) : (
              <button
                onClick={() => selectChat(chat)}
                className={`text-left w-full py-2 px-4 rounded-lg truncate ${
                  chat.id === selectedChat?.id
                    ? 'bg-white text-gray-800'
                    : 'bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition'
                }`}
              >
                {chat.title}
              </button>
            )}
            <button
              onClick={() => setActiveMenu(chat.id === activeMenu ? null : chat.id)}
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
            >
              <FiMoreVertical />
            </button>
            {activeMenu === chat.id && (
              <div
                ref={menuRef}
                className="absolute right-0 top-8 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10"
              >
                <button
                  onClick={() => {
                    setEditingChatId(chat.id);
                    setNewTitle(chat.title);
                    setActiveMenu(null);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 flex items-center space-x-2">
        <FiLogOut className="text-red-600" />
        <button onClick={onLogout} className="text-red-600 font-semibold">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
