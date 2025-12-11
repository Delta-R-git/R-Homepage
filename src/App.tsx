import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  Edit3, 
  Check, 
  Moon, 
  Sun, 
  LayoutGrid, 
  Github, 
  Twitter, 
  Youtube, 
  Mail,
  Globe,
  FileText,
  Save,
  Trash2,
  Calendar as CalendarIcon,
  Cloud,
  Minimize2,
  Activity,
  MessageSquare,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

// --- Default Data & Types ---

const DEFAULT_LINKS = [
  { id: '1', title: 'GitHub', url: 'https://github.com', icon: 'Github', color: 'from-purple-500 to-indigo-500' },
  { id: '2', title: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', color: 'from-red-500 to-orange-500' },
  { id: '3', title: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', color: 'from-blue-400 to-sky-400' },
  { id: '4', title: 'Gmail', url: 'https://gmail.com', icon: 'Mail', color: 'from-emerald-400 to-teal-500' },
];

const SEARCH_ENGINES = [
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
];

const DEFAULT_CHATBOTS = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'MessageSquare', color: 'bg-emerald-500' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', icon: 'Sparkles', color: 'bg-blue-500' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', icon: 'Brain', color: 'bg-orange-500' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'Zap', color: 'bg-teal-500' },
];

// Ensure all icon strings used in data are mapped here
const ICONS: Record<string, any> = { 
  Github, 
  Twitter, 
  Youtube, 
  Mail, 
  LayoutGrid, 
  Globe, 
  MessageSquare, 
  Sparkles, 
  Brain, 
  Zap 
};

// --- Helper Functions ---

const getIconFromUrl = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('github')) return 'Github';
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return 'Twitter';
  if (lowerUrl.includes('youtube')) return 'Youtube';
  if (lowerUrl.includes('mail') || lowerUrl.includes('gmail')) return 'Mail';
  // Chatbot specific detection
  if (lowerUrl.includes('openai') || lowerUrl.includes('chatgpt')) return 'MessageSquare';
  if (lowerUrl.includes('gemini') || lowerUrl.includes('bard')) return 'Sparkles';
  if (lowerUrl.includes('claude') || lowerUrl.includes('anthropic')) return 'Brain';
  if (lowerUrl.includes('perplexity')) return 'Zap';
  
  return 'Globe';
};

const getColorFromUrl = (url: string) => {
  const lowerUrl = url.toLowerCase();
  // Chatbots usually use solid bg colors in this design
  if (lowerUrl.includes('openai')) return 'bg-emerald-500';
  if (lowerUrl.includes('gemini')) return 'bg-blue-500';
  if (lowerUrl.includes('claude')) return 'bg-orange-500';
  if (lowerUrl.includes('perplexity')) return 'bg-teal-500';

  // Fallbacks for gradients (links)
  if (lowerUrl.includes('github')) return 'from-neutral-600 to-neutral-800';
  if (lowerUrl.includes('youtube')) return 'from-red-500 to-orange-600';
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return 'from-blue-400 to-sky-500';
  if (lowerUrl.includes('gmail')) return 'from-emerald-400 to-teal-500';
  return 'from-indigo-500 to-purple-600';
};

// --- Helper Components ---

const MinimalClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-xl md:text-2xl font-bold tracking-widest opacity-80">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

const CalendarWidget = ({ isDark, onClick }: { isDark: boolean, onClick: () => void }) => {
  const date = new Date();
  const currentDay = date.getDate();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="h-full w-full flex items-center justify-between cursor-pointer px-2" onClick={onClick}>
      {/* Left Side: Date */}
      <div className="flex flex-col justify-center h-full">
        <h3 className="text-4xl font-bold tracking-tight">{date.toLocaleDateString([], { weekday: 'long' })}</h3>
        <p className="text-lg opacity-60 font-medium">{date.toLocaleDateString([], { month: 'long', day: 'numeric' })}</p>
      </div>
      
      {/* Right Side: Mini Grid */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] opacity-80 w-48">
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="font-bold opacity-50">{d}</div>)}
          {emptyDays.map(d => <div key={`empty-${d}`} />)}
          {days.slice(0, 14).map(d => ( 
             <div key={d} className={`w-5 h-5 flex items-center justify-center rounded-full ${d === currentDay ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : ''}`}>
               {d}
             </div>
          ))}
          <div className="col-span-7 text-right opacity-40 mt-1 mr-2">...</div>
        </div>
      </div>
    </div>
  );
};

