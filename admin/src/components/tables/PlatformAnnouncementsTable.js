import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useToast } from '../ui/toast';

const mockAnnouncements = [
  { id: 1, title: 'Platform Update', body: 'We have launched new features!', category: 'Update', date: '2024-06-01', status: 'active' },
  { id: 2, title: 'Downtime Notice', body: 'Scheduled maintenance on June 5th.', category: 'Downtime Notice', date: '2024-05-30', status: 'expired' },
  { id: 3, title: 'Warning', body: 'Beware of phishing emails.', category: 'Warning', date: '2024-05-28', status: 'active' },
];

const PlatformAnnouncementsTable = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [modal, setModal] = useState({ open: false, announcement: null, type: null });
  const { toast } = useToast();

  const handleDelete = (id) => {
    setAnnouncements(a => a.filter(an => an.id !== id));
    setModal({ open: false, announcement: null, type: null });
    toast({ title: 'Announcement deleted', description: `Announcement #${id} deleted.` });
  };
  const handleResend = (id) => {
    toast({ title: 'Announcement resent', description: `Announcement #${id} resent to all users.` });
  };

  return (
    <div className="mt-8 bg-card rounded-lg shadow p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-accent text-accent-foreground">
            <th className="p-2">Title</th>
            <th className="p-2">Date Sent</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map(a => (
            <tr key={a.id} className="border-b border-border hover:bg-accent/30 transition">
              <td className="p-2 font-semibold cursor-pointer underline" onClick={() => setModal({ open: true, announcement: a, type: 'preview' })}>{a.title}</td>
              <td className="p-2">{a.date}</td>
              <td className="p-2">{a.category}</td>
              <td className={`p-2 capitalize font-semibold ${a.status === 'active' ? 'text-green-500' : 'text-muted-foreground'}`}>{a.status}</td>
              <td className="p-2 flex gap-2">
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => setModal({ open: true, announcement: a, type: 'delete' })}>Delete</button>
                <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700" onClick={() => handleResend(a.id)}>Resend</button>
                <button className="bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-primary hover:text-primary-foreground" onClick={() => setModal({ open: true, announcement: a, type: 'preview' })}>Preview</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modals */}
      <Modal isOpen={modal.open && modal.type === 'preview'} onClose={() => setModal({ open: false, announcement: null, type: null })} title={modal.announcement?.title || 'Announcement'}>
        <div className="mb-2 text-xs text-muted-foreground">{modal.announcement?.date} | {modal.announcement?.category}</div>
        <div className="whitespace-pre-line text-foreground">{modal.announcement?.body}</div>
      </Modal>
      <Modal isOpen={modal.open && modal.type === 'delete'} onClose={() => setModal({ open: false, announcement: null, type: null })} title="Delete Announcement?">
        <div>Are you sure you want to delete this announcement?</div>
        <div className="mt-4 flex gap-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDelete(modal.announcement.id)}>Yes, Delete</button>
          <button className="bg-muted text-foreground px-4 py-2 rounded" onClick={() => setModal({ open: false, announcement: null, type: null })}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default PlatformAnnouncementsTable; 