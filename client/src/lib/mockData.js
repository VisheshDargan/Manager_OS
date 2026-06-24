export const demoUser = {
  name: 'Vishesh Dargan',
  role: 'Delivery Head, Enterprise Accounts',
  company: 'Infosys',
  teamSize: 12,
  activeProjects: 6,
  initials: 'VD',
};

export const teamMembers = [
  { id: 1, name: 'Priya Sharma', role: 'Senior Developer', workload: 'High', leave: 'Available', lastOneOnOne: '2026-06-01', training: 90, flagged: false },
  { id: 2, name: 'Rahul Verma', role: 'Developer', workload: 'Overloaded', leave: 'Available', lastOneOnOne: '2026-05-20', training: 60, flagged: true, flagReason: 'Overloaded with tasks' },
  { id: 3, name: 'Anita Nair', role: 'QA Lead', workload: 'Medium', leave: 'On Leave', returningOn: '2026-06-18', lastOneOnOne: '2026-05-28', training: 100, flagged: false },
  { id: 4, name: 'Karan Singh', role: 'Business Analyst', workload: 'Low', leave: 'Available', lastOneOnOne: '2026-06-10', training: 100, flagged: false },
  { id: 5, name: 'Deepa Menon', role: 'Developer', workload: 'High', leave: 'Available', lastOneOnOne: '2026-05-15', training: 75, flagged: true, flagReason: 'No recent feedback' },
  { id: 6, name: 'Aryan Kapoor', role: 'Scrum Master', workload: 'Medium', leave: 'Available', lastOneOnOne: '2026-06-07', training: 95, flagged: false },
  { id: 7, name: 'Sneha Patel', role: 'Developer', workload: 'Medium', leave: 'Available', lastOneOnOne: '2026-06-05', training: 88, flagged: false },
  { id: 8, name: 'Vikram Iyer', role: 'Solution Architect', workload: 'High', leave: 'Available', lastOneOnOne: '2026-06-03', training: 92, flagged: false },
  { id: 9, name: 'Meera Joshi', role: 'Project Coordinator', workload: 'Low', leave: 'On Leave', returningOn: '2026-06-16', lastOneOnOne: '2026-05-30', training: 100, flagged: false },
  { id: 10, name: 'Rohit Das', role: 'Developer', workload: 'Overloaded', leave: 'Available', lastOneOnOne: '2026-05-10', training: 55, flagged: true, flagReason: 'Overloaded, training overdue' },
  { id: 11, name: 'Tanvi Reddy', role: 'UX Designer', workload: 'Medium', leave: 'Available', lastOneOnOne: '2026-06-08', training: 100, flagged: false },
  { id: 12, name: 'Siddharth Kumar', role: 'Tech Lead', workload: 'High', leave: 'Available', lastOneOnOne: '2026-06-02', training: 90, flagged: false },
];

export const workloadHistory = {
  1: [6, 7, 8, 9],
  2: [8, 9, 10, 11],
  3: [4, 5, 5, 6],
  4: [3, 3, 4, 3],
  5: [7, 8, 8, 9],
  6: [5, 5, 6, 6],
  7: [5, 6, 6, 5],
  8: [7, 8, 9, 8],
  9: [3, 3, 4, 4],
  10: [9, 10, 11, 11],
  11: [5, 6, 6, 5],
  12: [7, 7, 8, 8],
};

export const feedbackHistory = {
  1: [
    { date: '2026-05-01', text: 'Excellent work leading the API integration sprint. Strong ownership.' },
    { date: '2026-04-01', text: 'Communication with stakeholders has improved significantly.' },
    { date: '2026-03-01', text: 'Encouraged to mentor junior developers more actively.' },
  ],
  2: [
    { date: '2026-04-15', text: 'Delivery has slipped on two consecutive sprints. Discussed workload.' },
    { date: '2026-03-10', text: 'Strong technical skills but needs better time estimation.' },
  ],
  5: [
    { date: '2026-02-20', text: 'Solid contributor, but feedback cadence has lapsed since.' },
  ],
};

