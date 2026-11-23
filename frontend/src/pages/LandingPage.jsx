import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  BarChart3, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const LandingPage = () => {
  const { switchDemoRole, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleQuickLaunch = (role) => {
    switchDemoRole(role);
    if (role === 'student') navigate('/student/dashboard');
    else if (role === 'faculty') navigate('/faculty/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  const bloomsLevels = [
    { level: 1, name: 'Remember', verb: 'Recall & Identify', color: 'badge-remember', desc: 'Facts, definitions, and basic conceptual terms' },
    { level: 2, name: 'Understand', verb: 'Explain & Classify', color: 'badge-understand', desc: 'Comprehending meaning, translating ideas, and summarizing' },
    { level: 3, name: 'Apply', verb: 'Execute & Implement', color: 'badge-apply', desc: 'Using knowledge in concrete real-world contexts' },
    { level: 4, name: 'Analyze', verb: 'Differentiate & Organize', color: 'badge-analyze', desc: 'Deconstructing relationships and identifying root causes' },
    { level: 5, name: 'Evaluate', verb: 'Critique & Defend', color: 'badge-evaluate', desc: 'Appraising standards, validating hypotheses, judging outcomes' },
    { level: 6, name: 'Create', verb: 'Design & Synthesize', color: 'badge-create', desc: 'Generating novel solutions, models, and architectures' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">LearnSphere <span className="text-primary-600 dark:text-primary-400">AI</span></span>
          </div>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Button onClick={() => handleQuickLaunch(user?.role || 'student')} size="sm">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Moving Beyond Simple Marks to True Competency</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          AI-Powered Learning, Assessment &amp; <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Bloom's Competency Analytics</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Connect faculty syllabus intelligence with student learning mastery. Extract learning objectives, generate multi-format assessments with Gemini AI, and track depth of cognitive achievement.
        </p>

        {/* Quick Launch Previews */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleQuickLaunch('student')}
            className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/25 transition-transform hover:-translate-y-0.5"
          >
            <GraduationCap className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs opacity-80 leading-none">Explore as</div>
              <div className="text-sm font-semibold">Student Portal</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
          </button>

          <button
            onClick={() => handleQuickLaunch('faculty')}
            className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md shadow-purple-500/25 transition-transform hover:-translate-y-0.5"
          >
            <Layers className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs opacity-80 leading-none">Experience as</div>
              <div className="text-sm font-semibold">Faculty Workspace</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
          </button>

          <button
            onClick={() => handleQuickLaunch('admin')}
            className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium border border-slate-700 shadow-md transition-transform hover:-translate-y-0.5"
          >
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <div className="text-left">
              <div className="text-xs opacity-80 leading-none">Review as</div>
              <div className="text-sm font-semibold">Admin Approvals</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
          </button>
        </div>
      </section>

      {/* Bloom's Taxonomy 6 Levels Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-2">Pedagogical Framework</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">Six Revised Bloom's Taxonomy Levels</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Every course objective, question, and student score maps directly to this 6-tiered cognitive structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bloomsLevels.map((b) => (
            <Card key={b.level} hoverEffect className="relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${b.color}`}>
                  Level {b.level}: {b.name}
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {b.verb}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {b.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Platform Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 border border-indigo-200/60 dark:border-indigo-800/60">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gemini Objective Extraction</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Upload syllabus PDFs, Word documents, or lecture slides. Gemini analyzes the content and drafts structured Bloom's learning objectives for faculty review.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 border border-purple-200/60 dark:border-purple-800/60">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Granular Competency Engine</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Evaluate objective achievement % and cognitive level mastery with radar charts. Never conflate unassessed objectives with failure.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Personalized AI Study Plans</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Gemini provides targeted recommendations grounded in actual course materials and missing concepts, allowing students to close learning gaps.
            </p>
          </Card>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-8 text-center text-xs text-slate-500">
        LearnSphere AI &copy; {new Date().getFullYear()} &bull; Designed for Higher Education &amp; Competency Assessment
      </footer>
    </div>
  );
};

export default LandingPage;
