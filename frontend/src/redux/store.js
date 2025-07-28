import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'
  import { setSocket } from './socketSlice';




const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['socket'],
}

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer, // will not be persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, setSocket.type],
        ignoredPaths: ['socket.socket'], // ⚠️ important
      },
    }),
});

export default store;