export const appraisals = {
  1: { score: '4.5/5', date: '2026-01-15', currentRole: 'Senior Developer', targetRole: 'Tech Lead', skills: ['React', 'Node.js', 'System Design', 'Mentoring'] },
  2: { score: '3.2/5', date: '2026-01-15', currentRole: 'Developer', targetRole: 'Senior Developer', skills: ['Java', 'Spring Boot', 'SQL'] },
  3: { score: '4.0/5', date: '2026-01-15', currentRole: 'QA Lead', targetRole: 'QA Manager', skills: ['Test Automation', 'Selenium', 'Team Leadership'] },
  4: { score: '3.8/5', date: '2026-01-15', currentRole: 'Business Analyst', targetRole: 'Senior BA', skills: ['Requirements Gathering', 'SQL', 'Stakeholder Mgmt'] },
  5: { score: '3.5/5', date: '2026-01-15', currentRole: 'Developer', targetRole: 'Senior Developer', skills: ['Python', 'Django', 'AWS'] },
  6: { score: '4.2/5', date: '2026-01-15', currentRole: 'Scrum Master', targetRole: 'Agile Coach', skills: ['Scrum', 'Facilitation', 'JIRA'] },
  7: { score: '3.9/5', date: '2026-01-15', currentRole: 'Developer', targetRole: 'Senior Developer', skills: ['React Native', 'TypeScript'] },
  8: { score: '4.6/5', date: '2026-01-15', currentRole: 'Solution Architect', targetRole: 'Principal Architect', skills: ['System Design', 'Cloud', 'Microservices'] },
  9: { score: '3.7/5', date: '2026-01-15', currentRole: 'Project Coordinator', targetRole: 'Project Manager', skills: ['Scheduling', 'Risk Mgmt'] },
  10: { score: '2.9/5', date: '2026-01-15', currentRole: 'Developer', targetRole: 'Senior Developer', skills: ['Angular', 'Node.js'] },
  11: { score: '4.1/5', date: '2026-01-15', currentRole: 'UX Designer', targetRole: 'Senior UX Designer', skills: ['Figma', 'User Research'] },
  12: { score: '4.4/5', date: '2026-01-15', currentRole: 'Tech Lead', targetRole: 'Engineering Manager', skills: ['Architecture', 'Leadership', 'Java'] },
};

export const memberTasks = {
  1: [
    { task: 'API Integration - Phase 2', status: 'In Progress' },
    { task: 'Code review for Aurora module', status: 'Pending' },
  ],
  2: [
    { task: 'Database migration script', status: 'Delayed' },
    { task: 'Unit tests for payment module', status: 'In Progress' },
  ],
  3: [{ task: 'Regression test suite - Nexus', status: 'In Progress' }],
  4: [{ task: 'Requirements doc - Delta phase 3', status: 'Completed' }],
  5: [
    { task: 'Frontend refactor - Horizon', status: 'In Progress' },
    { task: 'Bug fixes - reporting module', status: 'Delayed' },
  ],
  6: [{ task: 'Sprint planning - Q3', status: 'Completed' }],
  7: [{ task: 'Mobile app feature - Titan', status: 'In Progress' }],
  8: [{ task: 'Architecture review - Aurora', status: 'In Progress' }],
  9: [{ task: 'Vendor coordination - Spark closeout', status: 'Completed' }],
  10: [
    { task: 'Legacy system migration', status: 'Delayed' },
    { task: 'API documentation', status: 'Pending' },
  ],
  11: [{ task: 'UI redesign - Email Copilot', status: 'In Progress' }],
  12: [{ task: 'Tech debt cleanup - Horizon', status: 'In Progress' }],
};

