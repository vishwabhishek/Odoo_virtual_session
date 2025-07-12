import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useToast } from '../ui/toast';

const mockSwaps = [
  {
    id: 'SWP-001',
    from: 'Alice',
    to: 'Bob',
    offered: 'Guitar',
    requested: 'Piano',
    available: 'Weekends',
    status: 'pending',
    timestamp: '2024-06-01 10:00',
  },
  {
    id: 'SWP-002',
    from: 'Charlie',
    to: 'Dana',
    offered: 'French',
    requested: 'Spanish',
    available: 'Evenings',
    status: 'accepted',
    timestamp: '2024-06-02 14:30',
  },
  {
    id: 'SWP-003',
    from: 'Eve',
    to: 'Frank',
    offered: 'Cooking',
    requested: 'Photography',
    available: 'Anytime',
    status: 'pending',
    timestamp: '2024-05-25 09:15',
  },
];

const statusOptions = ['all', 'pending', 'accepted', 'cancelled'];

const SwapMonitoringTable = () => {
  const [swaps, setSwaps] = useState(mockSwaps);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('all');
  const [skill, setSkill] = useState('');
  const [modal, setModal] = useState({ open: false, swap: null, type: null });
  const { toast } = useToast();

  // Analytics
  const totalSwaps = swaps.length;
  const topSkill = 'Guitar';
  const pending7 = swaps.filter(s => s.status === 'pending').length;

  // Filtering
  const filtered = swaps.filter(s =>
    (status === 'all' || s.status === status) &&
    (skill === '' || s.offered.toLowerCase().includes(skill.toLowerCase()) || s.requested.toLowerCase().includes(skill.toLowerCase()))
  );

  // Actions
  const handleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(sid => sid !== id) : [...sel, id]);
  };
  const handleBulkCancel = () => {
    setSwaps(swaps => swaps.filter(s => !selected.includes(s.id)));
    setSelected([]);
    toast({
      title: 'Selected swaps cancelled!',
      description: `Cancelled ${selected.length} swaps.`,
    });
  };
  const handleCancel = (id) => {
    setSwaps(swaps => swaps.filter(s => s.id !== id));
    setModal({ open: false, swap: null, type: null });
    toast({
      title: 'Swap cancelled!',
      description: `Swap ${id} cancelled.`,
    });
  };
  const handleReopen = (id) => {
    setSwaps(swaps => swaps.map(s => s.id === id ? { ...s, status: 'pending' } : s));
    toast({
      title: 'Swap reopened!',
      description: `Swap ${id} reopened.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 shadow text-center">
          <div className="text-2xl font-bold text-primary">{totalSwaps}</div>
          <div className="text-sm text-foreground">Total Swaps</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow text-center">
          <div className="text-2xl font-bold text-primary">{topSkill}</div>
          <div className="text-sm text-foreground">Top Traded Skill</div>
        </div>
        <div className="bg-card rounded-lg p-4 shadow text-center">
          <div className="text-2xl font-bold text-primary">{pending7}</div>
          <div className="text-sm text-foreground">Pending &gt; 7 days</div>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-card p-4 rounded-lg shadow">
        <select className="border rounded px-2 py-1 bg-background text-foreground" value={status} onChange={e => setStatus(e.target.value)}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
        <input
          className="border rounded px-2 py-1 bg-background text-foreground"
          placeholder="Search by skill..."
          value={skill}
          onChange={e => setSkill(e.target.value)}
        />
        {selected.length > 0 && (
          <button className="ml-auto bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-accent" onClick={handleBulkCancel}>
            Cancel Selected ({selected.length})
          </button>
        )}
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-card">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-accent text-accent-foreground">
              <th className="p-2"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(s => s.id))} /></th>
              <th className="p-2">Swap ID</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Offered</th>
              <th className="p-2">Requested</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Status</th>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(swap => (
              <tr key={swap.id} className="border-b border-border hover:bg-accent/30 transition">
                <td className="p-2"><input type="checkbox" checked={selected.includes(swap.id)} onChange={() => handleSelect(swap.id)} /></td>
                <td className="p-2 font-mono">{swap.id}</td>
                <td className="p-2">{swap.from}</td>
                <td className="p-2">{swap.to}</td>
                <td className="p-2">{swap.offered}</td>
                <td className="p-2">{swap.requested}</td>
                <td className="p-2">{swap.available}</td>
                <td className="p-2 capitalize font-semibold text-primary">{swap.status}</td>
                <td className="p-2 text-xs text-muted-foreground">{swap.timestamp}</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-primary hover:text-primary-foreground" onClick={() => setModal({ open: true, swap, type: 'view' })}>View Details</button>
                  {swap.status !== 'cancelled' && (
                    <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => setModal({ open: true, swap, type: 'cancel' })}>Cancel</button>
                  )}
                  {swap.status === 'cancelled' && (
                    <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700" onClick={() => handleReopen(swap.id)}>Reopen</button>
                  )}
                  <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700" onClick={() => setModal({ open: true, swap, type: 'message' })}>Send Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modals */}
      <Modal isOpen={modal.open && modal.type === 'view'} onClose={() => setModal({ open: false, swap: null, type: null })} title="Swap Details">
        {modal.swap && (
          <div className="space-y-2">
            <div><b>Swap ID:</b> {modal.swap.id}</div>
            <div><b>From:</b> {modal.swap.from}</div>
            <div><b>To:</b> {modal.swap.to}</div>
            <div><b>Offered:</b> {modal.swap.offered}</div>
            <div><b>Requested:</b> {modal.swap.requested}</div>
            <div><b>Availability:</b> {modal.swap.available}</div>
            <div><b>Status:</b> {modal.swap.status}</div>
            <div><b>Timestamp:</b> {modal.swap.timestamp}</div>
          </div>
        )}
      </Modal>
      <Modal isOpen={modal.open && modal.type === 'cancel'} onClose={() => setModal({ open: false, swap: null, type: null })} title="Cancel Swap?">
        <div>Are you sure you want to cancel this swap?</div>
        <div className="mt-4 flex gap-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleCancel(modal.swap.id)}>Yes, Cancel</button>
          <button className="bg-muted text-foreground px-4 py-2 rounded" onClick={() => setModal({ open: false, swap: null, type: null })}>No</button>
        </div>
      </Modal>
      <Modal isOpen={modal.open && modal.type === 'message'} onClose={() => setModal({ open: false, swap: null, type: null })} title="Send Message">
        <div className="mb-2">Send a message to <b>{modal.swap?.from}</b> and <b>{modal.swap?.to}</b>:</div>
        <textarea className="w-full border rounded p-2 bg-background text-foreground" rows={3} placeholder="Type your message..." />
        <div className="mt-4 flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => { setModal({ open: false, swap: null, type: null }); toast({ title: 'Message sent!', description: 'Message sent to the swap participants.' }); }}>Send</button>
          <button className="bg-muted text-foreground px-4 py-2 rounded" onClick={() => setModal({ open: false, swap: null, type: null })}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default SwapMonitoringTable; 