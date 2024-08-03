import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import ChatWindow from '../components/dashboard/ChatWindow';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    const q = query(collection(db, 'chats'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedChats = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setChats(fetchedChats);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleNewChat = () => {
    const newChat = {
      title: 'New Chat',
      userId: user.uid,
      createdAt: new Date(),
      messages: [],
    };
    setSelectedChat(newChat);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 dark:bg-gray-800">
        <Sidebar
          chats={chats}
          selectedChat={selectedChat}
          selectChat={setSelectedChat}
          onLogout={handleLogout}
          onNewChat={handleNewChat}
          refreshChats={fetchChats}
        />
      </div>
      <div className="flex-grow bg-white dark:bg-gray-900">
        <ChatWindow selectedChat={selectedChat} refreshChats={fetchChats} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  );
};

export default Dashboard;
