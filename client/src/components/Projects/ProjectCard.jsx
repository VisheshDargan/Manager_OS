import { useNavigate } from 'react-router-dom';
import StatusBadge from '../Layout/StatusBadge.jsx';

const barColor = {
  'On Track': 'bg-ok',
  'At Risk': 'bg-risk',
  Overdue: 'bg-overdue',
  Completed: 'bg-slate-400',
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-accent/50 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-slate-800">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="text-sm text-slate-500 mb-4">{project.client}</p>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span className="font-medium text-slate-700">{project.progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor[project.status]}`} style={{ width: `${project.progress}%` }} />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>PM: {project.manager}</span>
        <span>{project.openItems} open items</span>
      </div>
      <div className="text-xs text-slate-400 mt-1">Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
    </div>
  );
}
