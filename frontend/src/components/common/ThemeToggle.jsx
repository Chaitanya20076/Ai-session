import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300
        ${isDark 
          ? 'bg-espresso-800 hover:bg-espresso-750 text-amber-400 border border-orange-500/40 shadow-glow-orange-sm' 
          : 'bg-cream-100 hover:bg-cream-200 text-orange-600 border border-orange-300 shadow-sm'
        } focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${className}`}
      aria-label="Toggle theme mode"
      title={isDark ? 'Switch to Creamy Light Mode' : 'Switch to Warm Solar Dark Mode'}
    >
      <div className={`p-1 rounded-full transition-transform duration-300 ${isDark ? 'rotate-180 bg-orange-500/20' : 'bg-orange-100'}`}>
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-orange-600 fill-orange-500/20" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold uppercase tracking-wider">
          {isDark ? 'Dark Ember' : 'Cream Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
