import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
     setNotification: (state, action) => {
      // Prevent adding duplicate notifications
      const exists = state.notifications.some(
        (notif) => notif._id === action.payload._id
      );
      if (!exists) {
        state.notifications.push(action.payload);
      }
    },
    clearNotificationFromUser: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.senderId !== action.payload
      );
    },
  },
});

export const { setNotification, clearNotificationFromUser } =
  notificationSlice.actions;
export default notificationSlice.reducer;
