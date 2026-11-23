import express from 'express';
import { getChatMessages, postChatMessage } from '../services/dataService.js';
import { askStudyGroupAITutor } from '../services/geminiService.js';

const router = express.Router();

router.get('/messages', async (req, res, next) => {
  try {
    const messages = await getChatMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
});

router.post('/send', async (req, res, next) => {
  try {
    const { text, sender } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ success: false, error: { message: 'Message text is required' } });
    }

    // Save student message
    const userMsg = await postChatMessage({
      sender: sender || 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text
    });

    // Check if message asks for AI assistance or mention
    const isAiQuery = text.toLowerCase().includes('ai') || text.toLowerCase().includes('help') || text.toLowerCase().includes('how') || text.toLowerCase().includes('what') || text.toLowerCase().includes('explain');

    let aiMsg = null;
    if (isAiQuery) {
      const aiResponse = await askStudyGroupAITutor({
        userMessage: text,
        courseTitle: 'Visual Basic & Application Architecture'
      });

      aiMsg = await postChatMessage({
        sender: 'LearnSphere AI',
        isAI: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        text: aiResponse
      });
    }

    res.json({ success: true, data: { userMsg, aiMsg } });
  } catch (err) {
    next(err);
  }
});

export default router;
