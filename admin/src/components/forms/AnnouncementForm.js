import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useToast } from '../ui/toast';

const categories = [
  { value: 'update', label: 'Update' },
  { value: 'warning', label: 'Warning' },
  { value: 'downtime', label: 'Downtime Notice' },
];

const AnnouncementForm = ({ onSend }) => {
  const [form, setForm] = useState({ title: '', body: '', category: 'update' });
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleReset = () => setForm({ title: '', body: '', category: 'update' });
  const handleSend = () => {
    setModalOpen(false);
    toast({ title: 'Announcement sent!', description: 'Your announcement was broadcast to all users.' });
    onSend && onSend({ ...form, date: new Date().toISOString(), status: 'active' });
    handleReset();
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border rounded px-3 py-2 bg-background text-foreground col-span-2"
          name="title"
          placeholder="Announcement Title"
          value={form.title}
          onChange={handleChange}
        />
        <select
          className="border rounded px-3 py-2 bg-background text-foreground"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <textarea
        className="border rounded px-3 py-2 w-full bg-background text-foreground"
        name="body"
        placeholder="Announcement Body"
        rows={4}
        value={form.body}
        onChange={handleChange}
      />
      <div className="flex gap-2 justify-end">
        <button className="bg-muted text-foreground px-4 py-2 rounded" type="button" onClick={handleReset}>Reset</button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-accent" type="button" onClick={() => setModalOpen(true)}>Send Announcement</button>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Send Announcement?">
        <div>Are you sure you want to send this announcement to all users?</div>
        <div className="mt-4 flex gap-2">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded" onClick={handleSend}>Yes, Send</button>
          <button className="bg-muted text-foreground px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default AnnouncementForm; 