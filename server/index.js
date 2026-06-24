require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-sonnet-4-6';

async function ask(system, user, maxTokens = 600) {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
  });
  return msg.content.map((c) => c.text).join('\n');
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
    console.error(e);
    res.status(500).json({ error: 'AI request failed' });
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
    console.error(e);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.post('/api/ai/email-thread', async (req, res) => {
  try {
    const { thread } = req.body;
    const text = await ask(
      `You are an AI assistant inside an enterprise email copilot. Given an email thread (array of messages), respond ONLY with valid JSON of the shape {"summary": string, "replies": [string, string, string]}. The summary should be 2-3 sentences capturing the thread context and what's being asked. The replies should be 3 short, distinct one-line reply options the manager could send, appropriate in tone to the thread. Do not include any markdown or extra text outside the JSON.`,
      JSON.stringify(thread, null, 2),
      500
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
    console.error(e);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.post('/api/ai/meeting-notes', async (req, res) => {
  try {
    const { meeting } = req.body;
    const text = await ask(
      `You are an AI assistant generating meeting notes for an enterprise manager. Given meeting context (title, attendees, agenda/mock transcript hints), respond ONLY with valid JSON of the shape {"summary": string, "decisions": string[], "actionItems": [{"item": string, "owner": string, "dueDate": string}], "nextSteps": string}. Make it realistic and specific to the meeting title and attendees given. Do not include markdown or text outside the JSON.`,
      JSON.stringify(meeting, null, 2),
      800
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
    console.error(e);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.post('/api/ai/one-on-one-prep', async (req, res) => {
  try {
    const { member } = req.body;
    const text = await ask(
      `You are an AI assistant helping a manager prepare for a 1:1 with a direct report. Given the team member's profile (workload, leave status, feedback history, tasks), respond ONLY with valid JSON of the shape {"wentWell": string[], "needsAttention": string[], "questions": string[], "developmentOpportunities": string[]}. Be specific to this person's situation. Do not include markdown or text outside the JSON.`,
      JSON.stringify(member, null, 2),
      700
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
    console.error(e);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.post('/api/ai/faq', async (req, res) => {
  try {
    const { document: docText, question, history } = req.body;
    if (!docText?.trim()) return res.status(400).json({ error: 'No document provided' });
    if (!question?.trim()) return res.status(400).json({ error: 'No question provided' });

    const system = `You are a helpful FAQ assistant. Answer the user's question strictly based on the document content provided below. If the answer is not found in the document, say "I could not find that in the provided document." Be concise and direct.\n\nDOCUMENT CONTENT:\n${docText}`;

    const userMessage = history && history.length > 0
      ? `Previous questions:\n${history.map((h) => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n')}\n\nNew question: ${question}`
      : question;

    const answer = await ask(system, userMessage, 800);
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
