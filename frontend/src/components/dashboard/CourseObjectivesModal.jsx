import React, { useState, useEffect } from 'react';
import { X, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export const CourseObjectivesModal = ({ courseId, onClose, onOpenAIGenerator }) => {
  const [course, setCourse] = useState(null);
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cRes, oRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/objectives?courseId=${courseId}`)
        ]);
        if (cRes.data.success) setCourse(cRes.data.data);
        if (oRes.data.success) setObjectives(oRes.data.data);
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setLoading(false);
      }
    };
    if (courseId) loadData();
  }, [courseId]);

  if (!courseId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-espresso-900 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-orange-300/60 dark:border-orange-500/30">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">{course?.code || 'COURSE'}</span>
              <h2 className="text-base font-extrabold text-white">{course?.title || 'Course Details'}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-espresso-850 border border-orange-200/60 dark:border-espresso-750">
            <h4 className="font-bold text-stone-900 dark:text-cream-100 uppercase text-[11px] mb-1">Course Syllabus Overview</h4>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{course?.description}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-stone-500 dark:text-stone-400 font-medium">
              <span>👤 Instructor: <strong>{course?.instructor}</strong></span>
              <span>📅 Schedule: <strong>{course?.schedule}</strong></span>
              <span>👥 Students: <strong>{course?.enrolledCount} enrolled</strong></span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-stone-900 dark:text-cream-50 uppercase text-[11px] flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-orange-600" />
                <span>Revised Bloom's Taxonomy Objectives ({objectives.length})</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenAIGenerator(course); }}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate with AI</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {objectives.map((obj) => (
                <div key={obj.id} className="p-3.5 rounded-2xl border border-orange-200/80 dark:border-espresso-750 hover:border-orange-500 transition-all bg-cream-50/50 dark:bg-espresso-850 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                      Level {obj.bloomsLevel}: {obj.bloomsLevelName}
                    </span>
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
                    </span>
                  </div>
                  <h5 className="font-bold text-stone-900 dark:text-cream-100 text-xs">{obj.title}</h5>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">{obj.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-cream-50 dark:bg-espresso-850 border-t border-orange-100 dark:border-espresso-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 font-bold text-xs uppercase"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseObjectivesModal;
