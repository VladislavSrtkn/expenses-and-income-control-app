import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './features/filters/filtersSlice';
import operationsSlice from './features/operations/operationsSlice';

const store = configureStore({
  reducer: {
    operations: operationsSlice,
    filters: filtersSlice,
  },
});

export default store;
