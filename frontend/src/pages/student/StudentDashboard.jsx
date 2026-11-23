import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckSquare, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  FileText, 
  BrainCircuit,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const StudentDashboard = () => {
  const { user } = useAuth();

  // Seeded active courses for Alex Morgan
  const enrolledCourses = [
    {
      id: 'cs101',
      title: 'Data Structures & Algorithms',
      code: 'CS-301',
      instructor: 'Dr. Evelyn Sharma',
      progress: 68,
      bloomMastery: 'Good (74%)',
      upcomingExam: 'Midterm Competency Assessment',
      examDue: 'In 2 days'
    },
    {
      id: 'ai201',
      title: 'Neural Networks & Deep Learning',
      code: 'AI-402',
      instructor: 'Prof. David Chen',
      progress: 45,
      bloomMastery: 'Developing (62%)',
      upcomingExam: 'Convolutional Architectures Quiz',
      examDue: 'In 5 days'
    }
  ];

  // Cognitive Bloom's breakdown
  const bloomsSummary = [
    { level: 1, name: 'Remember', score: 88, tier: 'Excellent' },
    { level: 2, name: 'Understand', score: 82, tier: 'Good' },
    { level: 3, name: 'Apply', score: 71, tier: 'Good' },
    { level: 4, name: 'Analyze', score: 65, tier: 'Developing' },
    { level: 5, name: 'Evaluate', score: 58, tier: 'Developing' },
    { level: 6, name: 'Create', score: 50, tier: 'Needs Improvement' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="primary" className="mb-3 bg-white/10 text-white border-white/20">
            Student Portal
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.displayName || 'Student'}! 👋
          </h1>
          <p className="mt-2 text-indigo-100 text-sm leading-relaxed">
            Your overall Bloom's Taxonomy cognitive mastery is <span className="font-bold text-amber-300">Developing (69%)</span>. Focus on higher-order analytical and synthesis exercises to reach Excellent.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/student/performance">
              <Button size="sm" className="bg-white text-indigo-900 hover:bg-indigo-50 border-0">
                <BrainCircuit className="w-4 h-4 mr-1.5 text-indigo-600" /> View Competency Radar
              </Button>
            </Link>
            <Link to="/student/recommendations">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Sparkles className="w-4 h-4 mr-1.5 text-amber-300" /> AI Study Suggestions
              </Button>
            </Link>
          </div>
        </div>
        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="p-4 sm:p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Enrolled Courses</p>
              <h3 className="text-xl font-bold mt-0.5">2</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Upcoming Exams</p>
              <h3 className="text-xl font-bold mt-0.5">2 Pending</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Avg Competency</p>
              <h3 className="text-xl font-bold mt-0.5">69%</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">AI Action Items</p>
              <h3 className="text-xl font-bold mt-0.5">3 Areas</h3>
            </div>
          </div>
        </Card>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrolled Courses (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span>My Enrolled Courses</span>
            </h2>
            <Link to="/student/explore" className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Explore More Courses &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map((c) => (
              <Card key={c.id} hoverEffect className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{c.code}</span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <span className="text-xs text-slate-500">{c.instructor}</span>
                    </div>
                    <h3 className="text-base font-bold mt-1 text-slate-900 dark:text-white">{c.title}</h3>
                    <div className="mt-3 flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center">
                        <CheckSquare className="w-3.5 h-3.5 mr-1 text-amber-500" /> {c.upcomingExam} ({c.examDue})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {c.bloomMastery}
                    </span>
                    <Link to="/student/materials" className="mt-4">
                      <Button size="sm" variant="outline">
                        View Course <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bloom's Taxonomy Cognitive Progress (1 column) */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BrainCircuit className="w-4 h-4 text-indigo-600" />
            <span>Bloom's Mastery Levels</span>
          </h2>

          <Card className="p-5">
            <div className="space-y-3.5">
              {bloomsSummary.map((b) => (
                <div key={b.level} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      L{b.level}: {b.name}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{b.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        b.score >= 85 ? 'bg-indigo-600' :
                        b.score >= 70 ? 'bg-emerald-500' :
                        b.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${b.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link to="/student/performance" className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                Open Full Analytics &amp; Radar Charts &rarr;
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
