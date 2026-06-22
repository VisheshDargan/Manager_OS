import { useEffect, useState } from 'react';
import { aiEmailThread } from '../../lib/api.js';
import Spinner from '../Layout/Spinner.jsx';

export default function EmailPanel({ email, onClose }) {
  const [ai, setAi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reply, setReply] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(false);
    aiEmailThread(email.thread)
      .then(setAi)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [email.id]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{email.subject}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <div className="px-6 py-4 border-b border-slate-100 space-y-4">
          {email.thread.map((m, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-700">{m.from}</span>
                <span>{m.time}</span>
              </div>
              <p className="text-sm text-slate-700">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2"><span className="text-accent">✦</span> AI Summary</h4>
          {loading && <Spinner label="Summarizing thread…" />}
          {error && <p className="text-sm text-overdue">Couldn't load AI summary.</p>}
          {!loading && !error && <p className="text-sm text-slate-600">{ai?.summary}</p>}
        </div>

        {!loading && !error && ai?.replies?.length > 0 && (
          <div className="px-6 py-4 border-b border-slate-100">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Suggested Replies</h4>
            <div className="space-y-2">
              {ai.replies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setReply(r)}
                  className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-slate-200 hover:border-accent hover:bg-accent/5 text-slate-700"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4 flex-1">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a custom reply…"
            className="w-full h-28 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-accent/40 resize-none"
          />
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex gap-2">
          <button className="flex-1 bg-accent text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700">Reply</button>
          <button className="flex-1 bg-slate-100 text-slate-700 text-sm font-medium py-2 rounded-lg hover:bg-slate-200">Mark Done</button>
          <button className="flex-1 bg-slate-100 text-slate-700 text-sm font-medium py-2 rounded-lg hover:bg-slate-200">Snooze</button>
        </div>
      </div>
    </div>
  );
}
