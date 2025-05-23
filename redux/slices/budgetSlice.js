// src/redux/slices/budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    budgets: [],
  },
  reducers: {
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
      console.log('Budget Added:', action.payload);
    },
    deleteBudget: (state, action) => {
      state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
      console.log('Budget Deleted:', action.payload);
    },
  },
});

export const { addBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
