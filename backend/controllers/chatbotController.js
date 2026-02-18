const ChatHistory = require('../models/ChatHistory');
const Content = require('../models/Content');
const Section = require('../models/Section');

// Save message and get response
exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    let chatHistory = await ChatHistory.findOne({ sessionId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ sessionId, messages: [] });
    }
    
    chatHistory.messages.push({
      role: 'user',
      content: message
    });
    
    const botResponse = await generateBotResponse(message);
    
    chatHistory.messages.push({
      role: 'bot',
      content: botResponse
    });
    
    await chatHistory.save();
    
    res.json({ 
      response: botResponse,
      history: chatHistory.messages.slice(-20)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat history
exports.getHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({ 
      sessionId: req.params.sessionId 
    });
    res.json(chatHistory?.messages || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear chat history
exports.clearHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate bot response
async function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! 👋 I'm your learning assistant. How can I help you today?";
  }
  
  // Help
  if (lowerMessage.includes('help')) {
    return "I can help you with:\n📚 Finding courses\n❓ Answering questions\n🔍 Searching content\n📖 Explaining topics\n🎯 Learning recommendations\n\nWhat would you like to know?";
  }
  
  // Search in content
  try {
    const contents = await Content.find({
      $or: [
        { title: { $regex: message, $options: 'i' } },
        { theory: { $regex: message, $options: 'i' } }
      ]
    }).limit(3);
    
    if (contents.length > 0) {
      let response = "I found these topics that might help:\n\n";
      contents.forEach((content, index) => {
        response += `${index + 1}. **${content.title}**\n`;
        response += `   ${content.theory.substring(0, 100)}...\n\n`;
      });
      return response;
    }
    
    // Search in sections
    const sections = await Section.find({
      name: { $regex: message, $options: 'i' }
    }).limit(3).populate('categoryId');
    
    if (sections.length > 0) {
      let response = "Check out these sections:\n\n";
      sections.forEach((section, index) => {
        response += `${index + 1}. **${section.name}** (${section.categoryId?.name})\n`;
        response += `   ${section.description}\n\n`;
      });
      return response;
    }
    
    // Default responses based on keywords
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return "We have 10 main categories including Computer Science, Philosophy, Religion, Social Science, Language, Science, Technology, Arts, Literature, and History. Which one interests you?";
    }
    
    if (lowerMessage.includes('computer') || lowerMessage.includes('programming')) {
      return "In Computer Science, we have sections on Programming, Data Structures, Algorithms, Database, OS, Networks, AI, Cybersecurity, and more. What specific topic are you interested in?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! 😊 Feel free to ask if you need anything else.";
    }
    
    return "I'm not sure about that. Could you please rephrase or ask about specific courses, topics, or learning materials? You can also type 'help' to see what I can do.";
    
  } catch (error) {
    console.error('Search error:', error);
    return "I'm having trouble searching right now. Please try again later.";
  }
}