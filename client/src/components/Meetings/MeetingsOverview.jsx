import { useNavigate } from 'react-router-dom';
import { meetings } from '../../lib/mockData.js';
import StatusBadge from '../Layout/StatusBadge.jsx';
import Avatar from '../Layout/Avatar.jsx';
import MiniCalendar from './MiniCalendar.jsx';

const platformIcon = { 'Google Meet': '🟢 Google Meet', Teams: '🟣 Teams', Zoom: '🔵 Zoom', 'In Person': '🏢 In Person' };

export default function MeetingsOverview() {
  const navigate = useNavigate();
  return (
    <div>
      <MiniCalendar />
      <h3 className="font-semibold text-slate-800 mb-3">Today's Meetings</h3>
      <div className="space-y-3">
        {meetings.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/meetings/${m.id}`)}
            className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-accent/50 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-center w-16">
                <div className="text-sm font-semibold text-slate-800">{m.time}</div>
                <div className="text-xs text-slate-400">{m.duration} min</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="font-medium text-slate-800">{m.title}</div>
                <div className="text-xs text-slate-500">{platformIcon[m.platform]}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {m.attendees.slice(0, 4).map((a, i) => (
                  <Avatar key={i} name={a} size="sm" />
                ))}
                {m.attendees.length > 4 && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center">
                    +{m.attendees.length - 4}
                  </div>
                )}
              </div>
              <StatusBadge status={m.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
