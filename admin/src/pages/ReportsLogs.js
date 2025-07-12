import React from 'react';
import ReportButtons from '../components/common/ReportButtons';

const ReportsLogs = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Reports & Logs</h2>
      <p className="text-muted-foreground">Download user activity, swap history, and feedback logs for analytics and record-keeping.</p>
    </div>
    <ReportButtons />
  </div>
);

export default ReportsLogs;
