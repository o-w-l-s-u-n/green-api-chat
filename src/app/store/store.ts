import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
