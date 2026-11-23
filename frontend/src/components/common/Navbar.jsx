import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  User, 
  ChevronDown,
  Layers,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, switchDemoRole, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (role) => {
    switchDemoRole(role);
    setRoleMenuOpen(false);
    if (role === 'student') navigate('/student/dashboard');
    else if (role === 'faculty') navigate('/faculty/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'faculty':
        return { label: 'Faculty', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' };
      case 'admin':
        return { label: 'Admin', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' };
      default:
        return { label: 'Student', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' };
    }
  };

  const roleInfo = getRoleBadge(user?.role);

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-primary-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                LearnSphere <span className="text-primary-600 dark:text-primary-400">AI</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 dark:text-slate-400 -mt-1 font-medium hidden sm:inline">
                Competency Analytics
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Quick Role Switcher, Theme Toggle, User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Demo Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Switch role preview"
            >
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleInfo.color}`}>
                {roleInfo.label}
              </span>
              <span className="hidden md:inline text-slate-500 dark:text-slate-400">Preview</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-50 text-xs"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleSwitch('student')}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  <span>Student View</span>
                </button>
                <button
                  onClick={() => handleRoleSwitch('faculty')}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                >
                  <Layers className="w-4 h-4 text-purple-500" />
                  <span>Faculty View</span>
                </button>
                <button
                  onClick={() => handleRoleSwitch('admin')}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-500" />
                  <span>Admin View</span>
                </button>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* User profile menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.displayName} className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-xs border border-primary-200 dark:border-primary-800">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {user?.displayName || 'User'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {user?.email}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-50 text-sm"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{user?.displayName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      navigate('/auth/login');
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center space-x-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/auth/login"
                className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
