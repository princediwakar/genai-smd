import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImageModal from './ImageModal';

const ChatWindow = ({ currentChat, localChat, onSaveChat, updateChatName, setCurrentChat }) => {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setPrompt('');
    setReferenceImage(null);
    if (currentChat && currentChat.id) {
      fetchChatMessages(currentChat.id);
    }
  }, [currentChat, localChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChat?.messages?.length]);

  const fetchChatMessages = async (chatId) => {
    try {
      const chatDocRef = doc(db, 'chats', chatId);
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        updateChatName(chatId, chatData.name);
        currentChat.messages = chatData.messages;
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt || (!currentChat && !localChat)) return;

    const newMessage = {
        text: prompt,
        image: referenceImage,
        generatedImages: [
            'https://via.placeholder.com/600x400',
            'https://via.placeholder.com/600x400',
            'https://via.placeholder.com/600x400',
            'https://via.placeholder.com/600x400'
        ],
    };

    try {
        if (localChat) {
            const chatName = prompt.length > 20 ? `${prompt.substring(0, 20)}...` : prompt;
            const updatedChat = { ...localChat, messages: [newMessage], name: chatName };
            const savedChat = await onSaveChat(updatedChat);
            setPrompt('');
            setReferenceImage(null);
            setCurrentChat(savedChat); // Set the ID of the current chat to the newly saved chat's ID
        } else {
            const chatDocRef = doc(db, 'chats', currentChat.id);
            await updateDoc(chatDocRef, {
                messages: arrayUnion(newMessage)
            });
            // Update the currentChat state to reflect the new message
            setCurrentChat(prevChat => ({
                ...prevChat,
                messages: [...prevChat.messages, newMessage]
            }));
            setPrompt('');
            setReferenceImage(null);
        }
    } catch (error) {
        console.error('Error updating chat messages:', error);
    }

    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};

  const handleReferenceImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex-grow flex flex-col p-4 overflow-hidden bg-gray-700 text-white">
      <div className="flex-grow overflow-y-auto mb-4">
        <div className="flex flex-col items-center">
          {currentChat && currentChat.messages && currentChat.messages.length > 0 ? (
            currentChat.messages.map((message, index) => (
              <div key={index} className="message-container flex flex-col items-center mb-4">
                <div className="w-3/4 max-w-full p-2">
                  <div className="bg-gray-600 bg-opacity-50 backdrop-blur-lg border border-gray-500 rounded-lg p-4 shadow-lg">
                    <div className="text-left">
                      <p className="text-lg">{message.text}</p>
                      {message.image && (
                        <img src={message.image} alt="Reference" className="reference-image mt-2" />
                      )}
                    </div>
                    <div className="grid mt-2">
                      {message.generatedImages.map((image, imgIndex) => (
                        <LazyLoadImage
                          key={imgIndex}
                          src={image}
                          alt={`Generated ${imgIndex}`}
                          className="generated-image rounded-lg cursor-pointer"
                          effect="blur"
                          onClick={() => handleImageClick(image)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-400">Select a chat or start a new one.</p>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {referenceImage && (
        <div className="mb-4">
          <img src={referenceImage} alt="Reference Thumbnail" className="reference-image" />
        </div>
      )}
      <div className="input-container">
        <div className="flex items-center space-x-2">
          <label className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleReferenceImageUpload}
            />
            📁
          </label>
          <input
            type="text"
            placeholder="Enter your design prompt..."
            className="input-field flex-grow"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleGenerate}
            className="bg-purple-500 text-white p-3 rounded-lg"
          >
            ➤
          </button>
        </div>
      </div>
      <ImageModal
        imageSrc={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ChatWindow;
