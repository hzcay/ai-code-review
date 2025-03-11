import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-white text-black z-30 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out shadow-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:sticky lg:top-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <button 
              className="flex items-center justify-center gap-2 py-2.5 px-4 w-full rounded-chat border border-gray-300 hover:bg-sidebar-hover transition-colors"
              onClick={() => {}}
            >
              <span className="font-medium">New chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm text-gray-600 mb-3 px-2 font-medium">Recent conversations</h2>
              <ul className="space-y-1">
                {[
                  'How to build a chatbot',
                  'React vs Angular',
                  'Best practices for TypeScript',
                  'Modern UI design tips',
                ].map((title, index) => (
                  <li key={index}>
                    <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-sidebar-hover transition-colors flex items-start group">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      <span className="truncate">{title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-medium">
                U
              </div>
              <div>
                <div className="font-medium">User Account</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 