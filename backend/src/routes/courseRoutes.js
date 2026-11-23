import express from 'express';
import { getCourses, getCourseById, enrollInCourse } from '../services/dataService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const courses = await getCourses();
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: { message: 'Course not found' } });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
});

router.post('/enroll', async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, error: { message: 'Course ID is required' } });
    }
    const enrollment = await enrollInCourse({
      studentId: studentId || 'demo_student_001',
      courseId
    });
    res.status(201).json({ success: true, data: enrollment, message: 'Successfully enrolled in course' });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

export default router;
