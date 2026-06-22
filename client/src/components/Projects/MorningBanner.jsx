import { useState } from 'react';

export default function MorningBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-gradient-to-r from-navy to-navy2 text-white rounded-xl px-5 py-4 mb-6 flex items-start justify-between gap-4">
      <p className="text-sm leading-relaxed">
        Good morning, Arjun. Here's your day: <strong>2 team members</strong> on leave,{' '}
        <strong>Project Aurora</strong> needs your attention, <strong>3 critical emails</strong> are waiting, and you have{' '}
        <strong>5 meetings</strong> today. Your first meeting is at <strong>9:00 AM</strong>.
      </p>
      <button onClick={() => setDismissed(true)} className="text-slate-300 hover:text-white text-sm shrink-0">
        ✕
      </button>
    </div>
  );
}
