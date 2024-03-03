// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import gridReducer from '../redux/grid_slice'; // Adjust this import path to where your grid slice is located

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
