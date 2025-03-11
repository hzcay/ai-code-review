import React from 'react';
import Image from 'next/image';

type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content, isLoading = false }) => {
  return (
    <div 
      className={`py-4 ${
        type === 'assistant' ? 'bg-bot-message' : 'bg-chat-bg'
      }`}
    >
      <div className="max-w-3xl mx-auto flex w-full px-4 sm:px-8">
        <div className="flex-shrink-0 mr-4">
          {type === 'user' ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path 
                  d="M16.5 7.5h-9v9h9v-9z" 
                />
                <path 
                  fillRule="evenodd" 
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="font-medium mb-1 text-sm text-black">
            {type === 'user' ? 'You' : 'AI Assistant'}
          </div>
          <div className={`rounded-chat p-3 ${
            type === 'user' ? 'bg-user-message border border-gray-200' : 'bg-white border border-gray-200'
          } shadow-message`}>
            {isLoading ? (
              <div className="flex space-x-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-black">
                {content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 