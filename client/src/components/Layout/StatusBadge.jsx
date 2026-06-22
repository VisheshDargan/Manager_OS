const classMap = {
  'On Track': 'status-on-track',
  'At Risk': 'status-at-risk',
  Overdue: 'status-overdue',
  Completed: 'status-completed',
  Upcoming: 'status-on-track',
  'In Progress': 'status-at-risk',
  Delayed: 'status-overdue',
  Pending: 'status-completed',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${classMap[status] || 'status-completed'}`}>
      {status}
    </span>
  );
}
