const meetingDays = new Set([3, 5, 8, 10, 14, 14, 17, 22, 24, 26]);
const today = 22;

export default function MiniCalendar() {
  const daysInMonth = 30;
  const startWeekday = 1; // June 1, 2026 is a Monday
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
      <h3 className="font-semibold text-slate-800 mb-3">June 2026</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`relative h-9 flex items-center justify-center text-sm rounded-lg ${
              d === today ? 'bg-accent text-white font-semibold' : d ? 'text-slate-700 hover:bg-slate-50' : ''
            }`}
          >
            {d}
            {d && meetingDays.has(d) && d !== today && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