const ExpandedCalendar = ({ isDark, onClose }: { isDark: boolean, onClose: () => void }) => {
  const date = new Date();
  const currentDay = date.getDate();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-lg p-8 rounded-3xl relative shadow-2xl ${isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white'}`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-500/10">
          <Minimize2 size={20} />
        </button>
        
        <h2 className="text-4xl font-bold mb-8 text-center">{date.toLocaleDateString([], { month: 'long', year: 'numeric' })}</h2>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold text-sm mb-2 opacity-50">{d}</div>)}
          {emptyDays.map(d => <div key={`empty-${d}`} />)}
          {days.map(d => (
             <div 
               key={d} 
               className={`aspect-square flex items-center justify-center rounded-xl text-lg font-medium transition-all hover:scale-110
                 ${d === currentDay 
                   ? (isDark ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/50') 
                   : 'hover:bg-neutral-500/10'}
               `}
             >
               {d}
             </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Chatbot Modal with Customization ---

interface Chatbot {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

const ChatbotModal = ({ 
  isDark, 
  onClose, 
  chatbots, 
  editMode,
  onAdd,
  onUpdate,
  onDelete 
}: { 
  isDark: boolean; 
  onClose: () => void;
  chatbots: Chatbot[];
  editMode: boolean;
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-2xl p-6 rounded-3xl relative shadow-2xl flex flex-col gap-6 ${isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="text-indigo-500" /> AI Assistants
            {editMode && <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-full">Edit Mode</span>}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-500/10">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {chatbots.map((bot) => {
            const IconComp = ICONS[bot.icon] || MessageSquare;
            return (
              <div
                key={bot.id}
                className={`relative p-4 rounded-2xl flex flex-col items-center gap-3 transition-all border
                  ${isDark 
                    ? 'bg-neutral-950 border-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200'}
                  ${!editMode ? 'hover:scale-105 hover:border-neutral-400 cursor-pointer' : ''}
                `}
                onClick={() => !editMode && window.open(bot.url, '_blank')}
              >
                {editMode && (
                   <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(bot.id); }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors z-10"
                   >
                     <X size={14} />
                   </button>
                )}

                <div className={`p-3 rounded-full text-white ${bot.color.startsWith('bg-') ? bot.color : 'bg-neutral-500'}`}>
                  <IconComp size={24} />
                </div>
                
                {editMode ? (
                  <div className="flex flex-col gap-2 w-full">
                    <input 
                       value={bot.name}
                       onChange={(e) => onUpdate(bot.id, 'name', e.target.value)}
                       className="text-center bg-transparent border-b border-neutral-500/30 text-sm font-medium w-full outline-none pb-1"
                       placeholder="Name"
                       onClick={e => e.stopPropagation()}
                    />
                     <input 
                       value={bot.url}
                       onChange={(e) => onUpdate(bot.id, 'url', e.target.value)}
                       className="text-center bg-transparent border-b border-neutral-500/30 text-xs text-neutral-500 w-full outline-none pb-1"
                       placeholder="https://"
                       onClick={e => e.stopPropagation()}
                    />
                  </div>
                ) : (
                  <span className="font-medium text-center">{bot.name}</span>
                )}
              </div>
            );
          })}

          {/* Add Button in Edit Mode */}
          {editMode && (
            <button
              onClick={onAdd}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all
                ${isDark 
                  ? 'border-neutral-800 text-neutral-600 hover:border-neutral-600 hover:text-neutral-400' 
                  : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500'}
              `}
            >
              <Plus size={32} />
              <span className="text-sm font-medium">Add Bot</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [chatbotModalOpen, setChatbotModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [chatbots, setChatbots] = useState(DEFAULT_CHATBOTS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');
  
  // Persist State
  useEffect(() => {
    const storedLinks = localStorage.getItem('custom-home-links');
    const storedChatbots = localStorage.getItem('custom-home-chatbots');
    const storedTheme = localStorage.getItem('custom-home-theme');
    const storedNotes = localStorage.getItem('custom-home-notes');
    const storedEngine = localStorage.getItem('custom-home-engine');
    
    if (storedLinks) setLinks(JSON.parse(storedLinks));
    if (storedChatbots) setChatbots(JSON.parse(storedChatbots));
    if (storedTheme) setIsDark(storedTheme === 'dark');
    if (storedNotes) setNotes(storedNotes);
    if (storedEngine) setSearchEngine(storedEngine);
  }, []);

  useEffect(() => {
    localStorage.setItem('custom-home-links', JSON.stringify(links));
    localStorage.setItem('custom-home-chatbots', JSON.stringify(chatbots));
    localStorage.setItem('custom-home-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('custom-home-notes', notes);
    localStorage.setItem('custom-home-engine', searchEngine);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [links, chatbots, isDark, notes, searchEngine]);

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    const engine = SEARCH_ENGINES.find(e => e.id === searchEngine) || SEARCH_ENGINES[0];
    const url = `${engine.url}${encodeURIComponent(searchQuery)}`;
    
    // Open in new tab
    window.open(url, '_blank');
  };

  // Link Handlers
  const deleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const addLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: 'New Site',
      url: '',
      icon: 'Globe',
      color: 'from-gray-500 to-gray-600'
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: 'title' | 'url', value: string) => {
    setLinks(links.map(l => {
      if (l.id !== id) return l;
      const updated = { ...l, [field]: value };
      if (field === 'url') {
        updated.icon = getIconFromUrl(value);
        updated.color = getColorFromUrl(value);
        if (updated.title === 'New Site' || updated.title === '') {
           try {
             const domain = new URL(value.startsWith('http') ? value : `https://${value}`).hostname;
             updated.title = domain.replace('www.', '').split('.')[0];
             updated.title = updated.title.charAt(0).toUpperCase() + updated.title.slice(1);
           } catch (e) { }
        }
      }
      return updated;
    }));
  };

  // Chatbot Handlers
  const addChatbot = () => {
    const newBot = {
      id: Date.now().toString(),
      name: 'New Bot',
      url: '',
      icon: 'MessageSquare',
      color: 'bg-neutral-500'
    };
    setChatbots([...chatbots, newBot]);
  };

  const deleteChatbot = (id: string) => {
    setChatbots(chatbots.filter(b => b.id !== id));
  };

  const updateChatbot = (id: string, field: string, value: string) => {
    setChatbots(chatbots.map(b => {
      if (b.id !== id) return b;
      const updated = { ...b, [field]: value };
      
      // Auto-update icon and color based on URL if changed
      if (field === 'url') {
        updated.icon = getIconFromUrl(value);
        const newColor = getColorFromUrl(value);
        // Ensure we get a solid background color for chatbots, not a gradient
        updated.color = newColor.startsWith('bg-') ? newColor : 'bg-indigo-500';
        
        if (updated.name === 'New Bot' || updated.name === '') {
           try {
             const domain = new URL(value.startsWith('http') ? value : `https://${value}`).hostname;
             let name = domain.replace('www.', '').split('.')[0];
             name = name.charAt(0).toUpperCase() + name.slice(1);
             updated.name = name;
           } catch (e) { }
        }
      }
      return updated;
    }));
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ease-in-out font-sans ${isDark ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-900'}`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-1/2 -left-1/2 w-[100rem] h-[100rem] opacity-20 blur-[120px] rounded-full mix-blend-screen transition-colors duration-1000 ${isDark ? 'bg-indigo-900/40' : 'bg-blue-200/60'}`} />
        <div className={`absolute top-1/2 -right-1/2 w-[80rem] h-[80rem] opacity-20 blur-[100px] rounded-full mix-blend-screen transition-colors duration-1000 ${isDark ? 'bg-purple-900/30' : 'bg-orange-200/60'}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-16 flex flex-col gap-8">
        
        {/* Header / Controls */}
        <header className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <MinimalClock />
          </motion.div>

          <div className="flex gap-3">
             <button 
              onClick={() => setShowNotes(true)}
              className={`p-3 rounded-full transition-all duration-300 relative ${showNotes ? 'bg-amber-500 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-500'}`}
              title="Quick Notes"
            >
              <FileText size={20} />
            </button>

            <button 
              onClick={() => setEditMode(!editMode)}
              className={`p-3 rounded-full transition-all duration-300 ${editMode ? 'bg-indigo-600 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-500'}`}
              title="Edit Layout"
            >
              {editMode ? <Check size={20} /> : <Edit3 size={20} />}
            </button>

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-500 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* NOTES SIDE DRAWER (Half Page) */}
        <AnimatePresence>
          {showNotes && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowNotes(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`fixed top-0 right-0 h-full w-full md:w-1/2 z-50 p-8 shadow-2xl flex flex-col gap-4
                  ${isDark ? 'bg-neutral-900 border-l border-neutral-800' : 'bg-white border-l border-neutral-200'}
                `}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold flex items-center gap-2"><FileText /> Quick Notes</h2>
                  <div className="flex gap-2">
                    <button onClick={() => setNotes('')} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors" title="Clear All">
                      <Trash2 size={20} />
                    </button>
                    <button onClick={() => setShowNotes(false)} className="p-2 hover:bg-neutral-500/10 rounded-full">
                      <X size={24} />
                    </button>
                  </div>
                </div>
                
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type your ideas, todo lists, or paste links here..."
                  className={`flex-1 w-full bg-transparent resize-none outline-none text-base font-mono leading-relaxed p-4 rounded-xl
                    ${isDark ? 'text-neutral-300 placeholder-neutral-700 bg-black/20' : 'text-neutral-700 placeholder-neutral-400 bg-neutral-50'}
                  `}
                  autoFocus
                />
                <div className="text-xs opacity-40 text-center">
                  Notes are automatically saved to local storage
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* EXPANDED CALENDAR MODAL */}
        <AnimatePresence>
          {calendarOpen && <ExpandedCalendar isDark={isDark} onClose={() => setCalendarOpen(false)} />}
        </AnimatePresence>

        {/* CHATBOT MODAL */}
        <AnimatePresence>
          {chatbotModalOpen && (
            <ChatbotModal 
              isDark={isDark} 
              onClose={() => setChatbotModalOpen(false)}
              chatbots={chatbots}
              editMode={editMode}
              onAdd={addChatbot}
              onUpdate={updateChatbot}
              onDelete={deleteChatbot}
            />
          )}
        </AnimatePresence>

        {/* Search Section */}
        <section className="flex flex-col items-center justify-center gap-4 mt-4">
          <motion.div 
            layout 
            className="w-full max-w-2xl relative group"
          >
            <div className={`absolute -inset-1 rounded-2xl opacity-25 blur-lg transition duration-500 group-hover:opacity-50 ${isDark ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-400 to-emerald-400'}`}></div>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder={`Search ${SEARCH_ENGINES.find(e => e.id === searchEngine)?.name || 'Web'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-4 pl-12 pr-6 rounded-2xl text-lg outline-none transition-all shadow-xl
                  ${isDark 
                    ? 'bg-neutral-950/90 text-white border border-neutral-800 placeholder-neutral-600 focus:border-neutral-600' 
                    : 'bg-white/90 text-neutral-800 border border-neutral-200 placeholder-neutral-400 focus:border-blue-300'}
                `}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <button type="submit" className="hidden"></button>
            </form>
          </motion.div>

          {/* Search Engine Selector (Visible in Edit Mode) */}
          <AnimatePresence>
            {editMode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-2 p-2 rounded-xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                {SEARCH_ENGINES.map((engine) => (
                  <button
                    key={engine.id}
                    onClick={() => setSearchEngine(engine.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
                      ${searchEngine === engine.id 
                        ? (isDark ? 'bg-indigo-600 text-white' : 'bg-blue-500 text-white') 
                        : (isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500')}
                    `}
                  >
                    {engine.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* WIDGETS ROW (Top) */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]"
        >
             {/* Calendar Card (Double Width) */}
             <motion.div 
                onClick={() => setCalendarOpen(true)}
                className={`col-span-1 md:col-span-2 row-span-1 p-6 rounded-3xl relative overflow-hidden group
                  ${isDark ? 'bg-neutral-950 border border-neutral-900 hover:border-indigo-500/50' : 'bg-white shadow-xl shadow-neutral-200/50 border border-white hover:border-blue-300'}
                  transition-colors duration-300
                `}
                whileHover={{ scale: 1.01 }}
              >
                 <CalendarWidget isDark={isDark} onClick={() => setCalendarOpen(true)} />
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
              </motion.div>

              {/* Chatbots Card (Replaced Weather) */}
              <motion.div 
                onClick={() => setChatbotModalOpen(true)}
                className={`col-span-1 row-span-1 p-4 rounded-3xl flex flex-col justify-between items-center text-center relative overflow-hidden cursor-pointer
                  ${isDark ? 'bg-neutral-950 border border-neutral-900 hover:border-emerald-500/50' : 'bg-white shadow-xl shadow-neutral-200/50 border border-white hover:border-emerald-300'}
                  transition-colors duration-300
                `}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                   <MessageSquare className="text-emerald-500 mb-2" size={32} />
                   <span className="text-sm font-medium opacity-60">AI Chat</span>
                </div>
              </motion.div>

              {/* System/Status Card (Single Width) */}
              <motion.div 
                className={`col-span-1 row-span-1 p-5 rounded-3xl flex flex-col justify-between relative overflow-hidden cursor-pointer
                  ${isDark ? 'bg-neutral-900 text-white border border-neutral-800' : 'bg-neutral-900 text-white shadow-xl shadow-neutral-900/20'}
                `}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 text-neutral-400">System</span>
                  <Activity size={18} className="text-green-500 opacity-80" />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-2 overflow-hidden">
                       <div className="bg-green-500 h-full w-[60%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <span className="text-xs font-bold block opacity-90">CPU Usage: Normal</span>
                </div>
              </motion.div>
        </motion.div>

        {/* LINKS ROW (Bottom - Matching Grid) */}
        <Reorder.Group 
            axis="y" 
            values={links} 
            onReorder={setLinks} 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
            <AnimatePresence>
              {links.map((link) => {
                const IconComp = ICONS[link.icon] || Globe;
                return (
                  <Reorder.Item
                    key={link.id}
                    value={link}
                    drag={editMode}
                    whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className={`relative group h-[160px] rounded-3xl p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-300
                      ${editMode ? 'cursor-grab active:cursor-grabbing border-2 border-dashed border-indigo-500/30' : 'cursor-pointer'}
                      ${isDark 
                        ? 'bg-neutral-950 border border-neutral-900 hover:border-neutral-700' 
                        : 'bg-white shadow-lg shadow-neutral-100 border border-neutral-100 hover:shadow-xl'}
                    `}
                  >
                    {editMode && (
                      <button 
                        onPointerDown={(e) => { e.stopPropagation(); deleteLink(link.id); }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded-full z-20 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}

                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${link.color} text-white shadow-lg`}>
                      <IconComp size={28} />
                    </div>
                    
                    {editMode ? (
                      <div className="flex flex-col gap-2 w-full z-20">
                        <input 
                          value={link.title}
                          onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                          placeholder="Title"
                          className="text-center bg-transparent border-b border-neutral-500/30 focus:border-indigo-500 w-full outline-none text-sm font-medium pb-1"
                          onPointerDown={(e) => e.stopPropagation()} 
                        />
                        <input 
                          value={link.url}
                          onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                          placeholder="https://..."
                          className="text-center bg-transparent border-b border-neutral-500/30 focus:border-indigo-500 w-full outline-none text-xs text-neutral-500 pb-1"
                          onPointerDown={(e) => e.stopPropagation()} 
                        />
                      </div>
                    ) : (
                      <a 
                        href={link.url} 
                        target={link.url.startsWith('http') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="text-center inset-0 absolute z-10 flex items-end justify-center pb-6"
                      >
                          <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 text-sm">{link.title}</span>
                      </a>
                    )}
                  </Reorder.Item>
                );
              })}

              {editMode && (
                <motion.div
                  layout
                  onClick={addLink}
                  className={`h-[160px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer
                    ${isDark ? 'border-neutral-800 text-neutral-700 hover:border-neutral-600 hover:text-neutral-500' : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={28} />
                  <span className="text-xs font-medium">Add Shortcut</span>
                </motion.div>
              )}
            </AnimatePresence>
        </Reorder.Group>

        <footer className="text-center mt-4 opacity-30 text-xs pb-10">
          <p>{editMode ? 'Drag items to reorder • Type URL to auto-detect icon' : 'Press "Edit" to customize layout'}</p>
        </footer>

      </div>
    </div>
  );
}