// redux/slices/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  partyCategories: [],
  accounts: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addPartyCategory: (state, action) => {
      state.partyCategories.push(action.payload);
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
  },
});

export const { addPartyCategory, addAccount } = categorySlice.actions;
export default categorySlice.reducer;
