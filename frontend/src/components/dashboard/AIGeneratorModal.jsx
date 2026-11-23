import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Layers } from 'lucide-react';
import api from '../../services/api';

export const AIGeneratorModal = ({ course, onClose, onObjectivesSaved }) => {
  const [courseTitle, setCourseTitle] = useState(course?.title || 'Visual Basic & Application Architecture');
  const [syllabusText, setSyllabusText] = useState(
    course?.description || 'Event-driven programming, memory management, GUI binding architecture, and MVC vs MVVM paradigms.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedObjectives, setGeneratedObjectives] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await api.post('/objectives/generate', {
        courseTitle,
        syllabusText
      });
      if (res.data.success) {
        setGeneratedObjectives(res.data.data);
      }
    } catch (err) {
      alert('Error generating objectives: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveAll = async () => {
    setIsSaving(true);
    try {
      const res = await api.post('/objectives/save', {
        objectives: generatedObjectives.map(o => ({
          ...o,
          courseId: course?.id || 'course_vb_01'
        }))
      });
      if (res.data.success) {
        alert('All Bloom\'s Objectives successfully approved and saved!');
        if (onObjectivesSaved) onObjectivesSaved(res.data.data);
        onClose();
      }
    } catch (err) {
      alert('Error saving objectives: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-espresso-900 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-orange-300/60 dark:border-orange-500/30">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Gemini AI Engine</span>
              <h2 className="text-base font-extrabold text-white">Generate Bloom's Objectives</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          <form onSubmit={handleGenerate} className="space-y-3">
            <div>
              <label className="block font-bold text-stone-800 dark:text-cream-100 mb-1">Course Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-orange-200 dark:border-espresso-750 bg-cream-50/50 dark:bg-espresso-850 text-stone-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 dark:text-cream-100 mb-1">
                Syllabus / Lecture Notes Text (Paste text or extract from PDF)
              </label>
              <textarea
                rows={3}
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
                required
                placeholder="Paste course modules, topics, learning outcomes..."
                className="w-full p-3 rounded-xl border border-orange-200 dark:border-espresso-750 bg-cream-50/50 dark:bg-espresso-850 text-stone-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating with Gemini API...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Bloom's Objectives (Levels 1 - 6)</span>
                </>
              )}
            </button>
          </form>

          {generatedObjectives.length > 0 && (
            <div className="mt-4 pt-4 border-t border-orange-100 dark:border-espresso-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-stone-900 dark:text-cream-50 uppercase text-[11px] flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Generated Objectives ({generatedObjectives.length})</span>
                </h4>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleApproveAll}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-[10px] uppercase shadow-sm hover:bg-orange-700"
                >
                  Approve All Objectives
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {generatedObjectives.map((obj, i) => (
                  <div key={i} className="p-3 rounded-xl bg-cream-50 dark:bg-espresso-850 border border-orange-200/70 dark:border-espresso-750">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 uppercase">
                      Level {obj.bloomsLevel}: {obj.bloomsLevelName}
                    </span>
                    <h5 className="font-bold text-stone-900 dark:text-cream-100 text-xs mt-1">{obj.title}</h5>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px] mt-0.5">{obj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AIGeneratorModal;
