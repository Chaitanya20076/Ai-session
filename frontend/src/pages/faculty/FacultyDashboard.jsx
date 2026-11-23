import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  PenTool, 
  BarChart3, 
  Plus, 
  Sparkles, 
  UploadCloud, 
  Layers, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const FacultyDashboard = () => {
  const { user } = useAuth();

  const courses = [
    {
      id: 'cs101',
      title: 'Data Structures & Algorithms',
      code: 'CS-301',
      studentsEnrolled: 42,
      objectivesCount: 14,
      assessmentsPublished: 3,
      avgCompetency: '73%',
      status: 'published'
    },
    {
      id: 'ai201',
      title: 'Applied Machine Learning',
      code: 'AI-401',
      studentsEnrolled: 28,
      objectivesCount: 8,
      assessmentsPublished: 1,
      avgCompetency: '66%',
      status: 'published'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Faculty Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div>
          <Badge variant="primary" className="mb-2">Faculty Workspace</Badge>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome, {user?.displayName || 'Professor'}!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Department: {user?.department || 'Computer Science & Artificial Intelligence'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/faculty/courses/create">
            <Button size="sm" icon={Plus}>
              New Course
            </Button>
          </Link>
          <Link to="/faculty/assessments">
            <Button size="sm" variant="secondary" icon={PenTool}>
              Assessment Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Courses</p>
              <h3 className="text-xl font-bold mt-0.5">2 Active</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Enrolled Students</p>
              <h3 className="text-xl font-bold mt-0.5">70 Students</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Assessments</p>
              <h3 className="text-xl font-bold mt-0.5">4 Published</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Class Avg Mastery</p>
              <h3 className="text-xl font-bold mt-0.5">71%</h3>
            </div>
          </div>
        </Card>

      </div>

      {/* Active Courses & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Managed Courses (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-primary-600" />
            <span>Active Courses</span>
          </h2>

          <div className="space-y-3">
            {courses.map((course) => (
              <Card key={course.id} hoverEffect className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{course.code}</span>
                      <Badge variant="success" size="sm">Active</Badge>
                    </div>
                    <h3 className="text-base font-bold mt-1 text-slate-900 dark:text-white">{course.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>👥 {course.studentsEnrolled} Students</span>
                      <span>🎯 {course.objectivesCount} Objectives</span>
                      <span>📝 {course.assessmentsPublished} Assessments</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link to="/faculty/objectives">
                      <Button size="sm" variant="secondary">
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-primary-600" /> Objectives
                      </Button>
                    </Link>
                    <Link to="/faculty/analytics">
                      <Button size="sm">
                        Analytics <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Side Notification / Action Panel */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Attention Required</span>
          </h2>

          <Card className="p-5">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs mb-4">
              <p className="font-semibold">3 Students Need Support in Level 4 (Analyze)</p>
              <p className="mt-1 opacity-90">In CS-301, multiple students scored below 50% on dynamic programming sub-problems.</p>
            </div>

            <div className="space-y-2">
              <Link to="/faculty/analytics" className="w-full">
                <Button size="sm" variant="outline" className="w-full">
                  Inspect Learning Objective Breakdown
                </Button>
              </Link>
              <Link to="/faculty/materials" className="w-full">
                <Button size="sm" variant="ghost" className="w-full">
                  <UploadCloud className="w-4 h-4 mr-1.5" /> Upload Supplementary Notes
                </Button>
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default FacultyDashboard;
