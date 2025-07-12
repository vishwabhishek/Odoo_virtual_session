import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, GraduationCap, BarChart3, Megaphone, FileText, Settings, Menu, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActiveRoute = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/users', label: 'User Management', icon: Users },
    { path: '/skills', label: 'Skill Moderation', icon: GraduationCap },
    { path: '/monitoring', label: 'Swap Monitoring', icon: BarChart3 },
    { path: '/announcements', label: 'Platform Announcements', icon: Megaphone },
    { path: '/reports', label: 'Reports & Logs', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar (responsive) */}
      <nav
        className={cn(
          "fixed z-30 md:static md:translate-x-0 transition-transform duration-200 w-64 bg-card border-r border-border flex flex-col h-full md:h-screen",
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
        aria-label="Sidebar navigation"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">SkillSwap Admin</h3>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>
        {/* Navigation Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </nav>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={handleToggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={handleToggleSidebar}
                aria-label="Open sidebar menu"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground">SkillSwap Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="User profile menu">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

