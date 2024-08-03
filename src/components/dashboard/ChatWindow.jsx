import React, { useState, useEffect } from 'react';
import { FiImage, FiSend, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { db, auth } from '../../firebase/config';
import { collection, getDoc, addDoc, doc, updateDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logo from '../logo.svg';

const ChatWindow = ({ selectedChat, refreshChats, setSelectedChat }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user && selectedChat) {
      fetchMessages();
    }
  }, [user, selectedChat]);

  useEffect(() => {
    if (selectedChat && selectedChat.id) {
      const unsubscribe = onSnapshot(doc(db, 'chats', selectedChat.id), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages || []);
        }
      });
      return () => unsubscribe();
    }
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat || !selectedChat.id) return;
    const docRef = doc(db, 'chats', selectedChat.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMessages(docSnap.data().messages || []);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const newImage = 'https://via.placeholder.com/150'; // Placeholder for generated image
    const newMessage = {
      prompt,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      generatedImages: [newImage, newImage, newImage, newImage], // Example images
      createdAt: Timestamp.now(),
      sender: 'user',
    };

    let newChatId = null;

    try {
      if (selectedChat && selectedChat.id) {
        const docRef = doc(db, 'chats', selectedChat.id);
        await updateDoc(docRef, {
          messages: [newMessage, ...messages],
        });

        if (selectedChat.title === 'New Chat') {
          await updateDoc(docRef, {
            title: selectedChat.messages.length === 0 ? prompt : selectedChat.title,
          });
        }
      } else {
        const newChat = {
          title: prompt,
          userId: user.uid,
          createdAt: Timestamp.now(),
          messages: [newMessage],
        };
        const docRef = await addDoc(collection(db, 'chats'), newChat);
        newChatId = docRef.id;
        setSelectedChat({ id: newChatId, ...newChat });
      }

      const snapmydesignResponse = {
        ...newMessage,
        sender: 'snapmydesign',
        generatedImages: [newImage, newImage, newImage, newImage],
      };

      if (selectedChat && selectedChat.id) {
        const docRef = doc(db, 'chats', selectedChat.id);
        await updateDoc(docRef, {
          messages: [newMessage, snapmydesignResponse, ...messages],
        });
      } else {
        const docRef = doc(db, 'chats', newChatId);
        await updateDoc(docRef, {
          messages: [newMessage, snapmydesignResponse],
        });
      }

      setMessages([newMessage, snapmydesignResponse, ...messages]);
    } catch (error) {
      console.error('Error updating messages:', error);
    }

    setPrompt('');
    setImage(null);
    setImageFile(null);

    if (newChatId) {
      refreshChats();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col h-screen ml-64 p-6 overflow-hidden">
      <div className="fixed top-0 left-64 right-0 p-6 z-10 bg-white dark:bg-gray-800">
        <div className="relative mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-4 pr-12 border rounded-lg bg-transparent dark:bg-transparent text-gray-800 dark:text-gray-300"
            placeholder="Enter your prompt..."
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-image"
          />
          <label htmlFor="upload-image" className="absolute left-0 top-0 bottom-0 flex items-center pl-4 cursor-pointer">
            <FiImage className="text-gray-600 dark:text-gray-400" />
          </label>
          <button
            onClick={handleGenerate}
            className="absolute right-0 top-0 bottom-0 flex items-center pr-4"
          >
            <FiSend className="text-primary dark:text-primary-light" />
          </button>
        </div>
        {image && (
          <div className="mb-4">
            <img src={image} alt="Reference" className="w-16 h-16 rounded-lg shadow-lg" />
          </div>
        )}
      </div>
      <div className="mt-32 flex-grow overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            {msg.sender === 'user' && (
              <>
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full" />
                    ) : (
                      <FiUser className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex-grow">
                    <p className="text-gray-800 dark:text-gray-300">{msg.prompt}</p>
                    {msg.image && (
                      <div className="mt-2">
                        <img src={msg.image} alt="Reference" className="w-16 h-16 rounded-lg shadow-lg" />
                      </div>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {msg.createdAt ? format(msg.createdAt.toDate(), 'PPPpp') : ''}
                    </p>
                  </div>
                </div>
                {msg.generatedImages && (
                  <div className="flex items-start space-x-4 w-full mt-2">
                    <div className="flex-shrink-0">
                      <img src={Logo} alt="SnapMyDesign Logo" className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex-grow">
                      <div className="grid grid-cols-2 gap-2">
                        {msg.generatedImages.map((img, imgIndex) => (
                          <img key={imgIndex} src={img} alt={`Generated ${imgIndex}`} className="w-24 h-24 rounded-lg shadow-lg" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {msg.createdAt ? format(msg.createdAt.toDate(), 'PPPpp') : ''}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
