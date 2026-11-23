import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';

export const TopHeader = ({ searchQuery, onSearchChange, onOpenAIGenerator }) => {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 sm:px-6 pt-3 sm:pt-4 pb-2 z-20">
      
      {/* Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-stone-900 dark:text-white drop-shadow-xs">
          CLASS BOARD
        </h1>
        <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-600/60 uppercase shadow-xs">
          {user?.role || 'Student'} Mode
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search classes, objectives, exams..."
            className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm rounded-full bg-white dark:bg-[#181513] border border-orange-300 dark:border-orange-500/50 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm font-medium"
          />
          <Search className="w-4 h-4 text-orange-500 dark:text-orange-400 absolute right-3.5 top-3 pointer-events-none" />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle showLabel={true} />

        {user?.role === 'faculty' && (
          <button
            onClick={onOpenAIGenerator}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-transform active:scale-95"
            title="Generate Bloom's Objectives with Gemini"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Objective Generator</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default TopHeader;
