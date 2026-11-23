import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  UploadCloud, 
  PenTool, 
  Users, 
  ShieldCheck,
  BrainCircuit,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'student';

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/explore', icon: Compass, label: 'Explore Courses' },
    { to: '/student/courses', icon: BookOpen, label: 'My Courses' },
    { to: '/student/materials', icon: FileText, label: 'Study Materials' },
    { to: '/student/assessments', icon: CheckSquare, label: 'Assessments' },
    { to: '/student/performance', icon: BarChart3, label: 'Competency Analytics' },
    { to: '/student/recommendations', icon: Sparkles, label: 'AI Study Plan' }
  ];

  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/courses', icon: BookOpen, label: 'My Courses' },
    { to: '/faculty/courses/create', icon: PlusCircle, label: 'Create Course' },
    { to: '/faculty/objectives', icon: Layers, label: "Bloom's Objectives" },
    { to: '/faculty/materials', icon: UploadCloud, label: 'Course Materials' },
    { to: '/faculty/assessments', icon: PenTool, label: 'Assessment Builder' },
    { to: '/faculty/analytics', icon: BarChart3, label: 'Student Analytics' }
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'System Overview' },
    { to: '/admin/approvals', icon: Users, label: 'Faculty Approvals' },
    { to: '/admin/settings', icon: ShieldCheck, label: 'Platform Security' }
  ];

  const links = role === 'faculty' ? facultyLinks : role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Navigation list */}
        <div className="p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {role === 'faculty' ? 'Faculty Portal' : role === 'admin' ? 'Admin Portal' : 'Student Learning Hub'}
          </div>

          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800/80 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bloom's Taxonomy Reference Badge Panel */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 m-3 rounded-2xl border">
          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-2">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Bloom's Taxonomy</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-center font-medium">L1: Remember</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-center font-medium">L2: Understand</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-center font-medium">L3: Apply</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-center font-medium">L4: Analyze</span>
            <span className="px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-center font-medium">L5: Evaluate</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-center font-medium">L6: Create</span>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
