import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DashboardChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Swap Requests',
            data: [120, 150, 170, 140, 180, 200, 220],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={chartRef} height={200} />;
};

export default DashboardChart;
