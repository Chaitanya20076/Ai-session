import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import api from '../services/api';
import CourseObjectivesModal from '../components/dashboard/CourseObjectivesModal';
import AIGeneratorModal from '../components/dashboard/AIGeneratorModal';

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showAIGen, setShowAIGen] = useState(false);
  const [targetCourseForAI, setTargetCourseForAI] = useState(null);
  const [enrolledMap, setEnrolledMap] = useState({
    course_vb_01: true,
    course_uiux_02: true,
    course_seo_03: true,
    course_js_04: true
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data.success) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.warn('Courses fetch fallback:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const res = await api.post('/courses/enroll', {
        courseId,
        studentId: 'demo_student_001'
      });
      if (res.data.success) {
        setEnrolledMap(prev => ({ ...prev, [courseId]: true }));
        alert('Successfully enrolled in course!');
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-visionary p-6 shadow-xl">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
            Curriculum Catalog
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
            Courses &amp; Learning Objectives
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Explore academic courses, review Bloom's Taxonomy learning outcomes, and access materials.
          </p>
        </div>

        <button
          onClick={() => {
            setTargetCourseForAI(courses[0] || null);
            setShowAIGen(true);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Objectives with AI</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="card-visionary p-6 flex flex-col justify-between hover:shadow-2xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                  {course.code}
                </span>
                {enrolledMap[course.id] ? (
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Enrolled
                  </span>
                ) : (
                  <span className="text-xs text-stone-400">Not Enrolled</span>
                )}
              </div>

              <h3 className="text-base font-extrabold text-stone-900 dark:text-cream-50 mt-1">{course.title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">{course.description}</p>

              <div className="mt-4 pt-3 border-t border-orange-100 dark:border-espresso-800 flex flex-wrap gap-4 text-xs text-stone-500 font-medium">
                <span>👤 {course.instructor}</span>
                <span>📅 {course.schedule}</span>
                <span>👥 {course.enrolledCount} Students</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-orange-100 dark:border-espresso-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedCourseId(course.id)}
                className="text-xs font-bold text-stone-800 dark:text-cream-100 hover:text-orange-600 dark:hover:text-orange-400 underline flex items-center"
              >
                Bloom's Objectives &rarr;
              </button>

              {enrolledMap[course.id] ? (
                <button
                  onClick={() => setSelectedCourseId(course.id)}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800"
                >
                  View Course
                </button>
              ) : (
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-sm"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCourseId && (
        <CourseObjectivesModal
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
          onOpenAIGenerator={(c) => {
            setTargetCourseForAI(c);
            setShowAIGen(true);
          }}
        />
      )}

      {showAIGen && (
        <AIGeneratorModal
          course={targetCourseForAI}
          onClose={() => setShowAIGen(false)}
        />
      )}

    </div>
  );
};

export default CoursesPage;
