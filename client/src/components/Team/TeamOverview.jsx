import { useNavigate } from 'react-router-dom';
import { teamMembers } from '../../lib/mockData.js';
import Avatar from '../Layout/Avatar.jsx';

const workloadColor = { Low: 'bg-ok', Medium: 'bg-accent', High: 'bg-risk', Overloaded: 'bg-overdue' };
const workloadPct = { Low: 25, Medium: 50, High: 75, Overloaded: 100 };

export default function TeamOverview() {
  const navigate = useNavigate();
  const onLeave = teamMembers.filter((m) => m.leave === 'On Leave').length;
  const flagged = teamMembers.filter((m) => m.flagged).length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MetricCard label="Team Members" value={teamMembers.length} />
        <MetricCard label="On Leave Today" value={onLeave} color="text-risk" />
        <MetricCard label="Flagged by AI" value={flagged} color="text-overdue" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {teamMembers.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/team/${m.id}`)}
            className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-accent/50 hover:shadow-sm transition relative"
          >
            {m.flagged && <span className="absolute top-4 right-4 text-overdue text-sm">🚩</span>}
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={m.name} size="lg" />
              <div>
                <div className="font-semibold text-slate-800">{m.name}</div>
                <div className="text-xs text-slate-500">{m.role}</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Workload</span>
                <span className="font-medium text-slate-700">{m.workload}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${workloadColor[m.workload]}`} style={{ width: `${workloadPct[m.workload]}%` }} />
              </div>
            </div>
            <div className="text-xs text-slate-500 space-y-1 mt-3">
              <div>
                {m.leave === 'On Leave' ? (
                  <span className="text-risk font-medium">On Leave · returns {new Date(m.returningOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                ) : (
                  <span className="text-ok font-medium">Available</span>
                )}
              </div>
              <div>Last 1:1: {new Date(m.lastOneOnOne).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div>Training: {m.training}% complete</div>
            </div>
          </div>
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
