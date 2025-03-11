import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendMessage, getMessageHistory } from '../services/api';

type Message = {
  id: string;
  type: 'user' | 'assistant';
  content: string;
};

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m an AI assistant. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch message history when component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getMessageHistory();
        if (history.length > 0) {
          const formattedHistory: Message[] = [];
          
          history.forEach((item) => {
            formattedHistory.push({
              id: `user-${item.id}`,
              type: 'user',
              content: item.message
            });
            
            formattedHistory.push({
              id: `assistant-${item.id}`,
              type: 'assistant',
              content: item.response
            });
          });
          
          setMessages(formattedHistory);
        }
      } catch (error) {
        console.error('Failed to fetch message history', error);
      }
    };

    fetchHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to backend API
      const response = await sendMessage(content);
      
      // Add AI response
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'assistant',
        content: response.response
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
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
            <h1 className="text-xl font-semibold text-black">Chatskibidi</h1>
          </div>

          <button className="text-gray-500 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" 
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="py-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              type={message.type} 
              content={message.content} 
            />
          ))}
          {isLoading && (
            <ChatMessage 
              type="assistant" 
              content="" 
              isLoading={true} 
            />
          )}
          <div ref={messagesEndRef} className="h-16" />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white py-2 border-t border-gray-100">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer; 