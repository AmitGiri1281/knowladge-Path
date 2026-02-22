import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaMinus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api'; // Import api service instead of axios directly

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(uuidv4());

  // Listen for custom event to open chatbot from navbar
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    
    window.addEventListener('openChatbot', handleOpenChatbot);
    
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  // Load chat history when opened
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await api.get(`/chatbot/history/${sessionId.current}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
      // If error, just start with empty chat
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    
    // Add user message to UI immediately
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    }]);
    
    setIsTyping(true);

    try {
      const response = await api.post('/chatbot/message', {
        message: userMessage,
        sessionId: sessionId.current
      });

      setIsTyping(false);
      
      // Update with full history from server
      if (response.data.history) {
        setMessages(response.data.history);
      } else if (response.data.response) {
        // Add bot response if only response is returned
        setMessages(prev => [...prev, {
          role: 'bot',
          content: response.data.response,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      
      // Add fallback response on error
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearHistory = async () => {
    try {
      await api.delete(`/chatbot/history/${sessionId.current}`);
      setMessages([]);
      // Add welcome message back
      setMessages([{
        role: 'bot',
        content: "Hi! I'm your learning assistant. How can I help you today?",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 group"
        aria-label="Open chat assistant"
      >
        <FaRobot className="text-2xl group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
 <div
  className={`fixed z-50 flex flex-col
  bg-white shadow-2xl
  transition-all duration-300
  rounded-none sm:rounded-lg
  bottom-0 right-0 w-full h-full
  sm:bottom-6 sm:right-6 sm:w-96 sm:h-[550px]
  ${isMinimized ? 'h-14 sm:h-14' : ''}`}
>
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-none sm:rounded-t-lg flex justify-between items-center cursor-pointer hover:from-blue-700 hover:to-purple-700 transition"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center space-x-2">
          <FaRobot className="text-xl" />
          <div>
            <span className="font-semibold">Knowlade AI</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Assistant</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="hover:bg-white/20 p-1 rounded transition"
            aria-label={isMinimized ? "Expand" : "Minimize"}
          >
            <FaMinus className="text-sm" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="hover:bg-white/20 p-1 rounded transition"
            aria-label="Close"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaRobot className="text-4xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hi! I'm your AI assistant</h3>
                <p className="text-sm text-gray-600 mb-4">I can help you with:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded-lg">📚 Finding courses and topics</div>
                  <div className="bg-purple-50 p-2 rounded-lg">❓ Answering questions</div>
                  <div className="bg-green-50 p-2 rounded-lg">🔍 Explaining concepts</div>
                  <div className="bg-orange-50 p-2 rounded-lg">🎯 Learning recommendations</div>
                </div>
                <p className="text-xs text-gray-400 mt-4">Ask me anything!</p>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                      }`}
                    >
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                    </div>
                  </div>
                ))}
              </>
            )}
            
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-none sm:rounded-b-lg">
            <div className="flex items-center space-x-2">
             <textarea
  value={inputMessage}
  onChange={(e) => {
    setInputMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
  onKeyDown={handleKeyPress}
  placeholder="Type your message..."
  rows={1}
  className="flex-1 w-full border border-gray-200 rounded-lg p-3 resize-none 
  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
  text-sm sm:text-base leading-relaxed"
  style={{ maxHeight: "120px" }}
/>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
            
            {/* Clear history button (only show if there are messages) */}
            {messages.length > 0 && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-500 hover:text-red-600 transition"
                >
                  Clear conversation
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;