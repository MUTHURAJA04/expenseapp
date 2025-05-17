import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    total: 0,
    transactions: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.total += Number(action.payload.amount);
      state.transactions.push(action.payload);
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
