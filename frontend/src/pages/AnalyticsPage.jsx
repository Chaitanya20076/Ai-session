import React, { useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Award, BrainCircuit, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';

export const AnalyticsPage = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const bloomsRadarData = [
    { subject: 'L1: Remember', score: 88, fullMark: 100 },
    { subject: 'L2: Understand', score: 82, fullMark: 100 },
    { subject: 'L3: Apply', score: 71, fullMark: 100 },
    { subject: 'L4: Analyze', score: 65, fullMark: 100 },
    { subject: 'L5: Evaluate', score: 58, fullMark: 100 },
    { subject: 'L6: Create', score: 50, fullMark: 100 }
  ];

  const bloomsLevels = [
    { level: 1, name: 'Remember', score: 88, tier: 'Excellent', color: '#f97316', desc: 'Recall definitions, event handlers, and syntax.' },
    { level: 2, name: 'Understand', score: 82, tier: 'Good', color: '#fb923c', desc: 'Comprehend data binding and delegate lifecycles.' },
    { level: 3, name: 'Apply', score: 71, tier: 'Good', color: '#f59e0b', desc: 'Implement form validation and event listeners.' },
    { level: 4, name: 'Analyze', score: 65, tier: 'Developing', color: '#ea580c', desc: 'Deconstruct memory leaks and circular references.' },
    { level: 5, name: 'Evaluate', score: 58, tier: 'Developing', color: '#c2410c', desc: 'Appraise MVVM vs MVC performance trade-offs.' },
    { level: 6, name: 'Create', score: 50, tier: 'Needs Improvement', color: '#9a3412', desc: 'Synthesize custom controls and full desktop architectures.' }
  ];

  const handleGenerateRecommendations = async () => {
    setLoadingRecs(true);
    try {
      const res = await api.post('/analytics/recommendations', {
        studentName: 'Alex Morgan',
        courseTitle: 'Visual Basic & Application Architecture',
        weakObjectives: ['L4 Analysis of unmanaged delegates', 'L6 Desktop architecture synthesis'],
        bloomsPerformance: { L1: 88, L2: 82, L3: 71, L4: 65, L5: 58, L6: 50 }
      });
      if (res.data.success) {
        setRecommendations(res.data.data);
      }
    } catch (err) {
      console.warn('AI Recommendations fallback:', err);
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-visionary p-6 shadow-xl">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
            Pedagogical Engine
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
            Bloom's Taxonomy Competency Analytics
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Measuring true cognitive depth across the 6 revised levels of Bloom's Taxonomy.
          </p>
        </div>

        <button
          onClick={handleGenerateRecommendations}
          disabled={loadingRecs}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loadingRecs ? 'Analyzing with Gemini...' : 'Get AI Study Plan'}</span>
        </button>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Recharts Radar Chart in Solar Amber */}
        <div className="card-visionary p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-orange-100 dark:border-espresso-800">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-900 dark:text-cream-50 flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Cognitive Mastery Radar</span>
            </h3>
            <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-0.5 rounded border border-orange-200 dark:border-orange-700/50">
              Average 69%
            </span>
          </div>

          <div className="w-full h-72 py-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={bloomsRadarData}>
                <PolarGrid stroke="rgba(249, 115, 22, 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(249, 115, 22, 0.3)" />
                <Radar name="Student Mastery" dataKey="score" stroke="#f97316" strokeWidth={2.5} fill="#f97316" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-stone-400 text-center italic">
            Cognitive levels L1 to L3 demonstrate strong competence; prioritize L4 to L6 analytical reasoning.
          </p>
        </div>

        {/* 6 Levels List Breakdown */}
        <div className="card-visionary p-6 space-y-3.5">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-900 dark:text-cream-50 pb-3 border-b border-orange-100 dark:border-espresso-800 flex items-center space-x-2">
            <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Achievement by Cognitive Level</span>
          </h3>

          <div className="space-y-3">
            {bloomsLevels.map((lvl) => (
              <div key={lvl.level} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 dark:text-cream-100">
                    Level {lvl.level}: {lvl.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-stone-900 dark:text-cream-50">{lvl.score}%</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      lvl.score >= 85 ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' :
                      lvl.score >= 70 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      lvl.score >= 50 ? 'bg-stone-100 text-stone-700 dark:bg-espresso-800 dark:text-stone-300' : 'bg-red-100 text-red-700'
                    }`}>
                      {lvl.tier}
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-cream-200 dark:bg-espresso-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${lvl.score}%`, backgroundColor: lvl.color }} 
                  />
                </div>
                <p className="text-[10px] text-stone-400">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Recommendations Section */}
      {recommendations && (
        <div className="card-visionary p-6 space-y-4 border-2 border-orange-500/40 animate-in fade-in duration-300">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-sm uppercase tracking-wider text-stone-900 dark:text-cream-50">
              Personalized AI Study Path &bull; Gemini Grounded
            </h3>
          </div>

          <p className="text-xs text-stone-700 dark:text-cream-200 leading-relaxed font-medium">
            {recommendations.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50">
              <h4 className="font-bold text-xs text-orange-900 dark:text-orange-300 uppercase mb-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-orange-600" /> Identified Strengths
              </h4>
              <ul className="space-y-1.5 text-xs text-orange-800 dark:text-orange-200">
                {recommendations.strengths.map((s, i) => (
                  <li key={i}>&bull; {s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-espresso-850 border border-amber-200 dark:border-espresso-750">
              <h4 className="font-bold text-xs text-amber-900 dark:text-amber-400 uppercase mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1.5 text-amber-600" /> Priority Gap Areas
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-800 dark:text-amber-300">
                {recommendations.weakAreas.map((w, i) => (
                  <li key={i}>&bull; {w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs text-stone-900 dark:text-cream-50 uppercase">Recommended Exercises:</h4>
            {recommendations.actionableSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-orange-200/70 dark:border-espresso-750 bg-cream-50/70 dark:bg-espresso-850 flex items-start justify-between text-xs">
                <div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                    step.priority === 'High' ? 'bg-orange-600 text-white' : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {step.priority} Priority
                  </span>
                  <h5 className="font-bold text-stone-900 dark:text-cream-100 mt-1">{step.topic}</h5>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">{step.exercise}</p>
                </div>
                <span className="text-[10px] font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2 py-1 rounded-md">
                  {step.recommendedResource}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default AnalyticsPage;
