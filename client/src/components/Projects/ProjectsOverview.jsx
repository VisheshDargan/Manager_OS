import { useState, useMemo } from 'react';
import { projects } from '../../lib/mockData.js';
import ProjectCard from './ProjectCard.jsx';
import MorningBanner from './MorningBanner.jsx';

const filters = ['All', 'On Track', 'At Risk', 'Overdue', 'Completed'];

export default function ProjectsOverview() {
  const [filter, setFilter] = useState('All');

  const metrics = useMemo(
    () => ({
      total: projects.length,
      onTrack: projects.filter((p) => p.status === 'On Track').length,
      atRisk: projects.filter((p) => p.status === 'At Risk').length,
      completed: projects.filter((p) => p.status === 'Completed').length,
    }),
    []
  );

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <MorningBanner />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Projects" value={metrics.total} />
        <MetricCard label="On Track" value={metrics.onTrack} color="text-ok" />
        <MetricCard label="At Risk" value={metrics.atRisk} color="text-risk" />
        <MetricCard label="Completed" value={metrics.completed} color="text-slate-500" />
      </div>
      <div className="flex gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f ? 'bg-accent text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value, color = 'text-slate-800' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}
