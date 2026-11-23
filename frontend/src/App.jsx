import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ClassBoardPage from './pages/ClassBoardPage';
import TimetablePage from './pages/TimetablePage';
import AnalyticsPage from './pages/AnalyticsPage';
import CoursesPage from './pages/CoursesPage';
import AssessmentsPage from './pages/AssessmentsPage';
import StudyGroupPage from './pages/StudyGroupPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      {/* Primary Dashboard and Sub-Views matching the attached UI design */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ClassBoardPage />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="study-group" element={<StudyGroupPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Semantic alias routes for user role navigation */}
        <Route path="student/dashboard" element={<Navigate to="/" replace />} />
        <Route path="student/explore" element={<Navigate to="/courses" replace />} />
        <Route path="student/courses" element={<Navigate to="/courses" replace />} />
        <Route path="student/materials" element={<Navigate to="/courses" replace />} />
        <Route path="student/assessments" element={<Navigate to="/assessments" replace />} />
        <Route path="student/performance" element={<Navigate to="/analytics" replace />} />
        <Route path="student/recommendations" element={<Navigate to="/analytics" replace />} />

        <Route path="faculty/dashboard" element={<Navigate to="/" replace />} />
        <Route path="faculty/courses" element={<Navigate to="/courses" replace />} />
        <Route path="faculty/courses/create" element={<Navigate to="/courses" replace />} />
        <Route path="faculty/objectives" element={<Navigate to="/courses" replace />} />
        <Route path="faculty/materials" element={<Navigate to="/courses" replace />} />
        <Route path="faculty/assessments" element={<Navigate to="/assessments" replace />} />
        <Route path="faculty/analytics" element={<Navigate to="/analytics" replace />} />

        <Route path="admin/dashboard" element={<Navigate to="/settings" replace />} />
        <Route path="admin/approvals" element={<Navigate to="/settings" replace />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
