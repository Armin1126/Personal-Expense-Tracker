import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/expenses?userId=${user.id}`);
      setExpenses(response.data);
      const total = response.data.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [user.id]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchExpenses();
  }, [user, navigate, fetchExpenses]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categoryData),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <header>
          <h1>💰 Expense Tracker Dashboard</h1>
          <button onClick={handleLogout}>🚪 Logout</button>
        </header>
        <div className="dashboard-content">
          <div className="summary">
            <h2>💵 Total Expenses: ${totalExpenses.toFixed(2)}</h2>
            <button onClick={() => navigate('/add-expense')}>➕ Add Expense</button>
          </div>
          <div className="chart-container">
            <Bar data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: '📊 Expenses by Category',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                },
              },
            }} />
          </div>
          <div className="expense-table-container">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>📝 Title</th>
                  <th>💰 Amount</th>
                  <th>🏷️ Category</th>
                  <th>📅 Date</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => navigate(`/edit-expense/${expense.id}`)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(expense.id)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;