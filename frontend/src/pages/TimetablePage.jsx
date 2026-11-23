import React from 'react';
import ClassesTimetable from '../components/dashboard/ClassesTimetable';

export const TimetablePage = () => {
  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-7xl mx-auto w-full">
      <div className="card-visionary p-6 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
          Academic Schedule
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
          Weekly Lecture &amp; Lab Timetable
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Interactive Gantt schedule of live sessions, lab demonstrations, and case study reviews.
        </p>
      </div>

      <ClassesTimetable />
    </div>
  );
};

export default TimetablePage;
