import React from 'react'
import './Tax.css'
import Dashboard from '../../../../Dashboard/Dashboard'
const Tax = () => {
  return (
    <>
          <Dashboard />

      <div className='PagesContent'>

      <div className="income-container">
          <h2 className='TitlePages'>Tax</h2>
          <table className="income-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Description 1</td>
                <td><input type="text" className="amount-input" /> $</td>
                <td>
                  <select>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="trimester">Trimester</option>
                    <option value="semester">Semester</option>
                    <option value="annual">Annual</option>
                  </select>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Tax