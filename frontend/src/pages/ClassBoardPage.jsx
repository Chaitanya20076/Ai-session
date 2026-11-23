import React, { useState, useEffect } from 'react';
import TopHeader from '../components/layout/TopHeader';
import LectureCardsRow from '../components/dashboard/LectureCardsRow';
import ClassesTimetable from '../components/dashboard/ClassesTimetable';
import GradesChartCard from '../components/dashboard/GradesChartCard';
import GroupStudyCard from '../components/dashboard/GroupStudyCard';
import HomeworkRightPanel from '../components/dashboard/HomeworkRightPanel';
import AssessmentModal from '../components/dashboard/AssessmentModal';
import CourseObjectivesModal from '../components/dashboard/CourseObjectivesModal';
import AIGeneratorModal from '../components/dashboard/AIGeneratorModal';
import api from '../services/api';

export const ClassBoardPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAssessmentId, setActiveAssessmentId] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [selectedCourseForAI, setSelectedCourseForAI] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data.success) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.warn('Backend connection fallback, using local seed data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleOpenAIGenerator = (course = null) => {
    setSelectedCourseForAI(course || courses[0]);
    setShowAIGenerator(true);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-6 pr-2 sm:pr-4">
      
      {/* Top Header */}
      <TopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAIGenerator={() => handleOpenAIGenerator(null)}
      />

      {/* Main Two-Column Layout (Middle Grid + Right Homework Panel) */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 mt-2 sm:mt-3 px-2 sm:px-4">
        
        {/* Left Column (3 Rows matching the user's uploaded screenshot) */}
        <div className="flex-1 space-y-4 sm:space-y-5 min-w-0">
          
          {/* Row 1: Top 3 Lecture Cards */}
          <LectureCardsRow
            courses={courses}
            onSelectCourse={(id) => setActiveCourseId(id)}
          />

          {/* Row 2: Classes Timetable Gantt Chart with interactive tooltip */}
          <ClassesTimetable
            onSelectClass={(id) => setActiveCourseId(id)}
          />

          {/* Row 3: Split row (Grades / Competency Chart + Group Study & AI Chat) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GradesChartCard
              onOpenAssessmentDetails={() => setActiveAssessmentId('asm_vb_01')}
            />
            <GroupStudyCard />
          </div>

        </div>

        {/* Right Column: Homework Panel (Matching the floating curved panel in the image) */}
        <HomeworkRightPanel
          onStartAssessment={(id) => setActiveAssessmentId(id)}
        />

      </div>

      {/* Interactive Examination Modal */}
      {activeAssessmentId && (
        <AssessmentModal
          assessmentId={activeAssessmentId}
          onClose={() => setActiveAssessmentId(null)}
          onCompleted={(result) => {
            console.log('Exam completed:', result);
          }}
        />
      )}

      {/* Course Objectives Modal */}
      {activeCourseId && (
        <CourseObjectivesModal
          courseId={activeCourseId}
          onClose={() => setActiveCourseId(null)}
          onOpenAIGenerator={(course) => handleOpenAIGenerator(course)}
        />
      )}

      {/* AI Bloom's Taxonomy Objectives Generator Modal */}
      {showAIGenerator && (
        <AIGeneratorModal
          course={selectedCourseForAI}
          onClose={() => setShowAIGenerator(false)}
          onObjectivesSaved={(saved) => {
            console.log('Saved objectives:', saved);
          }}
        />
      )}

    </div>
  );
};

export default ClassBoardPage;
