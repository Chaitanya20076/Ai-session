import React, { useState, useEffect } from 'react';
import { Clock, Play } from 'lucide-react';
import api from '../services/api';
import AssessmentModal from '../components/dashboard/AssessmentModal';

export const AssessmentsPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [activeExamId, setActiveExamId] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await api.get('/assessments');
        if (res.data.success) {
          setAssessments(res.data.data);
        }
      } catch (err) {
        console.warn('Assessments fetch fallback:', err);
      }
    };
    fetchAssessments();
  }, []);

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="card-visionary p-6 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
          Examination Engine
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
          Published Assessments &amp; Exams
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Server-enforced timer, auto-graded objective questions, and AI rubric grading for descriptive responses.
        </p>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assessments.map((asm) => (
          <div
            key={asm.id}
            className="card-visionary p-6 flex flex-col justify-between hover:shadow-2xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                  {asm.tag || 'EXAM'}
                </span>
                <span className="text-xs font-bold text-stone-800 dark:text-cream-100">{asm.points} Points</span>
              </div>

              <h3 className="text-base font-extrabold text-stone-900 dark:text-cream-50 mt-1">{asm.title}</h3>
              <p className="text-xs text-stone-500 mt-2">Course: {asm.courseTitle}</p>

              <div className="mt-4 pt-3 border-t border-orange-100 dark:border-espresso-800 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-orange-500" /> {asm.durationMinutes || 45} Minutes
                </span>
                <span>{asm.questions?.length || 4} Questions</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-orange-100 dark:border-espresso-800">
              <button
                onClick={() => setActiveExamId(asm.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Assessment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeExamId && (
        <AssessmentModal
          assessmentId={activeExamId}
          onClose={() => setActiveExamId(null)}
        />
      )}

    </div>
  );
};

export default AssessmentsPage;
