
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './slices/incomeSlice';
import expenseReducer from './slices/expenseSlice';
import categoryReducer from './slices/CategorySlice';
import transactionReducer from './slices/transactionSlice'; 

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    categories: categoryReducer,
    transaction: transactionReducer,
  },
});

export default store;
