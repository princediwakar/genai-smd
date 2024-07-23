import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const ChatItem = ({ chat, onSelect, onRename, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(chat.name);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleRename = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleRenameSubmit = () => {
    if (typeof newName === 'string' && newName.trim() !== '') {
      onRename(chat.id, newName);
      setIsEditing(false);
    } else {
      alert('Chat name must be a non-empty string');
    }
  };

  const handleDelete = () => {
    onDelete(chat.id);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative p-4 cursor-pointer hover:bg-gray-700">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRenameSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
          className="bg-gray-700 text-white p-2 rounded w-full"
          autoFocus
        />
      ) : (
        <div className="flex justify-between items-center">
          <span onClick={() => onSelect(chat)}>{chat.name}</span>
          <FiMoreVertical onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white cursor-pointer" />
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-0 top-0 mt-8 w-32 bg-gray-800 rounded shadow-lg z-50">
              <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={handleRename}>Rename</div>
              <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={handleDelete}>Delete</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
