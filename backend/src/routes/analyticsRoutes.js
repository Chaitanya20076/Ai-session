import express from 'express';
import { getTimetable, getCompetencyScores, getHistoryAssessments } from '../services/dataService.js';
import { generateRecommendationsWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.get('/dashboard-summary', async (req, res, next) => {
  try {
    const timetable = await getTimetable();
    const competencyScores = await getCompetencyScores();
    const historyAssessments = await getHistoryAssessments();

    // Calculate Average
    const total = competencyScores.reduce((acc, c) => acc + c.score, 0);
    const avgScore = (total / competencyScores.length).toFixed(1);

    res.json({
      success: true,
      data: {
        avgScore,
        maxScore: 20,
        avgPercentage: Math.round((avgScore / 20) * 100),
        competencyScores,
        timetable,
        historyAssessments,
        bloomsRadar: [
          { subject: 'L1: Remember', score: 88, fullMark: 100 },
          { subject: 'L2: Understand', score: 82, fullMark: 100 },
          { subject: 'L3: Apply', score: 71, fullMark: 100 },
          { subject: 'L4: Analyze', score: 65, fullMark: 100 },
          { subject: 'L5: Evaluate', score: 58, fullMark: 100 },
          { subject: 'L6: Create', score: 50, fullMark: 100 }
        ]
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/recommendations', async (req, res, next) => {
  try {
    const { studentName, courseTitle, weakObjectives, bloomsPerformance } = req.body;
    const recommendations = await generateRecommendationsWithGemini({
      studentName: studentName || 'Alex Morgan',
      courseTitle: courseTitle || 'Visual Basic & Application Architecture',
      weakObjectives: weakObjectives || ['L4 Memory Profiling', 'L5 Architecture Evaluation'],
      bloomsPerformance: bloomsPerformance || { L1: 88, L2: 82, L3: 71, L4: 65, L5: 58, L6: 50 }
    });
    res.json({ success: true, data: recommendations });
  } catch (err) {
    next(err);
  }
});

export default router;
