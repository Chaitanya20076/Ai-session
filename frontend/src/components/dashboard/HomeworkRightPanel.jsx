import React from 'react';
import { ListFilter, X, MessageCircle, Paperclip } from 'lucide-react';

export const HomeworkRightPanel = ({ onStartAssessment, onClose }) => {
  const tasks = [
    {
      id: 'asm_wf_02',
      title: 'WORKFLOW STRATEGY',
      posted: 'POSTED MONDAY 19.10.2026',
      due: 'DUE WEDNESDAY',
      points: '5 POINTS',
      progress: 0,
      comments: 2,
      attachments: 0
    },
    {
      id: 'asm_vb_01',
      title: 'VISUAL BASIC',
      posted: 'POSTED MONDAY 19.10.2026',
      due: 'DUE WEDNESDAY',
      points: '20 POINTS',
      progress: 80,
      isActive: true,
      comments: 2,
      attachments: 3
    },
    {
      id: 'asm_ux_03',
      title: 'UI/UX DESIGN',
      posted: 'POSTED MONDAY 19.10.2026',
      due: 'DUE WEDNESDAY',
      points: '5 POINTS',
      progress: 20,
      comments: 2,
      attachments: 0
    }
  ];

  const history = [
    {
      title: 'SEO',
      score: '0/5',
      due: 'DUE FRIDAY 23.10.2026',
      submitted: 'HANDED THURSDAY 22.10.2026',
      status: 'CORRECTION PENDING',
      statusColor: 'text-[#ef4444]'
    },
    {
      title: 'JAVASCRIPT',
      score: '14/20',
      due: 'DUE FRIDAY 23.10.2026',
      submitted: 'HANDED THURSDAY 22.10.2026',
      status: 'GREAT',
      statusColor: 'text-[#ea580c] dark:text-[#fb923c]'
    },
    {
      title: 'HTML',
      score: '0/20',
      due: 'DUE FRIDAY 23.10.2026',
      submitted: 'HANDED THURSDAY 22.10.2026',
      status: null,
      statusColor: 'text-stone-500'
    }
  ];

  return (
    <aside className="w-full lg:w-[310px] card-visionary p-5 sm:p-6 shadow-2xl flex flex-col justify-between flex-shrink-0">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-orange-200 dark:border-stone-800 mb-4">
          <div className="flex items-center space-x-2">
            <ListFilter className="w-4 h-4 text-orange-600 dark:text-orange-400 stroke-[2.5]" />
            <h2 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wider">
              HOMEWORK
            </h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const circumference = 2 * Math.PI * 14;
            const strokeDashoffset = circumference - (task.progress / 100) * circumference;

            if (task.isActive) {
              return (
                <div
                  key={task.id}
                  onClick={() => onStartAssessment(task.id)}
                  className="active-homework-card p-4 cursor-pointer hover:shadow-xl transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-black text-xs uppercase tracking-wider text-white">
                        {task.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-wide text-white font-bold mt-1">
                        {task.posted}<br/>
                        {task.due}
                      </p>
                      <p className="text-[11px] font-black text-yellow-200 mt-1">
                        {task.points}
                      </p>
                    </div>

                    {/* Circular Progress in White */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-10 h-10 -rotate-90">
                        <circle cx="20" cy="20" r="14" stroke="rgba(255,255,255,0.3)" strokeWidth="3.5" fill="none" />
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="14" 
                          stroke="#ffffff" 
                          strokeWidth="3.5" 
                          fill="none" 
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="circle-progress-fill"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-black text-white">{task.progress}%</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-white/25 text-white text-[10px] font-bold">
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{task.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{task.attachments}</span>
                    </span>
                    <span className="ml-auto text-[10px] font-black underline cursor-pointer text-yellow-200">
                      Open Exam &rarr;
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={task.id}
                onClick={() => onStartAssessment(task.id)}
                className="p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all bg-stone-50 dark:bg-[#201b17] border border-orange-200 dark:border-stone-800 hover:border-orange-500"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-wider text-stone-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wide text-stone-700 dark:text-stone-300 font-bold mt-1">
                      {task.posted}<br/>
                      {task.due}
                    </p>
                    <p className="text-[11px] font-black text-orange-600 dark:text-orange-400 mt-1">
                      {task.points}
                    </p>
                  </div>

                  {/* Circular Progress in Orange */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-10 h-10 -rotate-90">
                      <circle cx="20" cy="20" r="14" stroke="#d6d3d1" strokeWidth="3.5" fill="none" className="dark:stroke-stone-700" />
                      <circle 
                        cx="20" 
                        cy="20" 
                        r="14" 
                        stroke="#ea580c" 
                        strokeWidth="3.5" 
                        fill="none" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="circle-progress-fill"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-black text-stone-900 dark:text-white">{task.progress}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-orange-100 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{task.comments}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{task.attachments}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History List with High Contrast */}
      <div className="mt-6 pt-4 border-t border-orange-200 dark:border-stone-800 space-y-3.5">
        {history.map((h, i) => (
          <div key={i} className="text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-[11px] uppercase tracking-wider text-stone-900 dark:text-white">
                {h.title}
              </span>
              <span className="font-black text-[11px] text-stone-900 dark:text-white">
                {h.score}
              </span>
            </div>
            <p className="text-[10px] text-stone-700 dark:text-stone-300 font-bold uppercase mt-0.5">
              {h.due}<br/>
              {h.submitted}
            </p>
            {h.status && (
              <p className={`text-[10px] font-black uppercase mt-0.5 ${h.statusColor}`}>
                {h.status}
              </p>
            )}
          </div>
        ))}
      </div>

    </aside>
  );
};

export default HomeworkRightPanel;
