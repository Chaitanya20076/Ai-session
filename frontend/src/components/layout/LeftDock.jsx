import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  CalendarDays, 
  Award, 
  BookOpen, 
  CheckSquare, 
  MessageCircle, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LeftDock = () => {
  const { user, switchDemoRole } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutGrid, label: 'Class Board' },
    { to: '/timetable', icon: CalendarDays, label: 'Classes Timetable' },
    { to: '/analytics', icon: Award, label: 'Grades & Competency' },
    { to: '/courses', icon: BookOpen, label: 'Courses & Objectives' },
    { to: '/assessments', icon: CheckSquare, label: 'Assessments & Exams' },
    { to: '/study-group', icon: MessageCircle, label: 'AI Group Study' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleRoleSelect = (role) => {
    switchDemoRole(role);
    setRoleMenuOpen(false);
  };

  return (
    <aside className="w-[74px] sm:w-[82px] bg-white dark:bg-[#181513] rounded-full sm:rounded-[36px] shadow-dock-light dark:shadow-dock-dark flex flex-col items-center py-5 sm:py-6 justify-between flex-shrink-0 z-30 my-2 sm:my-3 ml-2 sm:ml-4 border border-orange-200 dark:border-orange-500/30 transition-all duration-300">
      
      {/* Top Monogram Logo (CB) */}
      <div className="relative group cursor-pointer">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-200 p-[2px] shadow-glow-orange-sm hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-cream-50 dark:bg-[#181513] flex items-center justify-center">
            <span className="font-black text-sm tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              CB
            </span>
          </div>
        </div>
        <div className="absolute left-16 top-2 hidden group-hover:block bg-stone-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-50 border border-orange-500/40">
          LearnSphere AI Class Board
        </div>
      </div>

      {/* Navigation Icons Dock */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-5 my-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `relative p-2.5 sm:p-3 rounded-2xl transition-all duration-200 group flex items-center justify-center ${
                isActive
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-glow-orange-sm scale-105'
                  : 'text-stone-500 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-[#25201c]'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2.2]" />
              {/* Tooltip on hover */}
              <div className="absolute left-16 hidden group-hover:block bg-stone-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none border border-orange-500/30">
                {item.label}
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User Avatar with Role Switcher */}
      <div className="relative">
        <button
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="relative focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full group"
          title={`Active user: ${user?.displayName} (${user?.role}) - Click to switch`}
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-orange-400 shadow-md group-hover:border-orange-500 group-hover:scale-105 transition-all"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white dark:border-[#181513] shadow-xs" />
        </button>

        {/* Role Switcher Menu */}
        {roleMenuOpen && (
          <div 
            className="absolute left-14 bottom-0 w-52 bg-white dark:bg-[#181513] rounded-2xl shadow-2xl border border-orange-200 dark:border-orange-500/40 p-2 z-50 text-xs text-stone-900 dark:text-white"
            onMouseLeave={() => setRoleMenuOpen(false)}
          >
            <div className="px-3 py-1.5 border-b border-orange-100 dark:border-stone-800 text-[10px] uppercase font-black text-orange-600 dark:text-orange-400 flex items-center justify-between">
              <span>Role Preview</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <button
              onClick={() => handleRoleSelect('student')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-bold ${
                user?.role === 'student' ? 'bg-orange-50 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300' : 'hover:bg-cream-100 dark:hover:bg-[#25201c]'
              }`}
            >
              <span>Student View</span>
              {user?.role === 'student' && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-black">Active</span>}
            </button>
            <button
              onClick={() => handleRoleSelect('faculty')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-bold ${
                user?.role === 'faculty' ? 'bg-orange-50 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300' : 'hover:bg-cream-100 dark:hover:bg-[#25201c]'
              }`}
            >
              <span>Faculty Workspace</span>
              {user?.role === 'faculty' && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-black">Active</span>}
            </button>
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-bold ${
                user?.role === 'admin' ? 'bg-orange-50 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300' : 'hover:bg-cream-100 dark:hover:bg-[#25201c]'
              }`}
            >
              <span>Admin Approvals</span>
              {user?.role === 'admin' && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-black">Active</span>}
            </button>
          </div>
        )}
      </div>

    </aside>
  );
};

export default LeftDock;
