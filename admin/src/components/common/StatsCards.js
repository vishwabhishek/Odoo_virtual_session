import React from 'react';

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {stats.map(({ label, value, icon }, idx) => (
      <div key={idx} className="bg-white rounded shadow p-4 flex items-center">
        {icon && <span className="mr-3 text-2xl">{icon}</span>}
        <div>
          <div className="text-lg font-semibold">{value}</div>
          <div className="text-gray-500 text-sm">{label}</div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsCards; 