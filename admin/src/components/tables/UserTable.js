import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user', banned: false },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user', banned: true },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user', banned: false },
];

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const handleBanToggle = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u))
    );
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2 mb-4 w-full max-w-xs"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.banned ? 'Banned' : 'Active'}</td>
              <td className="p-2">
                <button
                  className={`px-3 py-1 rounded text-white ${user.banned ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                  onClick={() => handleBanToggle(user.id)}
                >
                  {user.banned ? 'Unban' : 'Ban'}
                </button>
                <button className="px-3 py-1 rounded bg-blue-500 text-white">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable; 