import React from 'react';
import { MoreVertical, VideoOff, MessageSquare, Video as CameraIcon } from 'lucide-react';

export const LectureCardsRow = ({ courses, onSelectCourse }) => {
  const lectureItems = [
    {
      id: 'course_vb_01',
      title: 'VISUAL BASIC - L. HILPERT (2/4)',
      time: 'TUESDAY 9:30 - 12:30',
      attendees: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
      ],
      extraCount: '+3',
      hasVideoMute: false
    },
    {
      id: 'course_uiux_02',
      title: 'UI/UX DESIGN - D. GOLDNER (6/6)',
      time: 'TUESDAY 9:30 - 12:30',
      attendees: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80'
      ],
      extraCount: '+6',
      hasVideoMute: true
    },
    {
      id: 'course_seo_03',
      title: 'SEO (1/2)',
      time: 'TUESDAY 9:30 - 12:30',
      attendees: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80'
      ],
      extraCount: '+3',
      hasVideoMute: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {lectureItems.map((lecture) => (
        <div
          key={lecture.id}
          onClick={() => onSelectCourse(lecture.id)}
          className="card-visionary p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
        >
          {/* Top Video Preview Box */}
          <div className="w-full h-32 rounded-2xl bg-[#524b45] dark:bg-[#2a2420] relative flex flex-col items-center justify-center overflow-hidden border border-orange-200/40 dark:border-orange-500/20 shadow-inner">
            <button 
              onClick={(e) => { e.stopPropagation(); }}
              className="absolute top-2.5 right-2.5 text-stone-200 hover:text-white"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Camera icon */}
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80 mb-1 group-hover:scale-110 transition-transform">
              <CameraIcon className="w-5 h-5 stroke-[1.8]" />
            </div>

            {/* Time badge in ultra-crisp white */}
            <span className="text-[11px] font-black text-white tracking-wider uppercase drop-shadow-md bg-black/40 px-3 py-0.5 rounded-full">
              {lecture.time}
            </span>
          </div>

          {/* Title and footer with Crystal-Clear Contrast */}
          <div className="pt-3">
            <h3 className="font-black text-xs sm:text-[13px] tracking-tight text-stone-900 dark:text-white uppercase group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {lecture.title}
            </h3>

            <div className="mt-3 flex items-center justify-between">
              {/* Overlapping attendees */}
              <div className="flex items-center -space-x-2">
                {lecture.attendees.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Attendee"
                    className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-[#181513] shadow-xs"
                  />
                ))}
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white dark:border-[#181513] shadow-xs">
                  {lecture.extraCount}
                </span>
              </div>

              {/* Action Icons */}
              <div className="flex items-center space-x-2 text-stone-600 dark:text-stone-300">
                {lecture.hasVideoMute && (
                  <VideoOff className="w-4 h-4 hover:text-orange-600 dark:hover:text-orange-400" />
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectCourse(lecture.id); }}
                  className="p-1.5 rounded-lg hover:bg-orange-100 dark:hover:bg-[#25201c] hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default LectureCardsRow;
