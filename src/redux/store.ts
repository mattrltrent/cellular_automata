import { configureStore } from "@reduxjs/toolkit";
import gridReducer from '../redux/grid_slice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
