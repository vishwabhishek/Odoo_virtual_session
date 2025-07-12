import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/skills/flagged', label: 'Flagged Skills' },
  { to: '/swaps', label: 'Swaps' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/messages', label: 'Messages' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' },
];

const Sidebar = () => (
  <aside className="bg-gray-100 w-56 min-h-screen p-4 flex flex-col gap-2">
    {links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `block px-4 py-2 rounded hover:bg-blue-100 ${isActive ? 'bg-blue-200 font-semibold' : ''}`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </aside>
);

export default Sidebar; 