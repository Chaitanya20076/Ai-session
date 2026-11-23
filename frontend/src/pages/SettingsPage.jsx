import React from 'react';
import { User, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

export const SettingsPage = () => {
  const { user, switchDemoRole } = useAuth();

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-4xl mx-auto w-full">
      <div className="card-visionary p-6 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
          Configuration &amp; Security
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
          Platform Settings
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Manage your active role permissions, display mode, and Gemini AI endpoints.
        </p>
      </div>

      {/* Theme Appearance Mode Card */}
      <div className="card-visionary p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-cream-50 pb-2 border-b border-orange-100 dark:border-espresso-800 flex items-center justify-between">
          <span>Appearance Mode</span>
          <ThemeToggle showLabel={true} />
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400">
          Toggle between <strong>Creamy Light Mode</strong> (soft vanilla canvas with warm amber contours) and <strong>Warm Solar Dark Mode</strong> (deep smoked espresso with glowing ember particles).
        </p>
      </div>

      {/* Active Identity Card */}
      <div className="card-visionary p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-cream-50 pb-2 border-b border-orange-100 dark:border-espresso-800 flex items-center space-x-2">
          <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Active Identity &amp; Role</span>
        </h3>

        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-orange-400"
          />
          <div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-cream-50">{user?.displayName}</h4>
            <p className="text-xs text-stone-500">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-600/30">
              Role: {user?.role} ({user?.status})
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-orange-100 dark:border-espresso-800">
          <label className="block text-xs font-bold text-stone-700 dark:text-cream-200 mb-2">Switch Active View Role:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => switchDemoRole('student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                user?.role === 'student' ? 'bg-orange-600 text-white shadow-sm' : 'bg-cream-100 dark:bg-espresso-800 text-stone-700 dark:text-stone-300 hover:bg-orange-50'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => switchDemoRole('faculty')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                user?.role === 'faculty' ? 'bg-orange-600 text-white shadow-sm' : 'bg-cream-100 dark:bg-espresso-800 text-stone-700 dark:text-stone-300 hover:bg-orange-50'
              }`}
            >
              Faculty Workspace
            </button>
            <button
              onClick={() => switchDemoRole('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                user?.role === 'admin' ? 'bg-orange-600 text-white shadow-sm' : 'bg-cream-100 dark:bg-espresso-800 text-stone-700 dark:text-stone-300 hover:bg-orange-50'
              }`}
            >
              Admin Controls
            </button>
          </div>
        </div>
      </div>

      {/* Services Card */}
      <div className="card-visionary p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-cream-50 pb-2 border-b border-orange-100 dark:border-espresso-800 flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Services &amp; Architecture Status</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-cream-50/70 dark:bg-espresso-850 border border-orange-200/60 dark:border-espresso-750">
            <span className="font-bold text-stone-500 block">Google Gemini API</span>
            <span className="font-bold text-orange-600 dark:text-orange-400 mt-1 inline-block">Active (gemini-1.5-flash)</span>
          </div>
          <div className="p-3 rounded-xl bg-cream-50/70 dark:bg-espresso-850 border border-orange-200/60 dark:border-espresso-750">
            <span className="font-bold text-stone-500 block">Database</span>
            <span className="font-bold text-orange-600 dark:text-orange-400 mt-1 inline-block">Cloud Firestore &bull; Synchronized</span>
          </div>
          <div className="p-3 rounded-xl bg-cream-50/70 dark:bg-espresso-850 border border-orange-200/60 dark:border-espresso-750">
            <span className="font-bold text-stone-500 block">Assessment Engine</span>
            <span className="font-bold text-orange-600 dark:text-orange-400 mt-1 inline-block">Server-Enforced Timer</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;
