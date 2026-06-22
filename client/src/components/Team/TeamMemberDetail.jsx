import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  teamMembers,
  workloadHistory,
  feedbackHistory,
  appraisals,
  memberTasks,
} from '../../lib/mockData.js';
import { aiOneOnOnePrep } from '../../lib/api.js';
import Avatar from '../Layout/Avatar.jsx';
import Spinner from '../Layout/Spinner.jsx';

const tabs = ['Overview', 'Feedback & Growth', 'AI 1:1 Prep'];

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = teamMembers.find((m) => String(m.id) === id);
  const [tab, setTab] = useState(tabs[0]);

  if (!member) return <div>Team member not found.</div>;

  return (
    <div>
      <button onClick={() => navigate('/team')} className="text-sm text-accent mb-4 hover:underline">
        ← Back to My Team
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 flex items-center gap-4">
        <Avatar name={member.name} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">{member.name}</h2>
          <p className="text-sm text-slate-500">{member.role}</p>
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

      {tab === 'Overview' && <OverviewTab member={member} />}
      {tab === 'Feedback & Growth' && <FeedbackTab member={member} />}
      {tab === 'AI 1:1 Prep' && <PrepTab member={member} />}
    </div>
  );
}

function OverviewTab({ member }) {
  const tasks = memberTasks[member.id] || [];
  const history = workloadHistory[member.id] || [];
  const max = Math.max(...history, 1);
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 mb-3">Current Tasks</h4>
        <div className="space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="flex justify-between text-sm px-3 py-2 bg-slate-50 rounded-lg">
              <span className="text-slate-700">{t.task}</span>
              <span className="text-slate-500">{t.status}</span>
            </div>
          ))}
        </div>
        <h4 className="font-semibold text-slate-800 mb-3 mt-6">Leave Calendar</h4>
        <p className="text-sm text-slate-600">
          {member.leave === 'On Leave'
            ? `On leave now — returning ${new Date(member.returningOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
            : 'No upcoming leave scheduled.'}
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 mb-4">Workload Trend (last 4 weeks)</h4>
        <div className="flex items-end gap-4 h-40">
          {history.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-accent rounded-t-md" style={{ height: `${(v / max) * 100}%` }} />
              <span className="text-xs text-slate-400">W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedbackTab({ member }) {
  const feedback = feedbackHistory[member.id] || [];
  const appraisal = appraisals[member.id];
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 mb-3">Feedback Timeline</h4>
        {feedback.length === 0 && <p className="text-sm text-slate-500">No feedback recorded yet.</p>}
        <div className="space-y-3">
          {feedback.map((f, i) => (
            <div key={i} className="border-l-2 border-accent pl-3">
              <div className="text-xs text-slate-400 mb-0.5">{new Date(f.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <p className="text-sm text-slate-700">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 mb-3">Appraisal & Growth</h4>
        {appraisal && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Last Appraisal Score</span><span className="font-semibold text-slate-800">{appraisal.score}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="text-slate-700">{new Date(appraisal.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Current Role</span><span className="text-slate-700">{appraisal.currentRole}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Target Role</span><span className="text-slate-700">{appraisal.targetRole}</span></div>
            <div>
              <span className="text-slate-500 block mb-1">Skills</span>
              <div className="flex flex-wrap gap-1">
                {appraisal.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PrepTab({ member }) {
  const [prep, setPrep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const generate = () => {
    setLoading(true);
    setError(false);
    aiOneOnOnePrep(member)
      .then(setPrep)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    generate();
  }, [member.id]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2"><span className="text-accent">✦</span> AI 1:1 Talking Points</h4>
        <button onClick={generate} disabled={loading} className="text-sm text-accent hover:underline disabled:opacity-50">
          ↻ Regenerate
        </button>
      </div>
      {loading && <Spinner label="Preparing talking points…" />}
      {error && <p className="text-sm text-overdue">Couldn't generate 1:1 prep right now.</p>}
      {!loading && !error && prep && (
        <div className="grid grid-cols-2 gap-6">
          <PrepBlock title="What's Gone Well" items={prep.wentWell} />
          <PrepBlock title="Needs Attention" items={prep.needsAttention} />
          <PrepBlock title="Suggested Questions" items={prep.questions} />
          <PrepBlock title="Development Opportunities" items={prep.developmentOpportunities} />
        </div>
      )}
    </div>
  );
}

function PrepBlock({ title, items }) {
  return (
    <div>
      <h5 className="text-sm font-semibold text-slate-700 mb-2">{title}</h5>
      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
        {items?.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}
