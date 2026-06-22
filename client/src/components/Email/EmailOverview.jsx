import { useEffect, useState } from 'react';
import { emails, totalEmailCount } from '../../lib/mockData.js';
import { aiEmailBriefing } from '../../lib/api.js';
import Spinner from '../Layout/Spinner.jsx';
import EmailPanel from './EmailPanel.jsx';

export default function EmailOverview() {
  const [briefing, setBriefing] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    aiEmailBriefing(emails, totalEmailCount)
      .then((res) => setBriefing(res.briefing))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">Today · {totalEmailCount} emails</p>
      </div>

      <div className="bg-navy text-white rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><span className="text-accent">✦</span> Email Briefing</h3>
        {loading && <Spinner label="Reading your inbox…" />}
        {error && <p className="text-sm text-slate-300">Couldn't generate briefing right now.</p>}
        {!loading && !error && <p className="text-sm text-slate-200 leading-relaxed">{briefing}</p>}
      </div>

      <Section title="Critical — needs action today">
        <div className="grid grid-cols-1 gap-3">
          {emails.critical.map((e) => (
            <EmailCard key={e.id} email={e} onClick={() => setSelected(e)} accent="border-l-overdue" />
          ))}
        </div>
      </Section>

      <Section title="Important — FYI / respond soon">
        <div className="grid grid-cols-1 gap-3">
          {emails.important.map((e) => (
            <EmailCard key={e.id} email={e} onClick={() => setSelected(e)} accent="border-l-risk" />
          ))}
        </div>
      </Section>

      <Section title="Routine">
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          {emails.routine.map((e) => (
            <div key={e.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="font-medium text-slate-700">{e.sender}</span>
              <span className="text-slate-500 truncate ml-4">{e.subject}</span>
            </div>
          ))}
        </div>
      </Section>

      {selected && <EmailPanel email={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-600 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function EmailCard({ email, onClick, accent }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 ${accent} border-l-4 rounded-xl p-4 cursor-pointer hover:shadow-sm transition`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-slate-800 text-sm">{email.sender}{email.company ? ` · ${email.company}` : ''}</span>
        <span className="text-xs text-slate-400">{email.time}</span>
      </div>
      <p className="text-sm text-slate-700 mb-1">{email.subject}</p>
      <p className="text-xs text-slate-500">{email.summary}</p>
    </div>
  );
}
