import express from 'express';
import { getAssessments, getAssessmentById, saveAssessment } from '../services/dataService.js';
import { generateQuestionsWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const assessments = await getAssessments(courseId);
    res.json({ success: true, data: assessments });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const isStudent = req.query.role === 'student' || req.headers['x-role'] === 'student';
    const assessment = await getAssessmentById(req.params.id, isStudent);
    if (!assessment) {
      return res.status(404).json({ success: false, error: { message: 'Assessment not found' } });
    }
    res.json({ success: true, data: assessment });
  } catch (err) {
    next(err);
  }
});

router.post('/generate', async (req, res, next) => {
  try {
    const { courseTitle, topics, objectives, count, difficulty } = req.body;
    const questions = await generateQuestionsWithGemini({
      courseTitle: courseTitle || 'Computer Science',
      topics: topics || [],
      objectives: objectives || [],
      count: count || 4,
      difficulty: difficulty || 'medium'
    });
    res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
});

router.post('/publish', async (req, res, next) => {
  try {
    const assessmentData = req.body;
    if (!assessmentData.title || !assessmentData.questions) {
      return res.status(400).json({ success: false, error: { message: 'Title and questions are required' } });
    }
    const saved = await saveAssessment(assessmentData);
    res.status(201).json({ success: true, data: saved, message: 'Assessment published to students' });
  } catch (err) {
    next(err);
  }
});

export default router;
