import React, { useState } from 'react';
import { Users, Plus, Maximize2, Send, Sparkles } from 'lucide-react';
import api from '../../services/api';

export const GroupStudyCard = () => {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Cate Laurence',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      time: '4:00 PM',
      text: 'Hello welcome to the group! ✨'
    },
    {
      id: 'm2',
      sender: 'Carl Maria',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      time: '4:03 PM',
      text: 'Thank you Cate, looking forward to study 🙌'
    },
    {
      id: 'm3',
      sender: 'Anke Fischer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
      time: '4:03 PM',
      text: 'Amazing study chat group...'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const groupAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    const tempMsg = {
      id: 'temp_' + Date.now(),
      sender: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText
    };

    setMessages(prev => [...prev, tempMsg]);
    setIsSending(true);

    try {
      const res = await api.post('/chat/send', { text: userText });
      if (res.data.success && res.data.data.aiMsg) {
        setMessages(prev => [...prev, res.data.data.aiMsg]);
      }
    } catch (err) {
      console.warn('Chat send fallback:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="card-visionary p-5 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-orange-200 dark:border-stone-800 mb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-orange-600 dark:text-orange-400 stroke-[2.5]" />
          <h2 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wider">
            GROUP STUDY
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center -space-x-1.5">
            {groupAvatars.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Member"
                className="w-5 h-5 rounded-full object-cover border border-white dark:border-stone-800 shadow-xs"
              />
            ))}
          </div>

          <button className="w-5 h-5 rounded-full border-2 border-dashed border-orange-500 text-orange-600 dark:text-orange-400 flex items-center justify-center hover:bg-orange-50 text-xs font-bold">
            <Plus className="w-3 h-3 stroke-[3]" />
          </button>

          <button className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white ml-1">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages List with Ultra-Crisp High Contrast */}
      <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start space-x-2.5 text-xs">
            <img
              src={m.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"}
              alt={m.sender}
              className="w-6 h-6 rounded-full object-cover mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-[11px] text-stone-900 dark:text-white flex items-center space-x-1">
                  <span>{m.sender}</span>
                  {m.isAI && <Sparkles className="w-3.5 h-3.5 text-amber-500 inline ml-1" />}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">{m.time}</span>
              </div>
              <p className={`text-xs mt-1 rounded-xl p-2.5 leading-relaxed font-semibold ${
                m.isAI 
                  ? 'bg-orange-100/90 dark:bg-[#2d1b11] text-orange-950 dark:text-amber-100 border border-orange-300 dark:border-orange-600/50' 
                  : 'bg-stone-100 dark:bg-[#26201b] text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700/60'
              }`}>
                {m.text}
              </p>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="text-[10px] text-orange-600 dark:text-orange-400 font-bold italic">LearnSphere AI is formulating response...</div>
        )}
      </div>

      {/* Send Input */}
      <form onSubmit={handleSendMessage} className="mt-3 pt-2.5 border-t border-orange-200 dark:border-stone-800 flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question or study with peers..."
          className="flex-1 px-3.5 py-1.5 text-xs bg-stone-50 dark:bg-[#1a1614] text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 rounded-full border border-orange-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-colors shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};

export default GroupStudyCard;
