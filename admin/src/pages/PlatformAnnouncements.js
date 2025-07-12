import React, { useState } from 'react';
import AnnouncementForm from '../components/forms/AnnouncementForm';
import PlatformAnnouncementsTable from '../components/tables/PlatformAnnouncementsTable';

const PlatformAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const handleSend = (announcement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Platform Announcements</h2>
        <p className="text-muted-foreground">Compose, send, and manage platform-wide messages or alerts for all users.</p>
      </div>
      <AnnouncementForm onSend={handleSend} />
      <PlatformAnnouncementsTable announcements={announcements} />
    </div>
  );
};

export default PlatformAnnouncements;
