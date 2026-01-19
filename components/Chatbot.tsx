
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User, ChevronDown, Minimize2, Sparkles, MapPin, Phone, FileText, Home, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ChatOption {
  label: string;
  value: string;
  icon?: React.ElementType;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Professional Logic Tree - No AI
const BOT_RESPONSES: Record<string, { text: string; options: ChatOption[] }> = {
  root: {
    text: "Greetings! I'm Pearl, the Malnad Homes concierge.\n\nI can assist you with finding accommodation, listing properties, or understanding our rental services. How may I help you today?",
    options: [
      { label: "Find a Home", value: "find_home", icon: Home },
      { label: "List My Property", value: "list_property", icon: MapPin },
      { label: "Rental Agreements", value: "agreements", icon: FileText },
      { label: "Contact Support", value: "contact", icon: Phone }
    ]
  },
  
  // --- Find Home Branch ---
  find_home: {
    text: "Excellent choice. To help you better, please select who this accommodation is for. We categorize listings to ensure a perfect match.",
    options: [
      { label: "Student (PG/Hostel)", value: "find_student", icon: User },
      { label: "Family (House/Flat)", value: "find_family", icon: Home },
      { label: "Working Professional", value: "find_pro", icon: User },
      { label: "« Main Menu", value: "root" }
    ]
  },
  find_student: {
    text: "We have several verified PGs near St. Philomena and other colleges.\n\nNavigate to the 'Places' page and use the 'Type' filter to select 'PG' or 'Hostel'. You can also filter by 'Male' or 'Female' guests.",
    options: [
      { label: "Go to Places", value: "browse_link" },
      { label: "« Back", value: "find_home" }
    ]
  },
  find_family: {
    text: "For families, we recommend independent villas or apartments in residential areas like Bolwar and Darbe.\n\nPlease check the 'Places' section and look for the 'Villa' or 'Apartment' tags.",
    options: [
      { label: "Go to Places", value: "browse_link" },
      { label: "« Back", value: "find_home" }
    ]
  },
  find_pro: {
    text: "Professionals often prefer our serviced apartments or single-occupancy flats with high-speed Wi-Fi.\n\nUse the 'Amenities' filter on the Places page to select 'Wi-Fi' and 'Power Backup'.",
    options: [
      { label: "Go to Places", value: "browse_link" },
      { label: "« Back", value: "find_home" }
    ]
  },
  browse_link: {
    text: "To browse, simply click the 'Places' link in the top navigation bar. You can view photos, check amenities, and contact owners directly from there.",
    options: [
      { label: "« Main Menu", value: "root" }
    ]
  },

  // --- List Property Branch ---
  list_property: {
    text: "We'd love to have you as a partner! Listing on Malnad Homes is currently free.\n\nBenefits:\n• Verified tenant leads\n• Zero brokerage fees\n• Digital agreement support",
    options: [
      { label: "How to List?", value: "list_steps" },
      { label: "Owner Requirements", value: "list_reqs" },
      { label: "« Main Menu", value: "root" }
    ]
  },
  list_steps: {
    text: "It's a simple 3-step process:\n1. Create an account/Log in.\n2. Open the User Menu (top right) -> Select 'Owner Portal'.\n3. Click 'Upload Property' and fill in the details.\n\nOur admin team will verify and approve your listing within 24 hours.",
    options: [
      { label: "Owner Requirements", value: "list_reqs" },
      { label: "« Main Menu", value: "root" }
    ]
  },
  list_reqs: {
    text: "To ensure safety, we require:\n• Proof of ownership (Electricity bill/Tax receipt)\n• Clean, habitable conditions\n• Accurate photos\n\nWe may conduct a physical verification visit.",
    options: [
      { label: "How to List?", value: "list_steps" },
      { label: "« Main Menu", value: "root" }
    ]
  },

  // --- Services Branch ---
  agreements: {
    text: "We provide legally vetted rental agreement templates compliant with Karnataka rental laws. \n\nOnce you finalize a tenant/owner, you can generate a draft agreement directly from the dashboard.",
    options: [
      { label: "Is it legally binding?", value: "legal_info" },
      { label: "« Main Menu", value: "root" }
    ]
  },
  legal_info: {
    text: "Our templates are drafted by legal experts. However, for the agreement to be admissible in court, we recommend printing it on stamp paper and getting it notarized locally.",
    options: [
      { label: "« Main Menu", value: "root" }
    ]
  },

  // --- Support Branch ---
  contact: {
    text: "Our support team is available Mon-Sat, 9:00 AM to 6:00 PM.\n\n📍 Office: Nehru Nagar, Puttur\n📞 Phone: +91 9113869353\n📧 Email: malenaduhomes@gmail.com",
    options: [
      { label: "« Main Menu", value: "root" }
    ]
  }
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: BOT_RESPONSES['root'].text,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>(BOT_RESPONSES['root'].options);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleOptionClick = (option: ChatOption) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: option.label,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setCurrentOptions([]); // Hide options while processing
    setIsTyping(true);

    // 2. Simulate Bot Delay and Respond (Rule-Based)
    setTimeout(() => {
      const responseKey = option.value in BOT_RESPONSES ? option.value : 'root';
      const responseData = BOT_RESPONSES[responseKey];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.text,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setCurrentOptions(responseData.options);
      setIsTyping(false);
    }, 600); // Slight delay for natural feel
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center justify-center">
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95 group shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-2 ${
            isOpen 
              ? 'bg-slate-800 text-white rotate-90 shadow-slate-900/50 border-slate-700' 
              : 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-emerald-500/40 border-white/20'
          }`}
          aria-label="Toggle Support Chat"
        >
          {isOpen ? (
            <X className="h-6 w-6 md:h-7 md:w-7" />
          ) : (
            <MessageSquare className="h-6 w-6 md:h-7 md:w-7 animate-[pulse_3s_ease-in-out_infinite]" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`
          fixed z-[100] bg-gray-50 dark:bg-slate-950 overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col
          
          /* Mobile: Bottom Sheet */
          bottom-0 left-0 right-0 h-[85vh] rounded-t-[2rem]
          
          /* Desktop: Popover - Improved Positioning and Visibility */
          md:bottom-24 md:right-6 md:left-auto 
          md:w-[380px] 
          md:h-[600px] md:max-h-[calc(100vh-120px)]
          md:rounded-2xl 
          md:border md:border-slate-200 md:dark:border-slate-800
          md:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]

          ${isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full md:translate-y-10 opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        {/* Header (Fixed) */}
        <div className="h-16 bg-white dark:bg-slate-900 px-6 flex items-center justify-between border-b border-gray-100 dark:border-slate-800 shrink-0 shadow-sm relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-900/20 relative border border-emerald-400/20">
              <Bot className="h-6 w-6 text-white" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-sans font-bold text-slate-900 dark:text-white text-lg leading-none tracking-tight">Pearl</h3>
              <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                Concierge
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 -mr-2"
          >
            <ChevronDown className="h-5 w-5 md:hidden" />
            <Minimize2 className="h-4 w-4 hidden md:block" />
          </button>
        </div>

        {/* Messages Area (Flexible Scrollable) */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-5 space-y-6 bg-gray-50 dark:bg-slate-950 custom-scrollbar">
          <div className="text-center pt-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-gray-200 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                Today
             </span>
          </div>
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                msg.sender === 'user' 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-gray-300 dark:border-slate-700' 
                  : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-gray-200 dark:border-slate-800'
              }`}>
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              
              <div className={`max-w-[85%] py-3.5 px-5 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-emerald-900/10' 
                  : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end gap-2.5 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-gray-200 dark:border-slate-800">
                <Bot className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-4 px-5 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Options Area (Stacked at bottom, no overlay) */}
        <div className="shrink-0 p-4 pb-6 bg-white/95 dark:bg-slate-900/95 border-t border-gray-100 dark:border-slate-800 backdrop-blur-xl z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
           {!isTyping && currentOptions.length > 0 ? (
             <div className="flex flex-wrap gap-2.5 justify-center">
                {currentOptions.map((opt) => (
                   <button
                     key={opt.value}
                     onClick={() => handleOptionClick(opt)}
                     className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs md:text-sm font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all active:scale-95 shadow-sm hover:shadow-md"
                   >
                     {opt.icon && <opt.icon className="h-3.5 w-3.5 opacity-70" />}
                     {opt.label}
                   </button>
                ))}
             </div>
           ) : (
             <div className="text-center min-h-[40px] flex flex-col justify-center">
               {!isTyping && currentOptions.length === 0 && (
                 <button 
                    onClick={() => {
                        setMessages([{ id: 'reset', text: BOT_RESPONSES['root'].text, sender: 'bot', timestamp: new Date() }]);
                        setCurrentOptions(BOT_RESPONSES['root'].options);
                    }} 
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform hover:bg-emerald-500 mx-auto"
                 >
                    <RefreshCw className="h-3.5 w-3.5" /> Start New Chat
                 </button>
               )}
               {isTyping && <p className="text-xs text-slate-400 font-medium italic animate-pulse">Pearl is thinking...</p>}
             </div>
           )}
        </div>
      </div>
    </>
  );
};
