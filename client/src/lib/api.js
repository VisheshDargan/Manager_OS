async function post(path, body) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const aiProjectSummary = (project) => post('/ai/project-summary', { project });
export const aiEmailBriefing = (emails, totalCount) => post('/ai/email-briefing', { emails, totalCount });
export const aiEmailThread = (thread) => post('/ai/email-thread', { thread });
export const aiMeetingNotes = (meeting) => post('/ai/meeting-notes', { meeting });
export const aiOneOnOnePrep = (member) => post('/ai/one-on-one-prep', { member });
export const aiFaq = (document, question, history) => post('/ai/faq', { document, question, history });
