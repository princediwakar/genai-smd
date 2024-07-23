import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [localChat, setLocalChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      const fetchedChats = [];
      querySnapshot.forEach((doc) => {
        fetchedChats.push({ id: doc.id, ...doc.data() });
      });
      setChats(fetchedChats);
      handleNewLocalChat();
    };
    fetchChats();
  }, []);

  const handleNewLocalChat = () => {
    const newChat = { id: Date.now().toString(), name: 'New Chat', messages: [] };
    setLocalChat(newChat);
    setCurrentChat(newChat);
  };

  const handleNewChat = async (chat) => {
    const newChatRef = doc(collection(db, 'chats'));
    await setDoc(newChatRef, chat);
    const savedChat = { id: newChatRef.id, ...chat };
    setChats([savedChat, ...chats]);
    setCurrentChat(savedChat);
    setLocalChat(null); // Clear the local chat
    return savedChat;
  };

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    setLocalChat(null); // Clear the local chat
  };

  const handleRenameChat = async (id, newName) => {
    if (typeof newName === 'string' && newName.trim() !== '') {
      const chatRef = doc(db, 'chats', id);
      await updateDoc(chatRef, { name: newName });
      setChats(chats.map(chat => chat.id === id ? { ...chat, name: newName } : chat));
    } else {
      console.error('Chat name must be a non-empty string');
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      const chatRef = doc(db, 'chats', id);
      await deleteDoc(chatRef);
      setChats(chats.filter(chat => chat.id !== id));
      if (currentChat?.id === id) {
        setCurrentChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        localChat={localChat}
        onNewChat={handleNewLocalChat}
        onSelectChat={handleSelectChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />
      {currentChat && <ChatWindow currentChat={currentChat} localChat={localChat} onSaveChat={handleNewChat} updateChatName={handleRenameChat} setCurrentChat={setCurrentChat} />}
    </div>
  );
};

export default Dashboard;
