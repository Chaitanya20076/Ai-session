import React from 'react';
import GroupStudyCard from '../components/dashboard/GroupStudyCard';

export const StudyGroupPage = () => {
  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 space-y-5 max-w-5xl mx-auto w-full">
      <div className="card-visionary p-6 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-lg border border-orange-300 dark:border-orange-600/30">
          Collaborative Hub
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-cream-50 mt-2">
          AI-Powered Peer Study Group
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Discuss lecture topics with peers and receive instant Socratic cognitive guidance from LearnSphere AI.
        </p>
      </div>

      <div className="min-h-[460px]">
        <GroupStudyCard />
      </div>
    </div>
  );
};

export default StudyGroupPage;
