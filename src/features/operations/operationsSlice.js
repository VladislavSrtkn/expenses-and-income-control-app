import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const operationsAdapter = createEntityAdapter();
const initialState = operationsAdapter.getInitialState();

export function saveNewOperation(text, amount, type, category, year, month, date) {
  const id = nanoid(15);
  return { id, text, amount, type, category, year, month, date };
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
