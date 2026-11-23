import React, { useState } from 'react';
import { Award, MoreVertical, MessageCircle, Paperclip } from 'lucide-react';

export const GradesChartCard = ({ onOpenAssessmentDetails }) => {
  const [activePopup, setActivePopup] = useState(true);

  const scores = [
    { label: '14', val: 14, max: 20 },
    { label: '16', val: 16, max: 20 },
    { label: '20', val: 20, max: 20, isHighlight: true },
    { label: '12', val: 12, max: 20 },
    { label: '14', val: 14, max: 20 },
    { label: '18', val: 18, max: 20 },
    { label: '16', val: 16, max: 20 }
  ];

  return (
    <div className="card-visionary p-5 relative flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-orange-600 dark:text-orange-400 stroke-[2.5]" />
          <h2 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wider">
            GRADES
          </h2>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-xs font-black text-orange-700 dark:text-orange-300">AVG. 15.7/20</span>
          <MoreVertical className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
        </div>
      </div>

      {/* Vertical Bars Container */}
      <div className="relative pt-12 pb-2">
        
        {/* Floating Tooltip Card */}
        {activePopup && (
          <div 
            style={{ left: '26%', bottom: '70%' }}
            onClick={onOpenAssessmentDetails}
            className="absolute z-20 bg-white dark:bg-[#201c18] rounded-2xl shadow-2xl border-2 border-orange-400 dark:border-orange-500/70 p-3.5 w-44 cursor-pointer hover:shadow-2xl transition-all"
          >
            <div>
              <h4 className="font-black text-xs text-stone-900 dark:text-white tracking-tight uppercase">
                CASE STUDY
              </h4>
              <p className="text-[10px] text-stone-700 dark:text-stone-300 font-bold uppercase mt-1">
                POSTED MONDAY 19.10.2026<br/>
                DUE WEDNESDAY
              </p>
              <p className="text-[11px] font-black text-orange-600 dark:text-orange-400 mt-1">
                5 POINTS
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-2.5 pt-2 border-t border-orange-100 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-3.5 h-3.5 text-orange-500" />
                <span>2</span>
              </span>
              <span className="flex items-center space-x-1">
                <Paperclip className="w-3.5 h-3.5 text-orange-500" />
                <span>0</span>
              </span>
            </div>
          </div>
        )}

        {/* The Bars */}
        <div className="flex items-end justify-between px-3 h-28 gap-2">
          {scores.map((s, idx) => {
            const heightPercent = (s.val / s.max) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div 
                  className={`w-2.5 sm:w-3 rounded-full transition-all duration-300 ${
                    s.isHighlight
                      ? 'bg-gradient-to-t from-orange-600 to-amber-400 ring-4 ring-orange-500/35 shadow-glow-orange-sm'
                      : 'bg-orange-300 dark:bg-stone-700 group-hover:bg-orange-500'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[11px] font-black text-stone-700 dark:text-stone-200 mt-2">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default GradesChartCard;
