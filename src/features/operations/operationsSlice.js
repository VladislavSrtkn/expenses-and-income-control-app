import { createSelector, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  entities: getOperationsFromStorage(),
};

function getOperationsFromStorage() {
  return JSON.parse(localStorage.getItem('operations')) || {};
}

function setOperationsToStorage(operationsObj) {
  const json = JSON.stringify(operationsObj);
  localStorage.setItem('operations', json);
}

function saveNewOperation(text, amount, type, category, year, month, date) {
  const operations = getOperationsFromStorage();
  const id = nanoid(15);
  operations[id] = { id, text, amount, type, category, year, month, date };
  setOperationsToStorage(operations);
}

function removeOperation(id) {
  const operations = getOperationsFromStorage();
  delete operations[id];
  setOperationsToStorage(operations);
}

const operationsSlice = createSlice({
  name: 'operations',
  initialState: initialState,
  reducers: {
    operationsChanged(state) {
      state.entities = getOperationsFromStorage();
    },
  },
});

export { saveNewOperation, removeOperation };

export const { operationsChanged } = operationsSlice.actions;

export default operationsSlice.reducer;

export const selectAllOperations = createSelector([(state) => state.operations], (operations) =>
  Object.values(operations.entities)
);
