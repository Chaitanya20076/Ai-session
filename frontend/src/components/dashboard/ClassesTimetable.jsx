import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export const ClassesTimetable = ({ onSelectClass }) => {
  const [activeTooltip, setActiveTooltip] = useState(true);

  const days = [
    {
      name: 'MONDAY',
      bars: [
        { start: '25%', width: '22%' },
        { start: '52%', width: '8%' },
        { start: '68%', width: '12%' }
      ]
    },
    {
      name: 'TUESDAY',
      bars: [
        { start: '25%', width: '22%' },
        { 
          start: '50%', 
          width: '24%', 
          isActive: true, 
          label: 'Visual Basic (2/4)', 
          instructor: 'Lilian Hilpert', 
          time: 'Tuesday 9:30 - 12:30' 
        }
      ]
    },
    {
      name: 'WEDNESDAY',
      bars: [
        { start: '25%', width: '22%' },
        { start: '72%', width: '12%' }
      ]
    },
    {
      name: 'THURSDAY',
      bars: [
        { start: '72%', width: '12%' }
      ]
    },
    {
      name: 'FRIDAY',
      bars: [
        { start: '25%', width: '15%' }
      ]
    }
  ];

  const hours = ['11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

  return (
    <div className="card-visionary p-5 sm:p-6 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-200 dark:border-stone-800 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400 stroke-[2.5]" />
          <h2 className="text-xs sm:text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
            CLASSES
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <button className="p-1 text-stone-500 hover:text-orange-600 dark:text-stone-300 dark:hover:text-orange-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="uppercase tracking-wider text-[11px] font-black text-stone-800 dark:text-stone-100">THIS WEEK</span>
          <button className="p-1 text-stone-500 hover:text-orange-600 dark:text-stone-300 dark:hover:text-orange-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gantt Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[620px] relative">
          
          {/* Days & Rows */}
          <div className="space-y-4">
            {days.map((d) => (
              <div key={d.name} className="flex items-center text-xs">
                {/* Day Label with High Contrast */}
                <div className="w-24 font-black text-[11px] text-stone-700 dark:text-stone-200 tracking-wider uppercase">
                  {d.name}
                </div>

                {/* Timeline row track */}
                <div className="flex-1 h-3.5 relative bg-stone-200/80 dark:bg-[#28221d] rounded-full">
                  {d.bars.map((bar, bIdx) => (
                    <div
                      key={bIdx}
                      onClick={() => bar.isActive && onSelectClass && onSelectClass('course_vb_01')}
                      style={{ left: bar.start, width: bar.width }}
                      className={`absolute top-0 bottom-0 rounded-full cursor-pointer transition-all ${
                        bar.isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 ring-4 ring-orange-500/40 shadow-glow-orange-sm'
                          : 'bg-orange-400 dark:bg-orange-600/70 hover:bg-orange-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Time axis */}
          <div className="flex justify-between pl-24 pt-4 mt-2 border-t border-orange-200 dark:border-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-300">
            {hours.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>

          {/* Floating Tooltip Card on Active Bar */}
          {activeTooltip && (
            <div 
              style={{ left: '50%', top: '22%' }}
              className="absolute z-30 bg-white dark:bg-[#201c18] rounded-2xl shadow-2xl border-2 border-orange-400 dark:border-orange-500/70 p-3.5 w-52 -translate-x-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-xs text-stone-900 dark:text-white tracking-tight uppercase">
                    VISUAL BASIC (2/4)
                  </h4>
                  <div className="flex items-center space-x-1.5 mt-1">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&auto=format&fit=crop&q=80" 
                      alt="Instructor" 
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-[10px] text-stone-700 dark:text-stone-200 font-bold">LILIAN HILPERT</span>
                  </div>
                  <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-1 font-extrabold">
                    TUESDAY 9:30 - 12:30
                  </p>
                </div>
                <button 
                  onClick={() => onSelectClass && onSelectClass('course_vb_01')}
                  className="text-orange-600 hover:text-orange-700 dark:text-orange-400 p-1 rounded-lg hover:bg-orange-100 dark:hover:bg-black/30"
                  title="Open course details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default ClassesTimetable;
