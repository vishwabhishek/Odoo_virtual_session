import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SkillModeration from './pages/SkillModeration';
import SwapMonitoring from './pages/SwapMonitoring';
import PlatformAnnouncements from './pages/PlatformAnnouncements';
import ReportsLogs from './pages/ReportsLogs';
import Settings from './pages/Settings';
import { cn } from './lib/utils';
import { ToastProvider } from './components/ui/toast';

function App() {
  console.log('App component is rendering');

  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/skills" element={<SkillModeration />} />
              <Route path="/monitoring" element={<SwapMonitoring />} />
              <Route path="/announcements" element={<PlatformAnnouncements />} />
              <Route path="/reports" element={<ReportsLogs />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
