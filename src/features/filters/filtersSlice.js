import { createSlice } from '@reduxjs/toolkit';

export const typeFilters = {
  All: 'all',
  Income: 'income',
  Expenses: 'expenses',
};

const today = new Date();

const initialState = {
  type: typeFilters.All,
  date: {
    year: today.getFullYear(),
    month: today.getMonth(),
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    typeFilterChanged(state, action) {
      state.type = action.payload;
    },
    dateFilterChanged(state, action) {
      const newDate = new Date(Date.parse(`${state.date.year}-${state.date.month + 1}`));
      const newMonth = action.payload;
      newDate.setMonth(newMonth);

      state.date.year = newDate.getFullYear();
      state.date.month = newDate.getMonth();
    },
  },
});

export const { typeFilterChanged, dateFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