export const projects = [
  {
    id: 1,
    name: 'Project Titan',
    client: 'HDFC Bank',
    progress: 72,
    status: 'On Track',
    manager: 'Priya Sharma',
    dueDate: '2026-07-30',
    openItems: 5,
    tasks: [
      { task: 'API Gateway Setup', owner: 'Priya Sharma', dueDate: '2026-06-10', status: 'Completed', priority: 'High' },
      { task: 'Core Banking Integration', owner: 'Sneha Patel', dueDate: '2026-06-25', status: 'In Progress', priority: 'High' },
      { task: 'Security Audit', owner: 'Vikram Iyer', dueDate: '2026-07-01', status: 'In Progress', priority: 'High' },
      { task: 'UAT Environment Setup', owner: 'Siddharth Kumar', dueDate: '2026-07-05', status: 'Pending', priority: 'Medium' },
      { task: 'Performance Testing', owner: 'Anita Nair', dueDate: '2026-07-12', status: 'Pending', priority: 'Medium' },
      { task: 'Documentation Handover', owner: 'Karan Singh', dueDate: '2026-07-20', status: 'Pending', priority: 'Low' },
      { task: 'Go-Live Checklist', owner: 'Priya Sharma', dueDate: '2026-07-28', status: 'Pending', priority: 'High' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-04-01', hit: true },
      { name: 'Design Sign-off', date: '2026-05-01', hit: true },
      { name: 'Core Integration Complete', date: '2026-06-25', hit: null },
      { name: 'UAT', date: '2026-07-12', hit: null },
      { name: 'Go-Live', date: '2026-07-30', hit: null },
    ],
    attachments: [
      { name: 'Titan_SOW_v2.pdf', type: 'pdf' },
      { name: 'Architecture_Diagram.docx', type: 'doc' },
      { name: 'Security_Audit_Report.pdf', type: 'pdf' },
    ],
  },
  {
    id: 2,
    name: 'Project Aurora',
    client: 'Tata Motors',
    progress: 45,
    status: 'At Risk',
    manager: 'Vikram Iyer',
    dueDate: '2026-06-28',
    openItems: 8,
    tasks: [
      { task: 'API Integration', owner: 'Rahul Verma', dueDate: '2026-06-15', status: 'Delayed', priority: 'High' },
      { task: 'Inventory Module', owner: 'Rohit Das', dueDate: '2026-06-18', status: 'Delayed', priority: 'High' },
      { task: 'Dealer Portal UI', owner: 'Tanvi Reddy', dueDate: '2026-06-20', status: 'In Progress', priority: 'Medium' },
      { task: 'Data Migration', owner: 'Deepa Menon', dueDate: '2026-06-22', status: 'Delayed', priority: 'High' },
      { task: 'Load Testing', owner: 'Vikram Iyer', dueDate: '2026-06-24', status: 'Pending', priority: 'Medium' },
      { task: 'Client Sign-off Demo', owner: 'Aryan Kapoor', dueDate: '2026-06-26', status: 'Pending', priority: 'High' },
      { task: 'Production Deployment', owner: 'Siddharth Kumar', dueDate: '2026-06-27', status: 'Pending', priority: 'High' },
      { task: 'Post-launch Support Plan', owner: 'Karan Singh', dueDate: '2026-06-28', status: 'Pending', priority: 'Low' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-03-15', hit: true },
      { name: 'Design Sign-off', date: '2026-04-20', hit: true },
      { name: 'API Integration Complete', date: '2026-06-15', hit: false },
      { name: 'UAT', date: '2026-06-24', hit: null },
      { name: 'Go-Live', date: '2026-06-28', hit: null },
    ],
    attachments: [
      { name: 'Aurora_Escalation_Notes.docx', type: 'doc' },
      { name: 'Risk_Register.pdf', type: 'pdf' },
    ],
  },
  {
    id: 3,
    name: 'Project Nexus',
    client: 'Reliance Retail',
    progress: 90,
    status: 'On Track',
    manager: 'Siddharth Kumar',
    dueDate: '2026-06-20',
    openItems: 2,
    tasks: [
      { task: 'POS Integration', owner: 'Sneha Patel', dueDate: '2026-05-20', status: 'Completed', priority: 'High' },
      { task: 'Inventory Sync', owner: 'Karan Singh', dueDate: '2026-05-30', status: 'Completed', priority: 'High' },
      { task: 'Regression Testing', owner: 'Anita Nair', dueDate: '2026-06-10', status: 'Completed', priority: 'Medium' },
      { task: 'Store Rollout - Phase 1', owner: 'Aryan Kapoor', dueDate: '2026-06-15', status: 'In Progress', priority: 'High' },
      { task: 'Store Rollout - Phase 2', owner: 'Aryan Kapoor', dueDate: '2026-06-18', status: 'In Progress', priority: 'High' },
      { task: 'Final Sign-off', owner: 'Siddharth Kumar', dueDate: '2026-06-20', status: 'Pending', priority: 'High' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-03-01', hit: true },
      { name: 'Pilot Store Launch', date: '2026-05-01', hit: true },
      { name: 'Full Rollout', date: '2026-06-18', hit: null },
      { name: 'Go-Live', date: '2026-06-20', hit: null },
    ],
    attachments: [
      { name: 'Nexus_Rollout_Plan.pdf', type: 'pdf' },
      { name: 'Store_List.docx', type: 'doc' },
    ],
  },
  {
    id: 4,
    name: 'Project Horizon',
    client: 'Wipro Internal',
    progress: 30,
    status: 'Overdue',
    manager: 'Deepa Menon',
    dueDate: '2026-06-05',
    openItems: 11,
    tasks: [
      { task: 'Requirements Finalization', owner: 'Karan Singh', dueDate: '2026-04-15', status: 'Completed', priority: 'Medium' },
      { task: 'Frontend Refactor', owner: 'Deepa Menon', dueDate: '2026-05-15', status: 'Delayed', priority: 'High' },
      { task: 'Backend API Revamp', owner: 'Rohit Das', dueDate: '2026-05-20', status: 'Delayed', priority: 'High' },
      { task: 'Reporting Module', owner: 'Deepa Menon', dueDate: '2026-05-25', status: 'Delayed', priority: 'Medium' },
      { task: 'Tech Debt Cleanup', owner: 'Siddharth Kumar', dueDate: '2026-05-30', status: 'In Progress', priority: 'Low' },
      { task: 'Internal UAT', owner: 'Anita Nair', dueDate: '2026-06-02', status: 'Pending', priority: 'High' },
      { task: 'Final Release', owner: 'Vikram Iyer', dueDate: '2026-06-05', status: 'Pending', priority: 'High' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-03-01', hit: true },
      { name: 'Requirements Sign-off', date: '2026-04-15', hit: true },
      { name: 'Backend Complete', date: '2026-05-20', hit: false },
      { name: 'Release', date: '2026-06-05', hit: false },
    ],
    attachments: [{ name: 'Horizon_Status_Report.pdf', type: 'pdf' }],
  },
  {
    id: 5,
    name: 'Project Spark',
    client: 'ICICI Bank',
    progress: 100,
    status: 'Completed',
    manager: 'Karan Singh',
    dueDate: '2026-05-31',
    openItems: 0,
    tasks: [
      { task: 'Discovery & Scoping', owner: 'Karan Singh', dueDate: '2026-03-01', status: 'Completed', priority: 'Medium' },
      { task: 'Development', owner: 'Sneha Patel', dueDate: '2026-04-15', status: 'Completed', priority: 'High' },
      { task: 'UAT', owner: 'Anita Nair', dueDate: '2026-05-10', status: 'Completed', priority: 'High' },
      { task: 'Go-Live', owner: 'Karan Singh', dueDate: '2026-05-25', status: 'Completed', priority: 'High' },
      { task: 'Post-Launch Support', owner: 'Tanvi Reddy', dueDate: '2026-05-31', status: 'Completed', priority: 'Low' },
      { task: 'Client Closure Sign-off', owner: 'Karan Singh', dueDate: '2026-05-31', status: 'Completed', priority: 'Medium' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-03-01', hit: true },
      { name: 'Development Complete', date: '2026-04-15', hit: true },
      { name: 'UAT Sign-off', date: '2026-05-10', hit: true },
      { name: 'Go-Live', date: '2026-05-25', hit: true },
    ],
    attachments: [
      { name: 'Spark_Closure_Report.pdf', type: 'pdf' },
      { name: 'NPS_Feedback_Summary.docx', type: 'doc' },
    ],
  },
  {
    id: 6,
    name: 'Project Delta',
    client: 'Bajaj Finance',
    progress: 60,
    status: 'At Risk',
    manager: 'Aryan Kapoor',
    dueDate: '2026-07-15',
    openItems: 6,
    tasks: [
      { task: 'Loan Module Integration', owner: 'Rahul Verma', dueDate: '2026-06-20', status: 'In Progress', priority: 'High' },
      { task: 'Credit Score API', owner: 'Vikram Iyer', dueDate: '2026-06-25', status: 'Delayed', priority: 'High' },
      { task: 'Customer Portal UI', owner: 'Tanvi Reddy', dueDate: '2026-06-30', status: 'In Progress', priority: 'Medium' },
      { task: 'Compliance Review', owner: 'Karan Singh', dueDate: '2026-07-05', status: 'Pending', priority: 'High' },
      { task: 'Performance Testing', owner: 'Anita Nair', dueDate: '2026-07-10', status: 'Pending', priority: 'Medium' },
      { task: 'Final Release', owner: 'Aryan Kapoor', dueDate: '2026-07-15', status: 'Pending', priority: 'High' },
    ],
    milestones: [
      { name: 'Kickoff', date: '2026-04-10', hit: true },
      { name: 'Design Sign-off', date: '2026-05-10', hit: true },
      { name: 'Credit Score API Complete', date: '2026-06-25', hit: false },
      { name: 'Release', date: '2026-07-15', hit: null },
    ],
    attachments: [
      { name: 'Delta_Risk_Assessment.pdf', type: 'pdf' },
      { name: 'Compliance_Checklist.docx', type: 'doc' },
    ],
  },
];

export const emails = {
  critical: [
    {
      id: 1,
      sender: 'Rajeev Kulkarni',
      company: 'HDFC Bank',
      subject: 'Escalation: API Integration Delay on Project Titan',
      time: '8:15 AM',
      summary: 'Client PM is escalating the API integration delay — needs a revised timeline by EOD.',
      thread: [
        { from: 'Rajeev Kulkarni', time: '8:15 AM', body: "Arjun, we've noticed the Core Banking API integration is two weeks behind schedule. This is impacting our downstream testing plans. Can you share a revised timeline and root cause by end of day?" },
      ],
    },
    {
      id: 2,
      sender: 'Legal Team',
      company: 'Infosys Legal',
      subject: 'Contract Approval Pending — Bajaj Finance MSA',
      time: '9:02 AM',
      summary: 'Legal needs your sign-off on the amended MSA clause before it can be sent to the client.',
      thread: [
        { from: 'Legal Team', time: '9:02 AM', body: 'The amended liability clause for the Bajaj Finance MSA is ready for your review and approval. Please respond by tomorrow so we can send it to the client.' },
      ],
    },
    {
      id: 3,
      sender: 'Vendor Finance Desk',
      company: 'Infosys Procurement',
      subject: 'Vendor Invoice Approval Required — INV-22841',
      time: '9:40 AM',
      summary: 'An overdue vendor invoice needs your approval to avoid late payment penalties.',
      thread: [
        { from: 'Vendor Finance Desk', time: '9:40 AM', body: 'Invoice INV-22841 from CloudOps Infra Pvt Ltd ($14,200) is pending your approval. It is now 3 days overdue and may incur a late fee if not approved today.' },
      ],
    },
  ],
  important: [
    {
      id: 4,
      sender: 'Deepa Menon',
      company: 'Internal',
      subject: 'Weekly Status Update — Project Horizon',
      time: '8:30 AM',
      summary: 'Weekly status shows 3 delayed tasks on Horizon; flags need for additional QA support.',
      thread: [
        { from: 'Deepa Menon', time: '8:30 AM', body: "Hi Arjun, sharing this week's status for Horizon. We're behind on the backend revamp and reporting module — both delayed by about a week. Could use an extra QA resource to help with internal UAT prep." },
      ],
    },
    {
      id: 5,
      sender: 'Neha Kapoor',
      company: 'Tata Motors',
      subject: 'Reschedule Request: Aurora Sync',
      time: '10:05 AM',
      summary: 'Client wants to move tomorrow\'s sync call from 11 AM to 3 PM.',
      thread: [
        { from: 'Neha Kapoor', time: '10:05 AM', body: 'Hi Arjun, can we move tomorrow\'s Aurora sync from 11 AM to 3 PM? A scheduling conflict came up on our end.' },
      ],
    },
    {
      id: 6,
      sender: 'Aryan Kapoor',
      company: 'Internal',
      subject: 'Sprint Review Invite — Sprint 24',
      time: '10:30 AM',
      summary: 'Invite to review Sprint 24 deliverables this Thursday at 2 PM.',
      thread: [
        { from: 'Aryan Kapoor', time: '10:30 AM', body: "You're invited to the Sprint 24 review this Thursday at 2 PM. We'll be walking through completed stories across Titan and Nexus." },
      ],
    },
    {
      id: 7,
      sender: 'Client Success Team',
      company: 'Infosys',
      subject: 'NPS Feedback Received — Project Spark',
      time: '11:15 AM',
      summary: 'ICICI Bank gave Project Spark an NPS score of 9/10 with positive comments.',
      thread: [
        { from: 'Client Success Team', time: '11:15 AM', body: 'Great news — ICICI Bank rated Project Spark 9/10 on NPS, citing strong delivery quality and communication. Full feedback attached.' },
      ],
    },
    {
      id: 8,
      sender: 'Sandeep Rao',
      company: 'Infosys Leadership',
      subject: 'Great work on the Spark closure',
      time: '11:40 AM',
      summary: 'Senior leadership sent appreciation for the successful Project Spark delivery.',
      thread: [
        { from: 'Sandeep Rao', time: '11:40 AM', body: 'Arjun, wanted to personally congratulate you and the team on closing Project Spark ahead of schedule with stellar client feedback. Well done.' },
      ],
    },
  ],
  routine: [
    { id: 9, sender: 'LinkedIn', subject: 'You have 5 new notifications' },
    { id: 10, sender: 'IT Security Office', subject: 'Reminder: Complete Annual Security Training by June 30' },
    { id: 11, sender: 'Facilities Team', subject: 'Office Wi-Fi maintenance scheduled this weekend' },
    { id: 12, sender: 'HR Updates', subject: 'New wellness benefits rolled out for FY26-27' },
    { id: 13, sender: 'GitHub', subject: 'Weekly digest for your repositories' },
  ],
};

export const totalEmailCount = 87;

export const meetings = [
  {
    id: 1,
    title: 'HDFC Bank Weekly Sync',
    time: '9:00 AM',
    duration: 60,
    platform: 'Google Meet',
    status: 'Completed',
    attendees: ['Arjun Mehta', 'Priya Sharma', 'Rajeev Kulkarni', 'Sneha Patel', 'Vikram Iyer'],
    attendeeRoles: { 'Arjun Mehta': 'Delivery Head', 'Priya Sharma': 'Senior Developer', 'Rajeev Kulkarni': 'Client PM, HDFC Bank', 'Sneha Patel': 'Developer', 'Vikram Iyer': 'Solution Architect' },
    context: 'Weekly sync covering Project Titan status, API integration progress, and upcoming security audit timeline.',
    attachments: [
      { name: 'Titan_Weekly_Deck.pptx', type: 'ppt', size: '2.4 MB' },
      { name: 'Status_Notes.docx', type: 'doc', size: '180 KB' },
    ],
  },
  {
    id: 2,
    title: 'Project Aurora Escalation Call',
    time: '11:00 AM',
    duration: 30,
    platform: 'Teams',
    status: 'Completed',
    attendees: ['Arjun Mehta', 'Vikram Iyer', 'Neha Kapoor', 'Rahul Verma'],
    attendeeRoles: { 'Arjun Mehta': 'Delivery Head', 'Vikram Iyer': 'Solution Architect', 'Neha Kapoor': 'Client Lead, Tata Motors', 'Rahul Verma': 'Developer' },
    context: 'Escalation call to address delayed API integration and inventory module on Project Aurora; client requesting revised plan.',
    attachments: [{ name: 'Aurora_Recovery_Plan.pdf', type: 'pdf', size: '540 KB' }],
  },
  {
    id: 3,
    title: 'Team Standup',
    time: '12:00 PM',
    duration: 15,
    platform: 'Google Meet',
    status: 'Completed',
    attendees: ['Arjun Mehta', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel', 'Deepa Menon', 'Vikram Iyer'],
    attendeeRoles: {},
    context: 'Daily standup across active projects — quick blockers and priorities check-in.',
    attachments: [],
  },
  {
    id: 4,
    title: '1:1 with Priya Sharma',
    time: '3:00 PM',
    duration: 30,
    platform: 'In Person',
    status: 'Upcoming',
    attendees: ['Arjun Mehta', 'Priya Sharma'],
    attendeeRoles: { 'Arjun Mehta': 'Delivery Head', 'Priya Sharma': 'Senior Developer' },
    context: 'Regular 1:1 check-in covering workload, career growth, and Project Titan ownership.',
    attachments: [],
  },
  {
    id: 5,
    title: 'Quarterly Business Review Prep',
    time: '5:00 PM',
    duration: 60,
    platform: 'Zoom',
    status: 'Upcoming',
    attendees: ['Arjun Mehta', 'Siddharth Kumar', 'Vikram Iyer', 'Karan Singh'],
    attendeeRoles: { 'Arjun Mehta': 'Delivery Head', 'Siddharth Kumar': 'Tech Lead', 'Vikram Iyer': 'Solution Architect', 'Karan Singh': 'Business Analyst' },
    context: 'Internal prep session to align on QBR deck covering all 6 active projects ahead of client presentation.',
    attachments: [{ name: 'QBR_Draft_Deck.pptx', type: 'ppt', size: '3.1 MB' }],
  },
];

export const transcriptExcerpt = `Rajeev Kulkarni: Thanks for joining, everyone. Let's start with the API integration status — where do we stand against the original timeline?

Priya Sharma: We've completed the core authentication layer, but the transaction reconciliation endpoints are taking longer than expected due to some legacy data mapping issues on our end.

Rajeev Kulkarni: That's the second time we've heard about mapping issues. What's the concrete plan to close this out, and can we get a firm date?

Vikram Iyer: We've pulled in an additional engineer this week. Realistically, we're looking at completion by June 25th, with a buffer for testing before the July 1st security audit milestone.

Arjun Mehta: I'll personally track this daily until it's closed. Rajeev, I'd also like to propose a short daily check-in for the next two weeks so there are no surprises on either side.

Rajeev Kulkarni: That works for us. Let's lock in 9:30 AM daily starting tomorrow.`;
