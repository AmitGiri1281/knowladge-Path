import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaMinus,
  FaSpinner,
  FaSmile,
  FaBook,
  FaCode,
  FaLanguage,
  FaHistory,
  FaBrain,
  FaGlobe,
  FaQuestionCircle,
  FaLightbulb,
  FaCopy,
  FaCheck,
  FaThumbsUp,
  FaThumbsDown,
  FaRegSmile
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';

// Predefined responses for common questions
const predefinedResponses = {
  greetings: [
    "Hello! 👋 How can I assist you with your learning today?",
    "Hi there! Ready to learn something new?",
    "Greetings! I'm your Knowlade AI assistant. What would you like to explore?"
  ],
  farewells: [
    "Goodbye! Feel free to come back anytime you have questions!",
    "See you later! Happy learning! 📚",
    "Take care! Remember, I'm always here to help."
  ],
  thanks: [
    "You're welcome! 😊 Happy to help!",
    "Glad I could assist! Any other questions?",
    "My pleasure! That's what I'm here for."
  ],
  capabilities: [
    "I can help you with:\n" +
    "📚 Finding courses and topics\n" +
    "❓ Answering questions about concepts\n" +
    "🔍 Explaining difficult topics\n" +
    "🎯 Learning recommendations\n" +
    "📝 Summarizing content\n" +
    "💡 Study tips and techniques\n" +
    "📊 Tracking your progress\n\n" +
    "Just ask me anything!"
  ],
  computerScience: {
    programming: "Programming is the process of creating instructions for computers. Popular languages include:\n" +
      "• Python - Great for beginners\n" +
      "• JavaScript - For web development\n" +
      "• Java - Enterprise applications\n" +
      "• C++ - System programming\n\n" +
      "Would you like to learn more about a specific language?",
    algorithms: "Algorithms are step-by-step procedures for solving problems. Common types include:\n" +
      "• Sorting algorithms (QuickSort, MergeSort)\n" +
      "• Search algorithms (Binary Search)\n" +
      "• Graph algorithms (Dijkstra's)\n" +
      "• Dynamic programming\n\n" +
      "Which algorithm interests you?",
    dataStructures: "Data structures organize data efficiently. Key structures:\n" +
      "• Arrays - Contiguous memory\n" +
      "• Linked Lists - Dynamic size\n" +
      "• Trees - Hierarchical data\n" +
      "• Hash Tables - Fast lookup\n" +
      "• Stacks & Queues - LIFO/FIFO"
  },
  philosophy: {
    plato: "Plato was a Greek philosopher, student of Socrates. Key ideas:\n" +
      "• Theory of Forms - Ideal forms vs physical world\n" +
      "• The Allegory of the Cave\n" +
      "• The Republic - Ideal state\n" +
      "• Platonic love - Spiritual connection",
    aristotle: "Aristotle, student of Plato, founded logic. Contributions:\n" +
      "• Syllogistic logic\n" +
      "• Four causes\n" +
      "• Virtue ethics (Golden Mean)\n" +
      "• Politics - Man is political animal",
    ethics: "Ethics studies moral principles. Major approaches:\n" +
      "• Virtue Ethics (Aristotle)\n" +
      "• Deontology (Kant)\n" +
      "• Utilitarianism (Mill)\n" +
      "• Existentialism (Sartre)"
  },
  science: {
    physics: "Physics studies matter, energy, and their interactions. Branches:\n" +
      "• Classical Mechanics - Newton's laws\n" +
      "• Thermodynamics - Heat & energy\n" +
      "• Electromagnetism - Maxwell's equations\n" +
      "• Quantum Mechanics - Subatomic world\n" +
      "• Relativity - Einstein's theories",
    chemistry: "Chemistry studies matter and its transformations. Fields:\n" +
      "• Organic Chemistry - Carbon compounds\n" +
      "• Inorganic Chemistry - Other elements\n" +
      "• Physical Chemistry - Chemical physics\n" +
      "• Biochemistry - Life's chemistry",
    biology: "Biology studies life and living organisms. Topics:\n" +
      "• Cell Biology - Basic unit of life\n" +
      "• Genetics - DNA and heredity\n" +
      "• Evolution - Natural selection\n" +
      "• Ecology - Organisms & environment"
  }
};

