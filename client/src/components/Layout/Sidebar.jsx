import { NavLink } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { demoUser } from '../../lib/mockData.js';

const navItems = [
  { to: '/', label: 'Projects', icon: '📁' },
  { to: '/email', label: 'Email Copilot', icon: '✉️' },
  { to: '/meetings', label: 'Meetings', icon: '📅' },
  { to: '/team', label: 'My Team', icon: '👥' },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-navy text-slate-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 flex items-center gap-2 border-b border-white/10">
        <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center font-bold text-white">M</div>
        <span className="text-white font-bold text-lg tracking-tight">ManagerOS</span>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-accent text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10 flex items-center gap-3">
        <Avatar name={demoUser.name} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">{demoUser.name}</div>
          <div className="text-xs text-slate-400 truncate">{demoUser.role}</div>
        </div>
        <span className="text-slate-400 text-sm">⚙️</span>
      </div>
    </aside>
  );
}
