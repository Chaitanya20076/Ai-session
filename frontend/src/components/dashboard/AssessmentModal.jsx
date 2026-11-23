import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export const AssessmentModal = ({ assessmentId, onClose, onCompleted }) => {
  const [assessment, setAssessment] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await api.get(`/assessments/${assessmentId}?role=student`);
        if (res.data.success) {
          setAssessment(res.data.data);
          setTimeLeft((res.data.data.durationMinutes || 45) * 60);
        }
      } catch (err) {
        console.error('Failed to load assessment:', err);
      } finally {
        setLoading(false);
      }
    };
    if (assessmentId) fetchAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (result || loading) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [result, loading]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post('/submissions/submit', {
        assessmentId: assessment.id,
        answers
      });
      if (res.data.success) {
        setResult(res.data.data);
        if (onCompleted) onCompleted(res.data.data);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting assessment: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-espresso-900 rounded-3xl p-8 max-w-sm w-full text-center border border-orange-300">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-stone-800 dark:text-cream-100">Loading Assessment Engine...</p>
        </div>
      </div>
    );
  }

  if (!assessment) return null;

  const currentQ = assessment.questions[currentIdx];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-espresso-900 rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-orange-300/60 dark:border-orange-500/30">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
              Exam in Progress &bull; Server Enforced
            </span>
            <h2 className="text-base font-extrabold text-white">{assessment.title}</h2>
          </div>

          <div className="flex items-center space-x-4">
            {!result && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 border border-amber-300/40 text-amber-300 font-mono text-xs font-bold shadow-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            )}
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Result View */}
        {result ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3 shadow-glow-orange-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-cream-50">Assessment Submitted Successfully!</h3>
              <p className="text-xs text-stone-500 mt-1">Automatic grading and AI Bloom's Taxonomy evaluation completed.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-espresso-800 border border-orange-200 dark:border-orange-700/50 text-center">
                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 uppercase">Score Obtained</span>
                <p className="text-2xl font-black text-orange-800 dark:text-orange-400">{result.totalMarksObtained} / {result.totalMaxMarks}</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-espresso-800 border border-amber-200 dark:border-amber-700/50 text-center">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">Percentage</span>
                <p className="text-2xl font-black text-amber-800 dark:text-amber-400">{result.percentage}%</p>
              </div>
              <div className="p-4 rounded-2xl bg-cream-100 dark:bg-espresso-850 border border-orange-300/40 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 uppercase">Competency Tier</span>
                <p className="text-lg font-black text-stone-900 dark:text-cream-50">
                  {result.percentage >= 85 ? 'Excellent' : result.percentage >= 70 ? 'Good' : result.percentage >= 50 ? 'Developing' : 'Needs Work'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 dark:bg-espresso-850 border border-orange-200/60 dark:border-espresso-750">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-cream-100 mb-2">
                Bloom's Taxonomy Cognitive Mastery:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {Object.entries(result.bloomsPercentages).map(([lvl, pct]) => (
                  <div key={lvl} className="p-2 bg-white dark:bg-espresso-900 rounded-xl border border-orange-100 dark:border-espresso-800 flex items-center justify-between">
                    <span className="font-bold text-stone-700 dark:text-cream-200">{lvl}</span>
                    <span className="font-extrabold text-orange-600 dark:text-orange-400">
                      {pct !== null ? `${pct}%` : 'Unassessed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-cream-100">Detailed Feedback:</h4>
              {result.questionResults.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-orange-200/70 dark:border-espresso-750 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900 dark:text-cream-100">Question {idx + 1} (Level {q.bloomsLevel})</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">+{q.marksAwarded} / {q.maxMarks} marks</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300">{q.questionText}</p>
                  <p className="mt-2 text-stone-600 dark:text-stone-400 italic bg-cream-100/60 dark:bg-espresso-800 p-2 rounded-lg">{q.feedback}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Close &amp; Return to Dashboard
            </button>
          </div>
        ) : (
          /* Active Exam View */
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                {assessment.questions.map((q, idx) => {
                  const isAnswered = Boolean(answers[q.id]);
                  const isMarked = Boolean(markedForReview[q.id]);
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                        isCurrent
                          ? 'ring-2 ring-orange-500 bg-orange-600 text-white shadow-glow-orange-sm'
                          : isMarked
                          ? 'bg-amber-100 text-amber-800 border border-amber-400'
                          : isAnswered
                          ? 'bg-orange-500 text-white'
                          : 'bg-cream-100 dark:bg-espresso-800 text-stone-600 dark:text-stone-300 hover:bg-orange-100'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                    Question {currentIdx + 1} of {assessment.questions.length} &bull; Bloom's Level {currentQ.bloomsLevel} ({currentQ.bloomsLevelName})
                  </span>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{currentQ.maxMarks} Points</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-cream-50 leading-relaxed">
                  {currentQ.questionText}
                </h3>

                {currentQ.options && currentQ.options.length > 0 ? (
                  <div className="space-y-2 mt-4">
                    {currentQ.options.map((opt, oIdx) => (
                      <label
                        key={oIdx}
                        className={`flex items-center space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          answers[currentQ.id] === opt
                            ? 'bg-orange-50 dark:bg-orange-950/60 border-orange-500 text-orange-900 dark:text-cream-100 font-semibold shadow-xs'
                            : 'border-orange-100 dark:border-espresso-800 hover:bg-cream-50 dark:hover:bg-espresso-850 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <input
                          type={currentQ.questionType === 'multi_select' ? 'checkbox' : 'radio'}
                          name={`q_${currentQ.id}`}
                          value={opt}
                          checked={answers[currentQ.id] === opt}
                          onChange={() => handleAnswerChange(currentQ.id, opt)}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-xs sm:text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4">
                    <textarea
                      rows={4}
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      placeholder="Type your analytical answer here. (Evaluated with AI rubric assistance)..."
                      className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border border-orange-200 dark:border-espresso-750 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-cream-50/50 dark:bg-espresso-850 text-stone-900 dark:text-cream-50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-orange-100 dark:border-espresso-800">
              <button
                type="button"
                onClick={() => toggleMarkForReview(currentQ.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-100 text-amber-900 border-amber-400'
                    : 'border-orange-200 dark:border-espresso-750 text-stone-600 dark:text-stone-400 hover:bg-cream-100'
                }`}
              >
                {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-orange-200 dark:border-espresso-750 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-cream-100 disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Previous
                </button>

                {currentIdx < assessment.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-stone-800"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md uppercase tracking-wider disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Final Submit'}
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AssessmentModal;
