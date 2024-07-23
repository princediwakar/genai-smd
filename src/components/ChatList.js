import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, onSelectChat, onRenameChat, onDeleteChat }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {chats.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          onSelect={onSelectChat}
          onRename={onRenameChat}
          onDelete={onDeleteChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
