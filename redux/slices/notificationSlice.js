// src/redux/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        read: false,
        highlighted: false,
      });
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map(n => ({ ...n, read: true }));
    },
    deleteAll: (state) => {
      state.notifications = [];
    },
    markAsRead: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    toggleHighlight: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.highlighted = !notif.highlighted;
    },
  },
});

export const {
  addNotification,
  markAllAsRead,
  deleteAll,
  markAsRead,
  toggleHighlight,
} = notificationSlice.actions;

export default notificationSlice.reducer;
