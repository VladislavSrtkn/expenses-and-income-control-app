import { createSelector, createSlice } from '@reduxjs/toolkit';
import { currencies } from './currencies';
import parse from 'date-fns/parse';

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
      const newDate = parse(`${state.date.year}-${state.date.month + 1}`, 'yyyy-M', new Date());
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

export const selectFilterType = createSelector(
  [(state) => state.filters],
  (filters) => filters.type
);

export const selectFilterDate = createSelector(
  [(state) => state.filters],
  (filters) => filters.date
);

export const selectFilterCurrencyLabel = createSelector(
  [(state) => state.filters],
  (filters) => filters.currency.label
);
