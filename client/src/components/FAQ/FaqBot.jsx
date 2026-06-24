import { useState, useRef, useEffect } from 'react';
import { aiFaq } from '../../lib/api.js';
import { projects, teamMembers, demoUser } from '../../lib/mockData.js';

const SUGGESTED = [
  'Which projects are delayed or at risk?',
  'Who is working on Project Aurora?',
  'What are the open tasks on Project Titan?',
  'Which team members are overloaded?',
  'When is Project Delta due?',
  'What milestones have been missed?',
];

export default function FaqBot() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSend = async (q) => {
    const text = (q || question).trim();
    if (!text || loading) return;
    setQuestion('');
    setError('');
    setLoading(true);
    try {
      const res = await aiFaq(null, text, history);
      setHistory((h) => [...h, { question: text, answer: res.answer }]);
    } catch (e) {
      setError(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-accent text-base">✦</span>
          <h3 className="font-semibold text-slate-800">ManagerOS Copilot</h3>
          <span className="text-xs text-slate-400 ml-1">— ask anything about your projects and team</span>
        </div>
        <button
          onClick={() => setHistory([])}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          Clear chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
        {history.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full gap-5 py-8">
            <div className="text-center">
              <div className="text-4xl mb-2">✦</div>
              <p className="text-slate-700 font-medium">Hi {demoUser.name.split(' ')[0]}, I know everything about your projects and team.</p>
              <p className="text-sm text-slate-400 mt-1">Ask me anything — here are some examples:</p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="text-left text-sm px-3 py-2.5 rounded-lg border border-slate-200 hover:border-accent hover:bg-accent/5 text-slate-600 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {history.map((h, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-accent text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-sm">
                {h.question}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-800 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-prose leading-relaxed whitespace-pre-wrap">
                {h.answer}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-500 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              Thinking…
            </div>
          </div>
        )}

        {error && <p className="text-sm text-overdue text-center">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex gap-2 items-end">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your projects, team, deadlines, risks…"
            disabled={loading}
            rows={2}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 resize-none disabled:opacity-50 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!question.trim() || loading}
            className="bg-accent text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition shrink-0"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1.5 px-1">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
