import React, { useState } from 'react';

const mockSkills = [
  { id: 1, name: 'Inappropriate Skill', user: 'Alice', description: 'Bad content', date: '2024-06-01' },
  { id: 2, name: 'Spam Skill', user: 'Bob', description: 'Spammy', date: '2024-06-02' },
];

const FlaggedSkillTable = () => {
  const [skills, setSkills] = useState(mockSkills);

  const handleApprove = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };
  const handleDelete = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };
  const handleBan = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2">Skill</th>
          <th className="p-2">User</th>
          <th className="p-2">Description</th>
          <th className="p-2">Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill.id} className="border-t">
            <td className="p-2">{skill.name}</td>
            <td className="p-2">{skill.user}</td>
            <td className="p-2">{skill.description}</td>
            <td className="p-2">{skill.date}</td>
            <td className="p-2 flex gap-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleApprove(skill.id)}>Approve</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(skill.id)}>Delete</button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleBan(skill.id)}>Ban User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlaggedSkillTable; 