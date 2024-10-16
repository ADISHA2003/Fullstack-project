import React from 'react';

export const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onNavigate('add')}>
          <span role="img" aria-label="Add User">➕</span> Add User
        </li>
        <li onClick={() => onNavigate('find')}>
          <span role="img" aria-label="Find User">🔍</span> Find User
        </li>
        <li onClick={() => onNavigate('update')}>
          <span role="img" aria-label="Update Details">📝</span> Update Details
        </li>
        <li onClick={() => onNavigate('delete')}>
          <span role="img" aria-label="Delete User">🗑️</span> Delete User
        </li>
      </ul>
    </div>
  );
};
