import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    total: 0,
    transactions: [],
  },
  reducers: {
    addIncome: (state, action) => {
      state.total += Number(action.payload.amount);
      state.transactions.push(action.payload);
    },
  },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
