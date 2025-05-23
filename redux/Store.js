
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './slices/incomeSlice';
import expenseReducer from './slices/expenseSlice';
import categoryReducer from './slices/CategorySlice';
import transactionReducer from './slices/transactionSlice'; 
import budgetReducer from './slices/budgetSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    categories: categoryReducer,
    transaction: transactionReducer,
    budget: budgetReducer,
    notification: notificationReducer,
  },
});

export default store;
