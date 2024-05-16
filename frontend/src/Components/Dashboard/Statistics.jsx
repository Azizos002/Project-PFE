import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

const Statistics = () => {
    const [categoryTotals, setCategoryTotals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/total/fetchTotal', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategoryTotals(response.data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching category totals:', error);
            }
        };

        fetchData();
    }, []);

    // Process data for Chart.js
    const chartData = {
        labels: categoryTotals.map((item) => item.category),
        datasets: [
            {
                label: 'Total Spending',
                data: categoryTotals.map((item) => item.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard">
            <div className="chart-container">
                <h2>Total Spending by Category</h2>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default Statistics;