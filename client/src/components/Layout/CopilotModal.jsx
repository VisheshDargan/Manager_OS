import { useState, useRef, useEffect } from 'react';
import { aiFaq } from '../../lib/api.js';
import { demoUser } from '../../lib/mockData.js';

const SUGGESTED = [
  'Which projects are at risk?',
  'Who is overloaded on my team?',
  'What tasks are delayed on Aurora?',
  'When is Project Delta due?',
];

export default function CopilotModal({ onClose }) {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-4 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" style={{ height: '520px' }}>
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-navy rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-white text-base">✦</span>
            <span className="text-white font-semibold text-sm">ManagerOS Copilot</span>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button onClick={() => setHistory([])} className="text-slate-400 hover:text-white text-xs">
                Clear
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white text-lg leading-none">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
          {history.length === 0 && !loading && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Hi {demoUser.name.split(' ')[0]} 👋 Ask me anything about your projects and team.</p>
              <div className="space-y-1.5">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-slate-200 hover:border-accent hover:bg-accent/5 text-slate-600 transition"
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
                <div className="bg-accent text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                  {h.question}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] leading-relaxed whitespace-pre-wrap">
                  {h.answer}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 text-xs rounded-2xl rounded-tl-sm px-3 py-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                Thinking…
              </div>
            </div>
          )}

          {error && <p className="text-xs text-overdue text-center">{error}</p>}
          <div ref={bottomRef} />
        </div>

        <div className="px-3 py-2.5 border-t border-slate-100">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, team, deadlines…"
              disabled={loading}
              className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={!question.trim() || loading}
              className="bg-accent text-white rounded-lg px-3 py-2 text-xs font-medium hover:bg-blue-700 disabled:opacity-40 transition shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
