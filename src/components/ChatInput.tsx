import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 sm:px-8 sm:pb-8">
      <div className="relative shadow-input rounded-chat border border-gray-300 bg-white transition-all hover:border-gray-400">
        <form onSubmit={handleSubmit} className="flex">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isLoading}
            rows={1}
            className="flex-grow p-3 focus:outline-none resize-none max-h-[200px] rounded-l-chat text-black"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`rounded-full w-9 h-9 flex items-center justify-center self-end mb-2 mr-2 ${
              !message.trim() || isLoading 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-black text-white hover:bg-gray-800'
            } transition-colors`}
          >
            <SendIcon isLoading={isLoading} />
          </button>
        </form>
        <div className="absolute -bottom-5 right-0 text-xs text-gray-500 leading-tight px-1 bg-white">
          Press Enter to send
        </div>
      </div>
      <div className="text-center text-xs text-black mt-6 pt-1.5">
        AI may produce inaccurate information about people, places, or facts.
      </div>
    </div>
  );
};

const SendIcon = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
};

export default ChatInput; 