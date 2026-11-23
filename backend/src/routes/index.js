import express from 'express';
import healthRoutes from './healthRoutes.js';
import courseRoutes from './courseRoutes.js';
import objectiveRoutes from './objectiveRoutes.js';
import assessmentRoutes from './assessmentRoutes.js';
import submissionRoutes from './submissionRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = express.Router();

router.use('/', healthRoutes);
router.use('/courses', courseRoutes);
router.use('/objectives', objectiveRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/chat', chatRoutes);

export default router;
