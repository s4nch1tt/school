"use client";
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! I am the school AI assistant. Ask me about admissions, results, or school timings.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let botResponse = "I'm not sure about that. Please contact the school office.";
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.includes('admission')) {
        botResponse = "Admissions are currently open for Class 1 to 9. You can download the form from the Admissions page.";
      } else if (lowerInput.includes('fee') || lowerInput.includes('cost')) {
        botResponse = "The fee structure varies by class. Please check the 'Academics' section for the detailed fee chart.";
      } else if (lowerInput.includes('principal')) {
        botResponse = "Our Principal is Sri M.L. Dhruw (M.A., B.Ed).";
      } else if (lowerInput.includes('time') || lowerInput.includes('hour')) {
        botResponse = "School timings are 7:30 AM to 1:30 PM for all classes.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all z-50 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-primary-700 text-white p-4 rounded-t-xl flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <div>
              <h3 className="font-bold">School Assistant</h3>
              <p className="text-xs text-primary-200">AI Powered</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm rounded-bl-none">
                   <div className="flex space-x-1">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                   </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