// Response categories for better matching
const responseCategories = [
  { keywords: ['hello', 'hi', 'hey', 'greetings'], category: 'greetings' },
  { keywords: ['bye', 'goodbye', 'see you', 'later'], category: 'farewells' },
  { keywords: ['thanks', 'thank you', 'appreciate'], category: 'thanks' },
  { keywords: ['help', 'what can you do', 'capabilities', 'features'], category: 'capabilities' },
  { keywords: ['programming', 'code', 'coding', 'software'], category: 'computerScience', subcategory: 'programming' },
  { keywords: ['algorithm', 'sorting', 'searching'], category: 'computerScience', subcategory: 'algorithms' },
  { keywords: ['data structure', 'array', 'linked list', 'tree', 'graph'], category: 'computerScience', subcategory: 'dataStructures' },
  { keywords: ['plato', 'socrates'], category: 'philosophy', subcategory: 'plato' },
  { keywords: ['aristotle'], category: 'philosophy', subcategory: 'aristotle' },
  { keywords: ['ethics', 'moral', 'virtue'], category: 'philosophy', subcategory: 'ethics' },
  { keywords: ['physics', 'quantum', 'relativity', 'mechanics'], category: 'science', subcategory: 'physics' },
  { keywords: ['chemistry', 'organic', 'inorganic'], category: 'science', subcategory: 'chemistry' },
  { keywords: ['biology', 'cell', 'genetics', 'evolution'], category: 'science', subcategory: 'biology' }
];

