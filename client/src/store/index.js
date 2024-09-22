import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './slices/petsSlice';

const store = configureStore({
  reducer: {
    petsData: petsReducer,
  },
});

export default store;
