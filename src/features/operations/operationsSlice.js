import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const operationsAdapter = createEntityAdapter();
const initialState = operationsAdapter.getInitialState();

export function saveNewOperation(text, amount, type, year, month) {
  const id = month * Math.random();
  return { id, text, amount, type, year, month };
}

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    operationAdded: operationsAdapter.addOne,
    operationDeleted: operationsAdapter.removeOne,
    operationChanged: {
      reducer(state, action) {
        const { operationId, text, amount } = action.payload;
        state.entities[operationId].text = text;
        state.entities[operationId].amount = amount;
      },
      prepare(operationId, text, amount) {
        return { payload: { operationId, text, amount } };
      },
    },
  },
});

export const { operationAdded, operationDeleted, operationChanged } = operationsSlice.actions;

export default operationsSlice.reducer;
