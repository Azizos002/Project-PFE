import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AdminDashboard.css'

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAdminToken();
        fetchUsers();
    }, []);

    const checkAdminToken = () => {
        const adminToken = localStorage.getItem('token');
        if (!adminToken) {
            toast.error('Connection lost. Please log in again.');
            setRedirect(true); // Redirect to the login page
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUsername = async (userId, newUsername) => {
        try {
            await axios.put(`http://localhost:5000/admin/api/users/${userId}`, { username: newUsername });
            fetchUsers();
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const searchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/api/users/search?username=${searchUsername}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error searching user:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setRedirect(true); // Redirect to the login page
    };

    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect, navigate]);

    return (
        <div className="AdmDash">
            <h2 className="AdmDash-title">Admin Dashboard</h2>
            <div className="AdmDash-search">
                <h3>Search Users</h3>
                <input
                    type="text"
                    placeholder="Search by Username"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                />
                <button onClick={searchUser}>Search</button>
            </div>
            <div className="AdmDash-users">
                <h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="AdmDash-delete-btn" onClick={() => deleteUser(user._id)}>Delete</button>
                                    <input
                                        type="text"
                                        placeholder="New Username"
                                        className="AdmDash-update-input"
                                        value={user.newUsername || ''}
                                        onChange={(e) => {
                                            const newUsers = [...users];
                                            const index = newUsers.findIndex(u => u._id === user._id);
                                            newUsers[index].newUsername = e.target.value;
                                            setUsers(newUsers);
                                        }}
                                    />
                                    <button className="AdmDash-update-btn" onClick={() => updateUsername(user._id, user.newUsername)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
