import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import materialReducer from "./slices/materialSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    materialReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
