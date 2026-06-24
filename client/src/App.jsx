import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar.jsx';
import TopBar from './components/Layout/TopBar.jsx';
import ProjectsOverview from './components/Projects/ProjectsOverview.jsx';
import ProjectDetail from './components/Projects/ProjectDetail.jsx';
import EmailOverview from './components/Email/EmailOverview.jsx';
import MeetingsOverview from './components/Meetings/MeetingsOverview.jsx';
import MeetingDetail from './components/Meetings/MeetingDetail.jsx';
import TeamOverview from './components/Team/TeamOverview.jsx';
import TeamMemberDetail from './components/Team/TeamMemberDetail.jsx';
import FaqBot from './components/FAQ/FaqBot.jsx';

const titles = {
  '/': 'Projects Overview',
  '/email': 'Email Copilot',
  '/meetings': 'Meetings',
  '/team': 'My Team',
  '/faq': 'Smart FAQ Bot',
};

function pageTitle(pathname) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/projects/')) return 'Project Detail';
  if (pathname.startsWith('/meetings/')) return 'Meeting Detail';
  if (pathname.startsWith('/team/')) return 'Team Member';
  return 'ManagerOS';
}

export default function App() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={pageTitle(location.pathname)} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<ProjectsOverview />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/email" element={<EmailOverview />} />
            <Route path="/meetings" element={<MeetingsOverview />} />
            <Route path="/meetings/:id" element={<MeetingDetail />} />
            <Route path="/team" element={<TeamOverview />} />
            <Route path="/team/:id" element={<TeamMemberDetail />} />
            <Route path="/faq" element={<FaqBot />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
