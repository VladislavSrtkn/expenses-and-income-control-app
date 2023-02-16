import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const operationsAdapter = createEntityAdapter();
const initialState = operationsAdapter.getInitialState();

export function saveNewOperation(text, amount, operationType, year, month) {
  return { id: 0, text, amount, operationType, year, month };
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
