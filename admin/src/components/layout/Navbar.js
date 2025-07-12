import React from 'react';

const Navbar = ({ onLogout }) => (
  <nav className="bg-white shadow flex items-center justify-between px-6 py-3">
    <div className="font-bold text-xl text-blue-600">SkillSwap Admin</div>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={onLogout}
    >
      Logout
    </button>
  </nav>
);

export default Navbar; 