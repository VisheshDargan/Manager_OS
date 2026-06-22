import Avatar from './Avatar.jsx';
import { demoUser } from '../../lib/mockData.js';

const today = new Date('2026-06-22');
const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export default function TopBar({ title }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>
        <p className="text-xs text-slate-500">{dateStr}</p>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search projects, emails, people…"
            className="w-full bg-slate-100 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
          <span className="absolute left-3 top-2 text-slate-400 text-sm">🔍</span>
        </div>
        <button className="relative text-slate-500 hover:text-slate-800">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 bg-overdue text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">4</span>
        </button>
        <Avatar name={demoUser.name} />
      </div>
    </header>
  );
}
