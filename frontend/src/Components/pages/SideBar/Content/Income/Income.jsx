import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Income.css';
import Dashboard from '../../../../Dashboard/Dashboard';

// import OK from '../../../../Assets/OK.png';
// import add from '../../../../Assets/add.png';
// import modify from '../../../../Assets/pencil.png';
// import del from '../../../../Assets/bin.png';


const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [editMode, setEditMode] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedFrequency, setUpdatedFrequency] = useState('');

    const fetchIncomeData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/income/getIncome', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIncomeData(response.data);
        } catch (error) {
            console.error('Error fetching income data:', error);
        }
    };

    useEffect(() => {
        fetchIncomeData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/income/createIncome', { description, amount, frequency }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchIncomeData();
            setDescription('');
            setAmount('');
            setFrequency('monthly');
        } catch (error) {
            console.error('Error creating income:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/income/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchIncomeData();
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    const handleSave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/income/update/${id}`, {
                description: updatedDescription,
                amount: updatedAmount,
                frequency: updatedFrequency
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchIncomeData();
            setEditMode(null);
        } catch (error) {
            console.error('Error updating income:', error);
        }
    };

    return (
        <>
            <Dashboard />
            <div className='PagesContent'>
                <div className="income-container">
                    <h2 className='TitlePages'>Income</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="trimester">Trimester</option>
                            <option value="semester">Semester</option>
                            <option value="annual">Annual</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>

                    <table className='income-table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Frequency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeData.map((income) => (
                                <tr key={income._id}>
                                    {editMode === income._id ? (
                                        <>
                                            <td><input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} /></td>
                                            <td><input type="number" value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} /></td>
                                            <td>
                                                <select value={updatedFrequency} onChange={(e) => setUpdatedFrequency(e.target.value)}>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="bi-weekly">Bi-weekly</option>
                                                    <option value="trimester">Trimester</option>
                                                    <option value="semester">Semester</option>
                                                    <option value="annual">Annual</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button onClick={() => handleSave(income._id)}>Save</button>
                                                <button onClick={() => setEditMode(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{income.description}</td>
                                            <td>{income.amount}</td>
                                            <td>{income.frequency}</td>
                                            <td>
                                                <button onClick={() => setEditMode(income._id)}>Edit</button>
                                                <button onClick={() => handleDelete(income._id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Income;
