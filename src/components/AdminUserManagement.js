import React, { useState } from 'react';
import '../admin.css';

const initialUsers = [
  { id: 1, name: 'Admin', email: 'admin@gmail.com', role: 'admin' },
  { id: 2, name: 'Miray Köksal', email: 'miray@gmail.com', role: 'user' },
  { id: 3, name: 'Cem Kalkandüşen', email: 'cem@gmail.com', role: 'user' },
  { id: 4, name: 'Meryem Çanga', email: 'meryem@gmail.com', role: 'user' }
];

const AdminUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);

  // Geçici olarak kullancı silmek için
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  
  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;
