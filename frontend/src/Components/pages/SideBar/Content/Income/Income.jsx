import React from 'react'
import Dashboard from '../../../../Dashboard/Dashboard'

import './Income.css'
const Income = () => {
  return (
    <>
      <Dashboard />

      <div className='PagesContent'>
        <div className="income-container">
          <h2 className='TitlePages'>Income</h2>
          <table className="income-table">
            <thead className='Thead'>
              <tr>
                <th className='DescTitle'>Description</th>
                <th>Amount</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='DescriptionTitle'>Take Home Income</td>
                <td>TND <input type="number" className="amount-input" /></td>
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
      {/* Passss */}
              <tr>
                <td className='DescriptionTitle'>Pension</td>
                <td>TND <input type="number" className="amount-input" /></td>
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
      {/* Passss */}
              <tr>
                <td className='DescriptionTitle'>Second Income</td>
                <td>TND <input type="number" className="amount-input" /></td>
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
        {/* Passss */}
             <tr>
                <td className='DescriptionTitle'>Commission</td>
                <td>TND <input type="number" className="amount-input" /></td>
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

        {/* Passss */}
            <tr>
                <td className='DescriptionTitle'>Child Tax Benefits</td>
                <td>TND <input type="number" className="amount-input" /></td>
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

        {/* Passss */}
                <tr>
                <td className='DescriptionTitle'>Support Payments</td>
                <td>TND <input type="number" className="amount-input" /></td>
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


        {/* Passss */}
              <tr>
                <td className='DescriptionTitle'>Other Income</td>
                <td>TND <input type="number" className="amount-input" /></td>
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

            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Income