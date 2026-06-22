import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../../lib/mockData.js';
import { aiProjectSummary } from '../../lib/api.js';
import StatusBadge from '../Layout/StatusBadge.jsx';
import Spinner from '../Layout/Spinner.jsx';

const barColor = { 'On Track': 'bg-ok', 'At Risk': 'bg-risk', Overdue: 'bg-overdue', Completed: 'bg-slate-400' };

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => String(p.id) === id);

  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!project) return;
    setLoading(true);
    setError(false);
    aiProjectSummary(project)
      .then((res) => setSummary(res.summary))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [project?.id]);

  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <button onClick={() => navigate('/')} className="text-sm text-accent mb-4 hover:underline">
        ← Back to Projects
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{project.name}</h2>
            <p className="text-sm text-slate-500">{project.client} · PM: {project.manager}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <span>Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>{project.openItems} open items</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor[project.status]}`} style={{ width: `${project.progress}%` }} />
        </div>
        <div className="text-xs text-slate-500 mt-1">{project.progress}% complete</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span className="text-accent">✦</span> AI Project Summary
        </h3>
        {loading && <Spinner label="Analyzing project health…" />}
        {error && <p className="text-sm text-overdue">Couldn't generate AI summary right now. Please try again later.</p>}
        {!loading && !error && <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-3">Tasks</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 pr-4">Task Name</th>
              <th className="py-2 pr-4">Owner</th>
              <th className="py-2 pr-4">Due Date</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Priority</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map((t, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-2.5 pr-4 font-medium text-slate-700">{t.task}</td>
                <td className="py-2.5 pr-4 text-slate-600">{t.owner}</td>
                <td className="py-2.5 pr-4 text-slate-500">{new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td className="py-2.5 pr-4"><StatusBadge status={t.status} /></td>
                <td className="py-2.5 pr-4 text-slate-600">{t.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Milestones</h3>
          <div className="space-y-3">
            {project.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    m.hit === true ? 'bg-ok' : m.hit === false ? 'bg-overdue' : 'bg-slate-300'
                  }`}
                />
                <span className="text-sm text-slate-700 flex-1">{m.name}</span>
                <span className="text-xs text-slate-400">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Attachments</h3>
          <div className="space-y-2">
            {project.attachments.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 text-sm text-slate-700">
                <span>{a.type === 'pdf' ? '📄' : '📝'}</span>
                {a.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
