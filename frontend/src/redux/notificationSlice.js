import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotification: (state, action) => {
      state.notifications.push(action.payload);
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
