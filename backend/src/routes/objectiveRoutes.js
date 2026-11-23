import express from 'express';
import { getObjectivesForCourse, saveObjectives } from '../services/dataService.js';
import { generateBloomsObjectivesWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const objectives = await getObjectivesForCourse(courseId);
    res.json({ success: true, data: objectives });
  } catch (err) {
    next(err);
  }
});

router.post('/generate', async (req, res, next) => {
  try {
    const { courseTitle, courseDescription, syllabusText } = req.body;
    if (!courseTitle || !syllabusText) {
      return res.status(400).json({ success: false, error: { message: 'Course title and syllabus text are required' } });
    }
    const generated = await generateBloomsObjectivesWithGemini({
      courseTitle,
      courseDescription,
      syllabusText
    });
    res.json({ success: true, data: generated, count: generated.length });
  } catch (err) {
    next(err);
  }
});

router.post('/save', async (req, res, next) => {
  try {
    const { objectives } = req.body;
    if (!Array.isArray(objectives)) {
      return res.status(400).json({ success: false, error: { message: 'Objectives array is required' } });
    }
    const saved = await saveObjectives(objectives);
    res.json({ success: true, data: saved, message: 'Objectives approved and saved' });
  } catch (err) {
    next(err);
  }
});

export default router;
