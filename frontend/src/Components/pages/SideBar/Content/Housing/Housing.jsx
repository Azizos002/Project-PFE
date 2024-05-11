import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dashboard from '../../../../Dashboard/Dashboard';

import OK from '../../../../Assets/OK.png';
import NO from '../../../../Assets/cancel.png';
import modify from '../../../../Assets/pencil.png';
import del from '../../../../Assets/bin.png';

const Housing = () => {
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
        const response = await axios.get('http://localhost:5000/api/housing/getHousing', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setIncomeData(response.data);
    } catch (error) {
        alert('Please check your network connection and try again.')
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
      await axios.post('http://localhost:5000/api/housing/createHousing', { description, amount, frequency }, {
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
      await axios.delete(`http://localhost:5000/api/housing/${id}`, {
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
      await axios.put(`http://localhost:5000/api/housing/updateHousing/${id}`, {
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

const calculateTotalMonthly = () => {
  let totalMonthly = 0;
  incomeData.forEach((income) => {
      switch (income.frequency) {
          case 'monthly':
              totalMonthly += parseFloat(income.amount);
              break;
          case 'weekly':
              totalMonthly += parseFloat(income.amount) * 4;
              break;
          case 'bi-weekly':
              totalMonthly += parseFloat(income.amount) * 2;
              break;
          case 'trimester':
              totalMonthly += parseFloat(income.amount) / 3;
              break;
          case 'semester':
              totalMonthly += parseFloat(income.amount) / 6;
              break;
          case 'annual':
              totalMonthly += parseFloat(income.amount) / 12;
              break;
          default:
              break;
      }
  });
  return totalMonthly;
};

const calculateTotalAnnualy = () => {
  let totalAnnualy = 0;
  incomeData.forEach(income => {
      switch (income.frequency) {
          case 'weekly':
              totalAnnualy += parseFloat(income.amount) * 52.1428571;
              break;
          case 'bi-weekly':
              totalAnnualy += parseFloat(income.amount) * 26;
              break;
          case 'monthly':
              totalAnnualy += parseFloat(income.amount) * 12;
              break;
          case 'trimester':
              totalAnnualy += parseFloat(income.amount) * 4;
              break;
          case 'semester':
              totalAnnualy += parseFloat(income.amount) * 2;
              break;
          case 'annual':
              totalAnnualy += parseFloat(income.amount) * 1;
              break;
          default:
              break;
      }
  });

  return totalAnnualy;
}

  return (
    <>
        <Dashboard />
        <div className='PagesContent'>
            <div className="income-container">
                <h2 className='TitlePages'>Housing</h2>
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
                            <td className="totalMonthly" colSpan="1">Total Housing Monthly</td>
                            <td className="totalAmount" colSpan="1">
                                TND {calculateTotalMonthly().toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className="totalMonthly" colSpan="1">Total Housing Annually</td>
                            <td className="totalAmount" colSpan="1">
                                TND {calculateTotalAnnualy().toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    </>
);
}

export default Housing;