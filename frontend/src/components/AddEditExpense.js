import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ExpenseForm.css';
const AddEditExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const fetchExpense = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/expenses?userId=${user.id}`);
      const expense = response.data.find(exp => exp.id === id);
      if (expense) {
        setTitle(expense.title);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(new Date(expense.date).toISOString().split('T')[0]);
      }
    } catch (error) {
      console.error('Error fetching expense:', error);
    }
  }, [id, user.id]);
  useEffect(() => {
    if (id) {
      fetchExpense();
    }
  }, [id, fetchExpense]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      userId: user.id
    };
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/expenses/${id}`, expenseData);
      } else {
        await axios.post('http://localhost:8080/api/expenses', expenseData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  return (
    <div className="expense-form">
      <h2>{id ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">{id ? 'Update' : 'Add'} Expense</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEditExpense;