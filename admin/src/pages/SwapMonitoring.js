import React from 'react';
import SwapMonitoringTable from '../components/tables/SwapMonitoringTable';

const SwapMonitoring = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Swap Monitoring</h2>
      <p className="text-muted-foreground">View, filter, and manage all skill swap requests between users.</p>
    </div>
    <SwapMonitoringTable />
  </div>
);

export default SwapMonitoring;

