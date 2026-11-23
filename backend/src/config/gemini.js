import { GoogleGenerativeAI } from '@google/generative-ai';

let genAIInstance = null;

export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
};

export const getGeminiModel = () => {
  return process.env.GEMINI_MODEL || 'gemini-1.5-flash';
};

export const isGeminiConfigured = () => {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key !== 'your_gemini_api_key_here');
};
