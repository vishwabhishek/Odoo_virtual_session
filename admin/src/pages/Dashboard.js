import React, { Suspense, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Activity, Shield, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DashboardChart = React.lazy(() => import('./DashboardChart'));

const Dashboard = () => {
  // Mock admin name
  const adminName = 'Admin';
  // Mock stats with trends
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'text-blue-600',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Active Swaps',
      value: '567',
      icon: Activity,
      color: 'text-green-600',
      trend: '-2%',
      trendUp: false,
    },
    {
      title: 'Banned Users',
      value: '23',
      icon: Shield,
      color: 'text-red-600',
      trend: '+1%',
      trendUp: true,
    },
    {
      title: 'Ratings Count',
      value: '890',
      icon: Star,
      color: 'text-yellow-600',
      trend: '+8%',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex flex-col md:flex-row items-center justify-between mb-2 shadow-sm">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            Welcome back, <span className="text-accent">{adminName}</span>!
          </h2>
          <p className="text-muted-foreground max-w-xl">Here’s a quick overview of your platform’s activity and health. Use the dashboard to monitor, moderate, and manage SkillSwap efficiently.</p>
        </div>
        <div className="hidden md:block text-blue-200 text-7xl pr-4 select-none" aria-hidden>🛡️</div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-transform hover:scale-[1.03] hover:shadow-lg group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>{stat.trend}</span>
                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3 text-green-600" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                  </div>
                </div>
                <div className={`rounded-full bg-blue-50 p-2 group-hover:bg-blue-100 transition-colors`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart Section */}
      <Card className="mt-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Swap Request Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Swap Requests</span>
              <span className="text-2xl font-bold">+12%</span>
              <span className="text-sm text-green-600">Last 30 Days +12%</span>
            </div>
            <div className="min-h-[500px] h-[55vh] w-full bg-muted rounded-md flex items-center justify-center">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center animate-pulse text-muted-foreground">Loading chart...</div>}>
                <DashboardChart range="30d" />
              </Suspense>
            </div>
            <div className="text-xs text-muted-foreground mt-2">Chart shows swap request volume over the last 30 days.</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
