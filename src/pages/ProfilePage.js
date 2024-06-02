import React, { useState } from 'react';

const ProfilePage = ({ user }) => {
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        // Burada düzenlenmiş kullanıcı bilgilerini kaydetme işlemi yapılabilir.
        // Örneğin, bir API çağrısı yapılabilir.
        console.log('Saving edited user:', editedUser);
        setEditing(false);
    };

    return (
        <div>
            <h1>Profile</h1>
            {editing ? (
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password:</strong> {user.password}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
