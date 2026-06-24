require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log('Key starts with:', process.env.GEMINI_API_KEY?.slice(0, 10));

genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  .generateContent('Say hi in one word')
  .then((r) => console.log('SUCCESS:', r.response.text()))
  .catch((e) => console.log('ERROR:', e.message));
