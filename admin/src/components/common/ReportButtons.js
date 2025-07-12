import React from 'react';

const mockUserActivity = [
  ['User ID', 'Name', 'Last Login', 'Total Swaps'],
  ['1', 'Alice', '2024-06-01', '5'],
  ['2', 'Bob', '2024-06-02', '3'],
];
const mockSwapHistory = [
  ['Swap ID', 'From', 'To', 'Skill', 'Status', 'Date'],
  ['SWP-001', 'Alice', 'Bob', 'Guitar', 'Completed', '2024-06-01'],
  ['SWP-002', 'Charlie', 'Dana', 'French', 'Pending', '2024-06-02'],
];
const mockFeedbackLogs = [
  ['User', 'Rating', 'Comment', 'Date'],
  ['Alice', '5', 'Great swap!', '2024-06-01'],
  ['Bob', '4', 'Good experience', '2024-06-02'],
];

function downloadCSV(data, filename) {
  const csv = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const cards = [
  {
    title: 'User Activity Report',
    description: 'Download comprehensive user activity data',
    button: 'Download User Activity Report (CSV)',
    onClick: () => downloadCSV(mockUserActivity, 'user_activity_report.csv'),
  },
  {
    title: 'Swap History',
    description: 'Download swap transaction history',
    button: 'Download Swap History',
    onClick: () => downloadCSV(mockSwapHistory, 'swap_history.csv'),
  },
  {
    title: 'Feedback Logs',
    description: 'Download user feedback and rating logs',
    button: 'Download Feedback Logs',
    onClick: () => downloadCSV(mockFeedbackLogs, 'feedback_logs.csv'),
  },
];

const ReportButtons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {cards.map((card, idx) => (
      <div key={idx} className="flex flex-col justify-between bg-card p-6 rounded-lg shadow min-h-[220px]">
        <div>
          <h3 className="text-xl font-bold text-primary mb-2">{card.title}</h3>
          <p className="text-muted-foreground mb-4">{card.description}</p>
        </div>
        <button
          className="mt-auto bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-accent"
          onClick={card.onClick}
        >
          {card.button}
        </button>
      </div>
    ))}
  </div>
);

export default ReportButtons; 