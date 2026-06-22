export default function Spinner({ label = 'Generating with AI…' }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
      <span className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
