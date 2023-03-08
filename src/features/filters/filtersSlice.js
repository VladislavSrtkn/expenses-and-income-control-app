import { createSlice } from '@reduxjs/toolkit';
import { currencies } from './currencies';

function getCurrencyFromStorage() {
  return JSON.parse(localStorage.getItem('currency'));
}

function setCurrencyToStorage(currencyObj) {
  const json = JSON.stringify(currencyObj);
  localStorage.setItem('currency', json);
}

if (!localStorage.getItem('currency')) {
  setCurrencyToStorage(currencies.eur);
}

export const typeFilters = {
  All: 'all',
  Income: 'income',
  Expenses: 'expense',
};

const today = new Date();

const initialState = {
  type: typeFilters.Expenses,
  currency: getCurrencyFromStorage(),
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
    currencyChanged(state) {
      state.currency = getCurrencyFromStorage();
    },
    dateFilterChanged(state, action) {
      const newDate = new Date(Date.parse(`${state.date.year}-${state.date.month + 1}`));
      const newMonth = action.payload;
      newDate.setMonth(newMonth);

      state.date.year = newDate.getFullYear();
      state.date.month = newDate.getMonth();
    },
    dateFilterReseted(state) {
      state.date.year = today.getFullYear();
      state.date.month = today.getMonth();
    },
  },
});

export const { typeFilterChanged, dateFilterChanged, dateFilterReseted, currencyChanged } =
  filtersSlice.actions;

export { setCurrencyToStorage };

export default filtersSlice.reducer;
