import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './features/filters/filtersSlice';
import operationsSlice from './features/operations/operationsSlice';
import categoriesSlice from './features/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    operations: operationsSlice,
    filters: filtersSlice,
    categories: categoriesSlice,
  },
});

export default store;
