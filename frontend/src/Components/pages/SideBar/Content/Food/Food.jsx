import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dashboard from '../../../../Dashboard/Dashboard';

import OK from '../../../../Assets/OK.png';
import NO from '../../../../Assets/cancel.png';
import modify from '../../../../Assets/pencil.png';
import del from '../../../../Assets/bin.png';

const Food = () => {

    
    const [incomeData, setIncomeData] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [editMode, setEditMode] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedFrequency, setUpdatedFrequency] = useState('');
    const [isSaved, setIsSaved] = useState(false); // Flag to track whether data is saved or not


    const fetchIncomeData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/food/getFood', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIncomeData(response.data);
        } catch (error) {
            alert('Please check your network connection and try again.')
            console.error('Error fetching food data:', error);
            localStorage.removeItem('token')
            // Redirect to login page
            window.location.href = '/login';
        }
    };

    useEffect(() => {
        fetchIncomeData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/food/createFood', { description, amount, frequency }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchIncomeData();
            setDescription('');
            setAmount('');
            setFrequency('monthly');
            window.location.reload();

        } catch (error) {
            console.error('Error creating food:', error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/food/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchIncomeData();
            window.location.reload();

        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };


    const handleSave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/food/updateFood/${id}`, {
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
            window.location.reload();

        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    const calculateTotalMonthlyFood = () => {
        return incomeData.reduce((total, income) => {
            const amount = parseFloat(income.amount);
            switch (income.frequency) {
                case 'weekly':
                    return total + amount * 4;
                case 'bi-weekly':
                    return total + amount * 2;
                case 'trimester':
                    return total + amount / 3;
                case 'semester':
                    return total + amount / 6;
                case 'annual':
                    return total + amount / 12;
                default:
                    return total + amount;
            }
        }, 0);
    };

    const calculateTotalAnnualyFood = () => {
        return incomeData.reduce((total, income) => {
            const amount = parseFloat(income.amount);
            switch (income.frequency) {
                case 'weekly':
                    return total + amount * 52.1428571;
                case 'bi-weekly':
                    return total + amount * 26;
                case 'monthly':
                    return total + amount * 12;
                case 'trimester':
                    return total + amount * 4;
                case 'semester':
                    return total + amount * 2;
                case 'annual':
                    return total + amount;
                default:
                    return total;
            }
        }, 0);
    };

    const totalMonthly = calculateTotalMonthlyFood();

        // Function to save total monthly clothing data to the server
        const saveTotalMonthlyData = async (value) => {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:5000/api/total/saveOrUpdateTotal', {
                    category: 'food',
                    total: value
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsSaved(true);
                
            } catch (error) {
                console.error('Error saving Total Monthly:  ', error);
            }
        };
    
        // useEffect hook to call saveTotalMonthlyData whenever totalMonthly changes
        useEffect(() => {
            if (totalMonthly !== 0 && !isSaved) {
              saveTotalMonthlyData(totalMonthly);
            } else if (totalMonthly === 0) {
                saveTotalMonthlyData(0);
              }
          }, [totalMonthly, isSaved]);


    return (
        <>
            <Dashboard />
            <div className='PagesContent'>
                <div className="income-container">
                    <h2 className='TitlePages'>Food</h2>
                    <div className="income-form-container">
                        <form onSubmit={handleSubmit} className='fromIncome'>
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className='descForm'
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className='descForm'
                            />
                            <select className='descForm' value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-weekly</option>
                                <option value="trimester">Trimester</option>
                                <option value="semester">Semester</option>
                                <option value="annual">Annual</option>
                            </select>
                            <button className='formBtnIncome' type="submit">Add</button>
                        </form>
                    </div>


                    <table className='income-table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Frequency</th>
                                <th className='actionTH'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeData.map((income) => (
                                <tr key={income._id}>
                                    {editMode === income._id ? (
                                        <>
                                            <td><input type="text" placeholder='Put your new Descirption here' value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} /></td>
                                            <td><input type="number" placeholder='Put your new Amount here' value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} /></td>
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
                                            <td className='incomeActions'>
                                                <button className='incomeBtn' onClick={() => handleSave(income._id)}>
                                                    <img src={OK} alt="" className="picIncome" />
                                                </button>
                                                <button className='incomeBtn' onClick={() => setEditMode(null)}>
                                                    <img src={NO} alt="" className="picIncome" />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className='incomeT'>{income.description}</td>
                                            <td className='incomeT'>TND {income.amount}</td>
                                            <td className='incomeT'>{income.frequency}</td>
                                            <td className='incomeActions'>
                                                <button className='incomeBtn' onClick={() => setEditMode(income._id)}>
                                                    <img src={modify} alt="" className="picIncome" />
                                                </button>
                                                <button className='incomeBtn' onClick={() => handleDelete(income._id)}>
                                                    <img src={del} alt="" className="picIncome" />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="customTableFooter">
                            <tr>
                                <td className="totalMonthly" colSpan="1">Total Food Monthly</td>
                                <td className="totalAmount" colSpan="1">
                                    TND {calculateTotalMonthlyFood().toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="totalMonthly" colSpan="1">Total Food Annually</td>
                                <td className="totalAmount" colSpan="1">
                                    TND {calculateTotalAnnualyFood().toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </>
    );
}

export default Food