import React, { useState } from 'react';
import '../css/AdminUserManagement.css';

const initialUsers = [
  { id: 1, name: 'Admin', email: 'admin@gmail.com', role: 'admin' },
  { id: 2, name: 'Miray Köksal', email: 'miray@gmail.com', role: 'user' },
  { id: 3, name: 'Cem Kalkandüşen', email: 'cem@gmail.com', role: 'user' },
  { id: 4, name: 'Meryem Çanga', email: 'meryem@gmail.com', role: 'user' }
];

const AdminUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== userToDelete));
    setShowModal(false);
  };

  const handleShowModal = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdminUser = {
      id: users.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      password: newAdmin.password,
      role: 'admin'
    };
    setUsers([...users, newAdminUser]);
    setNewAdmin({ name: '', email: '', password: '' });
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
                <button onClick={() => handleShowModal(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Confirmation</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleDeleteUser}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <h2>Add New Admin</h2>
      <form onSubmit={handleAddAdmin} className="add-admin-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="add-admin-button">Add Admin</button>
      </form>
    </div>
  );
};

export default AdminUserManagement;
