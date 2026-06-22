import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { meetings, transcriptExcerpt } from '../../lib/mockData.js';
import { aiMeetingNotes } from '../../lib/api.js';
import Spinner from '../Layout/Spinner.jsx';

const tabs = ['AI Meeting Notes', 'Attachments', 'Recording'];

export default function MeetingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = meetings.find((m) => String(m.id) === id);
  const [tab, setTab] = useState(tabs[0]);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!meeting) return;
    setLoading(true);
    setError(false);
    aiMeetingNotes(meeting)
      .then(setNotes)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [meeting?.id]);

  if (!meeting) return <div>Meeting not found.</div>;

  return (
    <div>
      <button onClick={() => navigate('/meetings')} className="text-sm text-accent mb-4 hover:underline">
        ← Back to Meetings
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-1">{meeting.title}</h2>
        <p className="text-sm text-slate-500 mb-3">
          June 22, 2026 · {meeting.time} · {meeting.duration} min · {meeting.platform}
        </p>
        <div className="flex flex-wrap gap-2">
          {meeting.attendees.map((a, i) => (
            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              {a}{meeting.attendeeRoles?.[a] ? ` · ${meeting.attendeeRoles[a]}` : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              tab === t ? 'bg-accent text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        {tab === 'AI Meeting Notes' && (
          <div>
            {loading && <Spinner label="Generating meeting notes…" />}
            {error && <p className="text-sm text-overdue">Couldn't generate AI notes right now.</p>}
            {!loading && !error && notes && (
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Summary</h4>
                  <p className="text-sm text-slate-600">{notes.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Key Decisions Made</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    {notes.decisions?.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Action Items</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 border-b border-slate-200">
                        <th className="py-1.5 pr-4">Item</th>
                        <th className="py-1.5 pr-4">Owner</th>
                        <th className="py-1.5 pr-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.actionItems?.map((a, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0">
                          <td className="py-2 pr-4 text-slate-700">{a.item}</td>
                          <td className="py-2 pr-4 text-slate-600">{a.owner}</td>
                          <td className="py-2 pr-4 text-slate-500">{a.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Next Steps</h4>
                  <p className="text-sm text-slate-600">{notes.nextSteps}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'Attachments' && (
          <div className="space-y-2">
            {meeting.attachments.length === 0 && <p className="text-sm text-slate-500">No attachments for this meeting.</p>}
            {meeting.attachments.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-50 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <span>{a.type === 'pdf' ? '📄' : a.type === 'ppt' ? '📊' : '📝'}</span>
                  {a.name}
                </span>
                <span className="text-slate-400 text-xs">{a.size}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'Recording' && (
          <div>
            <div className="bg-navy rounded-xl aspect-video flex items-center justify-center text-white mb-5">
              <div className="text-center">
                <div className="text-3xl mb-2">▶️</div>
                <p className="text-sm text-slate-300">{meeting.title} — Recording</p>
              </div>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Transcript Excerpt</h4>
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{transcriptExcerpt}</div>
          </div>
        )}
      </div>
    </div>
  );
}
