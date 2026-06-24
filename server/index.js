require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = 'gemini-2.5-flash';

async function ask(system, user) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: system,
  });
  const result = await model.generateContent(user);
  return result.response.text();
}

app.post('/api/ai/project-summary', async (req, res) => {
  try {
    const { project } = req.body;
    const text = await ask(
      'You are an AI assistant inside an enterprise project management tool called ManagerOS. Given structured project data, write a concise 3-4 sentence health summary in natural language for a delivery manager. Call out blockers, delayed tasks, and end with one recommended action. Be direct and specific, referencing real task/owner names from the data.',
      JSON.stringify(project, null, 2)
    );
    res.json({ summary: text });
  } catch (e) {
    console.error('project-summary error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

app.post('/api/ai/email-briefing', async (req, res) => {
  try {
    const { emails, totalCount } = req.body;
    const text = await ask(
      'You are an AI assistant inside an enterprise email copilot called ManagerOS. Given a list of categorized emails (critical/important/routine) and a total inbox count, write a 3-4 sentence morning briefing paragraph for a busy delivery head, mentioning specific senders/subjects for critical items and rough counts for the rest.',
      JSON.stringify({ totalCount, emails }, null, 2)
    );
    res.json({ briefing: text });
  } catch (e) {
    console.error('email-briefing error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

app.post('/api/ai/email-thread', async (req, res) => {
  try {
    const { thread } = req.body;
    const text = await ask(
      'You are an AI assistant inside an enterprise email copilot. Given an email thread (array of messages), respond ONLY with valid JSON of the shape {"summary": string, "replies": [string, string, string]}. The summary should be 2-3 sentences capturing the thread context and what is being asked. The replies should be 3 short, distinct one-line reply options the manager could send, appropriate in tone to the thread. Do not include any markdown or extra text outside the JSON.',
      JSON.stringify(thread, null, 2)
    );
    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { summary: text, replies: [] };
    }
    res.json(parsed);
  } catch (e) {
    console.error('email-thread error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

app.post('/api/ai/meeting-notes', async (req, res) => {
  try {
    const { meeting } = req.body;
    const text = await ask(
      'You are an AI assistant generating meeting notes for an enterprise manager. Given meeting context (title, attendees, agenda/mock transcript hints), respond ONLY with valid JSON of the shape {"summary": string, "decisions": string[], "actionItems": [{"item": string, "owner": string, "dueDate": string}], "nextSteps": string}. Make it realistic and specific to the meeting title and attendees given. Do not include markdown or text outside the JSON.',
      JSON.stringify(meeting, null, 2)
    );
    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { summary: text, decisions: [], actionItems: [], nextSteps: '' };
    }
    res.json(parsed);
  } catch (e) {
    console.error('meeting-notes error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

app.post('/api/ai/one-on-one-prep', async (req, res) => {
  try {
    const { member } = req.body;
    const text = await ask(
      'You are an AI assistant helping a manager prepare for a 1:1 with a direct report. Given the team member\'s profile (workload, leave status, feedback history, tasks), respond ONLY with valid JSON of the shape {"wentWell": string[], "needsAttention": string[], "questions": string[], "developmentOpportunities": string[]}. Be specific to this person\'s situation. Do not include markdown or text outside the JSON.',
      JSON.stringify(member, null, 2)
    );
    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { wentWell: [], needsAttention: [], questions: [], developmentOpportunities: [] };
    }
    res.json(parsed);
  } catch (e) {
    console.error('one-on-one error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

app.post('/api/ai/faq', async (req, res) => {
  try {
    const { document: docText, question, history } = req.body;
    if (!docText?.trim()) return res.status(400).json({ error: 'No document provided' });
    if (!question?.trim()) return res.status(400).json({ error: 'No question provided' });

    const system = docText?.trim()
      ? `You are a smart, friendly AI assistant called ManagerOS Copilot. You help enterprise managers with their questions. A reference document has been provided — use it to answer document-related questions. For general questions, greetings, or anything not covered in the document, just respond naturally and helpfully like a knowledgeable assistant would.\n\nREFERENCE DOCUMENT:\n${docText}`
      : `You are a smart, friendly AI assistant called ManagerOS Copilot. You help enterprise managers with their questions about projects, teams, clients, and work. Be conversational, helpful, and concise.`;

    const userMessage = history && history.length > 0
      ? `Previous questions:\n${history.map((h) => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n')}\n\nNew question: ${question}`
      : question;

    const answer = await ask(system, userMessage);
    res.json({ answer });
  } catch (e) {
    console.error('FAQ error:', e.message);
    res.status(500).json({ error: e.message || 'AI request failed' });
  }
});

const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (req, res) => res.sendFile(path.join(clientDist, 'index.html')));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`ManagerOS server running on port ${PORT}`));
