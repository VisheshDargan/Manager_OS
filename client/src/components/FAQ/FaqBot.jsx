import { useState, useRef, useEffect } from 'react';
import { aiFaq } from '../../lib/api.js';

const PLACEHOLDER = `Paste your document or FAQ content here…

Example: paste a client onboarding guide, product manual, HR policy, or any reference document. The bot will answer questions strictly based on what's in this text.`;

const SAMPLE_DOC = `Infosys Client Onboarding FAQ — HDFC Bank

Q: What is the onboarding timeline for new enterprise clients?
A: Standard onboarding takes 4–6 weeks from contract signing, covering environment setup, access provisioning, and a pilot run.

Q: What SLA is offered for critical production issues?
A: P1 issues are responded to within 1 hour and resolved within 4 hours, 24/7.

Q: Who is the primary point of contact during onboarding?
A: Each client is assigned a dedicated Delivery Head and a Project Coordinator. For HDFC Bank, the Delivery Head is Vishesh Dargan.

Q: What security certifications does Infosys hold?
A: Infosys is ISO 27001 certified and SOC 2 Type II compliant. All client data is encrypted at rest and in transit.

Q: Can we request custom reporting dashboards?
A: Yes. Custom dashboards are available as part of the Premium Support tier. Standard reports are included in all contracts.

Q: What is the escalation path for delayed deliverables?
A: Escalate to the Project Manager first. If unresolved within 24 hours, it is escalated to the Delivery Head. Critical escalations go to the Account Director.`;

export default function FaqBot() {
  const [doc, setDoc] = useState('');
  const [docLocked, setDocLocked] = useState(false);
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSend = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setQuestion('');
    setError('');
    setLoading(true);
    setDocLocked(true);
    try {
      const res = await aiFaq(doc, q, history);
      setHistory((h) => [...h, { question: q, answer: res.answer }]);
    } catch (e) {
      setError(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setHistory([]);
    setDocLocked(false);
    setQuestion('');
    setError('');
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Left — Document panel */}
      <div className="w-80 shrink-0 flex flex-col gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-800 text-sm">Document</h3>
            {docLocked && (
              <span className="text-xs bg-ok/10 text-ok px-2 py-0.5 rounded-full font-medium">Active</span>
            )}
          </div>
          <textarea
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            disabled={docLocked}
            placeholder={PLACEHOLDER}
            className="flex-1 text-sm text-slate-700 resize-none outline-none leading-relaxed placeholder:text-slate-400 disabled:opacity-60"
          />
        </div>
        <button
          onClick={() => setDoc(SAMPLE_DOC)}
          disabled={docLocked}
          className="text-xs text-accent hover:underline disabled:opacity-40 text-left px-1"
        >
          Load sample document →
        </button>
        {docLocked && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 hover:underline text-left px-1"
          >
            ✕ Clear and start over
          </button>
        )}
      </div>

      {/* Right — Chat panel */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <span className="text-accent text-base">✦</span>
          <h3 className="font-semibold text-slate-800">ManagerOS Copilot</h3>
          <span className="text-xs text-slate-400 ml-1">— chat freely, or paste a document to ask questions about it</span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
          {history.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-3 py-16">
              <span className="text-4xl">💬</span>
              <p className="text-sm max-w-xs">
                {doc.trim()
                  ? 'Document loaded. Ask anything — about the document or anything else.'
                  : 'Ask me anything. Optionally paste a document on the left to ask questions about it.'}
              </p>
            </div>
          )}

          {history.map((h, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-accent text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-sm">
                  {h.question}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-prose leading-relaxed whitespace-pre-wrap">
                  {h.answer}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                Thinking…
              </div>
            </div>
          )}

          {error && <p className="text-sm text-overdue text-center">{error}</p>}

          <div ref={bottomRef} />
        </div>

        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex gap-2 items-end">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              disabled={loading}
              rows={2}
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 resize-none disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!question.trim() || loading}
              className="bg-accent text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition shrink-0"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 px-1">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
