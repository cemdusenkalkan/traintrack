import React, { useState } from 'react';
import '../css/ProfilePage.css';
import { Link } from 'react-router-dom';
import backgroundImage from '../img/BackgroundContactPage.jpg';


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
        // Check if first name, last name, and email are not empty
        if (!editedUser.firstName.trim() || !editedUser.lastName.trim() || !editedUser.email.trim()) {
            alert('First name, last name, and email cannot be empty!');
            return;
        }

        // Burada düzenlenmiş kullanıcı bilgilerini kaydetme işlemi yapılabilir.
        // Örneğin, bir API çağrısı yapılabilir.
        console.log('Saving edited user:', editedUser);
        setEditing(false);
    };

    return (

        <div className="page" style={{
            background: `url(${backgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover'
        }}>
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-form">
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={editedUser.firstName}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={editedUser.lastName}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={editedUser.phone || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                        />
                    </div>
                    {editing ? (
                        <button onClick={handleSaveClick}>Save</button>
                    ) : (
                        <div>
                            <button onClick={handleEditClick}>Edit</button>
                            <div className="link-container">
                                <Link to="/change-password" className="link">Change password</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
