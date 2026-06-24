const demoUser = {
  name: 'Vishesh Dargan',
  role: 'Delivery Head, Enterprise Accounts',
  company: 'Infosys',
  teamSize: 12,
  activeProjects: 6,
};

const teamMembers = [
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

const projects = [
  {
    id: 1, name: 'Project Titan', client: 'HDFC Bank', progress: 72, status: 'On Track',
    manager: 'Priya Sharma', dueDate: '2026-07-30', openItems: 5,
    tasks: [
      { task: 'API Gateway Setup', owner: 'Priya Sharma', dueDate: '2026-06-10', status: 'Completed', priority: 'High' },
      { task: 'Core Banking Integration', owner: 'Sneha Patel', dueDate: '2026-06-25', status: 'In Progress', priority: 'High' },
      { task: 'Security Audit', owner: 'Vikram Iyer', dueDate: '2026-07-01', status: 'In Progress', priority: 'High' },
      { task: 'UAT Environment Setup', owner: 'Siddharth Kumar', dueDate: '2026-07-05', status: 'Pending', priority: 'Medium' },
      { task: 'Performance Testing', owner: 'Anita Nair', dueDate: '2026-07-12', status: 'Pending', priority: 'Medium' },
      { task: 'Go-Live Checklist', owner: 'Priya Sharma', dueDate: '2026-07-28', status: 'Pending', priority: 'High' },
    ],
  },
  {
    id: 2, name: 'Project Aurora', client: 'Tata Motors', progress: 45, status: 'At Risk',
    manager: 'Vikram Iyer', dueDate: '2026-06-28', openItems: 8,
    tasks: [
      { task: 'API Integration', owner: 'Rahul Verma', dueDate: '2026-06-15', status: 'Delayed', priority: 'High' },
      { task: 'Inventory Module', owner: 'Rohit Das', dueDate: '2026-06-18', status: 'Delayed', priority: 'High' },
      { task: 'Dealer Portal UI', owner: 'Tanvi Reddy', dueDate: '2026-06-20', status: 'In Progress', priority: 'Medium' },
      { task: 'Data Migration', owner: 'Deepa Menon', dueDate: '2026-06-22', status: 'Delayed', priority: 'High' },
      { task: 'Client Sign-off Demo', owner: 'Aryan Kapoor', dueDate: '2026-06-26', status: 'Pending', priority: 'High' },
      { task: 'Production Deployment', owner: 'Siddharth Kumar', dueDate: '2026-06-27', status: 'Pending', priority: 'High' },
    ],
  },
  {
    id: 3, name: 'Project Nexus', client: 'Reliance Retail', progress: 90, status: 'On Track',
    manager: 'Siddharth Kumar', dueDate: '2026-06-20', openItems: 2,
    tasks: [
      { task: 'Store Rollout - Phase 1', owner: 'Aryan Kapoor', dueDate: '2026-06-15', status: 'In Progress', priority: 'High' },
      { task: 'Store Rollout - Phase 2', owner: 'Aryan Kapoor', dueDate: '2026-06-18', status: 'In Progress', priority: 'High' },
      { task: 'Final Sign-off', owner: 'Siddharth Kumar', dueDate: '2026-06-20', status: 'Pending', priority: 'High' },
    ],
  },
  {
    id: 4, name: 'Project Horizon', client: 'Wipro Internal', progress: 30, status: 'Overdue',
    manager: 'Deepa Menon', dueDate: '2026-06-05', openItems: 11,
    tasks: [
      { task: 'Frontend Refactor', owner: 'Deepa Menon', dueDate: '2026-05-15', status: 'Delayed', priority: 'High' },
      { task: 'Backend API Revamp', owner: 'Rohit Das', dueDate: '2026-05-20', status: 'Delayed', priority: 'High' },
      { task: 'Tech Debt Cleanup', owner: 'Siddharth Kumar', dueDate: '2026-05-30', status: 'In Progress', priority: 'Low' },
      { task: 'Internal UAT', owner: 'Anita Nair', dueDate: '2026-06-02', status: 'Pending', priority: 'High' },
    ],
  },
  {
    id: 5, name: 'Project Spark', client: 'ICICI Bank', progress: 100, status: 'Completed',
    manager: 'Karan Singh', dueDate: '2026-05-31', openItems: 0,
    tasks: [
      { task: 'Go-Live', owner: 'Karan Singh', dueDate: '2026-05-25', status: 'Completed', priority: 'High' },
      { task: 'Client Closure Sign-off', owner: 'Karan Singh', dueDate: '2026-05-31', status: 'Completed', priority: 'Medium' },
    ],
  },
  {
    id: 6, name: 'Project Delta', client: 'Bajaj Finance', progress: 60, status: 'At Risk',
    manager: 'Aryan Kapoor', dueDate: '2026-07-15', openItems: 6,
    tasks: [
      { task: 'Loan Module Integration', owner: 'Rahul Verma', dueDate: '2026-06-20', status: 'In Progress', priority: 'High' },
      { task: 'Credit Score API', owner: 'Vikram Iyer', dueDate: '2026-06-25', status: 'Delayed', priority: 'High' },
      { task: 'Customer Portal UI', owner: 'Tanvi Reddy', dueDate: '2026-06-30', status: 'In Progress', priority: 'Medium' },
      { task: 'Compliance Review', owner: 'Karan Singh', dueDate: '2026-07-05', status: 'Pending', priority: 'High' },
    ],
  },
];

module.exports = { demoUser, teamMembers, projects };
