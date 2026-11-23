import express from 'express';
import { isFirebaseInitialized } from '../config/firebase.js';
import { isGeminiConfigured, getGeminiModel } from '../config/gemini.js';

const router = express.Router();

router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      app: 'LearnSphere AI API Gateway',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(uptime),
      environment: process.env.NODE_ENV || 'development',
      services: {
        firebaseAdmin: isFirebaseInitialized ? 'connected' : 'unconfigured_pending_key',
        geminiAI: isGeminiConfigured() ? `configured (${getGeminiModel()})` : 'unconfigured_pending_key',
        storage: process.env.STORAGE_MODE || 'local'
      },
      memory: {
        rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024)
      }
    }
  });
});

export default router;