// Suggested questions for quick access
const suggestedQuestions = [
  "What is programming?",
  "Explain Plato's philosophy",
  "Tell me about quantum physics",
  "What are data structures?",
  "Help me learn JavaScript",
  "What is ethics?",
  "Explain algorithms",
  "Tell me about Aristotle"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(uuidv4());

  // Listen for custom event to open chatbot
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
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await api.get(`/chatbot/history/${sessionId.current}`);
      if (response.data && response.data.length > 0) {
        setMessages(response.data);
        setShowSuggestions(false);
      } else {
        // Add welcome message if no history
        setMessages([{
          role: 'bot',
          content: getRandomResponse('greetings') + " I'm here to help you learn. What would you like to explore today?",
          timestamp: new Date(),
          id: uuidv4()
        }]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([{
        role: 'bot',
        content: "Hi! I'm your learning assistant. How can I help you today?",
        timestamp: new Date(),
        id: uuidv4()
      }]);
    }
  };

  const getRandomResponse = (category) => {
    const responses = predefinedResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findBestResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each category for keyword matches
    for (const cat of responseCategories) {
      if (cat.keywords.some(keyword => lowerMessage.includes(keyword))) {
        if (cat.subcategory) {
          return predefinedResponses[cat.category][cat.subcategory];
        } else {
          return getRandomResponse(cat.category);
        }
      }
    }
    
    // Default response if no match found
    return "That's an interesting question! I'm still learning about that topic. Could you please:\n\n" +
           "• Rephrase your question\n" +
           "• Ask about specific categories (Computer Science, Philosophy, Science, etc.)\n" +
           "• Or try one of the suggested questions below\n\n" +
           "I'm here to help! 😊";
  };

  const generateBotResponse = async (userMessage) => {
    // First try to find a predefined response
    const predefinedResponse = findBestResponse(userMessage);
    
    // If it's not a generic response, return it
    if (!predefinedResponse.includes("That's an interesting question")) {
      return predefinedResponse;
    }
    
    // If no predefined response, try the API
    try {
      const response = await api.post('/chatbot/message', {
        message: userMessage,
        sessionId: sessionId.current
      });
      return response.data.response;
    } catch (error) {
      console.error('API error:', error);
      return predefinedResponse; // Fallback to predefined response
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setShowSuggestions(false);
    
    // Add user message to UI
    const userMessageObj = {
      id: uuidv4(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessageObj]);
    
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(userMessage);
      
      setIsTyping(false);
      
      // Add bot response
      const botMessageObj = {
        id: uuidv4(),
        role: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessageObj]);
      
      // Save to API
      await api.post('/chatbot/message', {
        message: userMessage,
        response: botResponse,
        sessionId: sessionId.current
      }).catch(err => console.error('Error saving message:', err));
      
    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'bot',
        content: "I'm having trouble connecting. Please try again later.",
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
      setMessages([{
        id: uuidv4(),
        role: 'bot',
        content: getRandomResponse('greetings') + " How can I help you today?",
        timestamp: new Date()
      }]);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleSuggestionClick = (question) => {
    setInputMessage(question);
    setShowSuggestions(false);
    setTimeout(() => sendMessage(), 100);
  };

  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleFeedback = (messageId, type) => {
    setFeedbackGiven(prev => ({ ...prev, [messageId]: type }));
    // You could send this feedback to your backend
    console.log(`Feedback for ${messageId}: ${type}`);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:rotate-12 z-50 group"
        aria-label="Open chat assistant"
      >
        <FaRobot className="text-2xl" />
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
      sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px]
      ${isMinimized ? 'h-14 sm:h-14' : ''}`}
    >
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-none sm:rounded-t-lg flex justify-between items-center cursor-pointer hover:from-blue-700 hover:to-purple-700 transition"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FaRobot className="text-xl" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <div>
            <span className="font-semibold">Knowlade AI</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Online</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="hover:bg-white/20 p-1.5 rounded transition"
            aria-label={isMinimized ? "Expand" : "Minimize"}
          >
            <FaMinus className="text-sm" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="hover:bg-white/20 p-1.5 rounded transition"
            aria-label="Close"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start max-w-[85%] group">
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                      <FaRobot size={14} />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div
                      className={`p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      {msg.role === 'bot' ? (
                        <ReactMarkdown className="prose prose-sm max-w-none">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                        ))
                      )}
                    </div>
                    
                    {/* Message actions */}
                    {msg.role === 'bot' && (
                      <div className="flex items-center space-x-2 mt-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="text-xs text-gray-400 hover:text-blue-600"
                          title="Copy to clipboard"
                        >
                          {copiedMessageId === msg.id ? <FaCheck size={12} /> : <FaCopy size={12} />}
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, 'like')}
                          className={`text-xs ${feedbackGiven[msg.id] === 'like' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                          title="Helpful"
                        >
                          <FaThumbsUp size={12} />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, 'dislike')}
                          className={`text-xs ${feedbackGiven[msg.id] === 'dislike' ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                          title="Not helpful"
                        >
                          <FaThumbsDown size={12} />
                        </button>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-1">
                      {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-sm ml-2 flex-shrink-0">
                      <FaRegSmile size={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm mr-2">
                  <FaRobot size={14} />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(question)}
                      className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow transition"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-none sm:rounded-b-lg">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="w-full border border-gray-200 rounded-lg p-3 pr-10 resize-none 
                  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                  text-sm sm:text-base leading-relaxed"
                  style={{ maxHeight: "120px" }}
                />
                {inputMessage.trim() === '' && (
                  <FaRegSmile className="absolute right-3 bottom-3 text-gray-400" />
                )}
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none h-[52px] w-[52px] flex items-center justify-center"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
            
            {/* Clear history button */}
            {messages.length > 1 && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-400 hover:text-red-600 transition flex items-center"
                >
                  <FaTimes className="mr-1" size={10} />
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