import express from 'express';
import { getAssessmentById } from '../services/dataService.js';
import { evaluateDescriptiveAnswerWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.post('/submit', async (req, res, next) => {
  try {
    const { assessmentId, studentId, answers, startTime } = req.body;
    const assessment = await getAssessmentById(assessmentId, false);

    if (!assessment) {
      return res.status(404).json({ success: false, error: { message: 'Assessment not found' } });
    }

    let totalMarksObtained = 0;
    let totalMaxMarks = 0;
    const questionResults = [];
    const bloomsMastery = { 1: { obtained: 0, max: 0 }, 2: { obtained: 0, max: 0 }, 3: { obtained: 0, max: 0 }, 4: { obtained: 0, max: 0 }, 5: { obtained: 0, max: 0 }, 6: { obtained: 0, max: 0 } };

    for (const q of assessment.questions) {
      const studentAns = answers ? answers[q.id] : '';
      const maxMarks = q.maxMarks || 5;
      totalMaxMarks += maxMarks;

      const level = q.bloomsLevel || 1;
      if (!bloomsMastery[level]) bloomsMastery[level] = { obtained: 0, max: 0 };
      bloomsMastery[level].max += maxMarks;

      let awarded = 0;
      let feedback = '';

      if (q.questionType === 'mcq' || q.questionType === 'true_false') {
        const isCorrect = String(studentAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        awarded = isCorrect ? maxMarks : 0;
        feedback = isCorrect ? 'Correct response!' : `Incorrect. Correct answer: ${q.correctAnswer}`;
      } else if (q.questionType === 'multi_select') {
        // Multi-select matching
        const expected = String(q.correctAnswer).toLowerCase();
        const given = String(studentAns).toLowerCase();
        if (given.length > 0 && expected.includes(given)) {
          awarded = maxMarks;
          feedback = 'Accurate selection.';
        } else {
          awarded = 0;
          feedback = 'Missing key selections.';
        }
      } else {
        // Descriptive / short answer: use Gemini AI rubric evaluator
        const evalResult = await evaluateDescriptiveAnswerWithGemini({
          questionText: q.questionText,
          rubric: q.markingRubric,
          maxMarks,
          studentAnswer: studentAns
        });
        awarded = evalResult.marksAwarded;
        feedback = evalResult.feedback;
      }

      totalMarksObtained += awarded;
      bloomsMastery[level].obtained += awarded;

      questionResults.push({
        questionId: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        maxMarks,
        marksAwarded: awarded,
        feedback,
        bloomsLevel: level
      });
    }

    const percentage = Math.round((totalMarksObtained / totalMaxMarks) * 100);

    // Calculate Bloom's achievement percentages
    const bloomsPercentages = {};
    for (let i = 1; i <= 6; i++) {
      if (bloomsMastery[i].max > 0) {
        bloomsPercentages[`L${i}`] = Math.round((bloomsMastery[i].obtained / bloomsMastery[i].max) * 100);
      } else {
        bloomsPercentages[`L${i}`] = null; // Unassessed
      }
    }

    res.json({
      success: true,
      data: {
        assessmentId,
        title: assessment.title,
        studentId: studentId || 'demo_student_001',
        totalMarksObtained,
        totalMaxMarks,
        percentage,
        bloomsPercentages,
        questionResults,
        submittedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
