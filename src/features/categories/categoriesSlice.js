import { createSlice } from '@reduxjs/toolkit';
import { categories } from './categories';

if (!localStorage.getItem('categories')) {
  const json = JSON.stringify(categories);
  localStorage.setItem('categories', json);
}

const initialState = {
  categories: JSON.parse(localStorage.getItem('categories')),
};

export function createNewCategory(name, color, type) {
  const categories = JSON.parse(localStorage.getItem('categories'));
  categories[name] = { name, color, type };
  const json = JSON.stringify(categories);
  localStorage.setItem('categories', json);
}

export function deleteCategory(name) {
  const categories = JSON.parse(localStorage.getItem('categories'));
  delete categories[name];
  const json = JSON.stringify(categories);
  localStorage.setItem('categories', json);
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesChanged(state, action) {
      state.categories = JSON.parse(localStorage.getItem('categories'));
    },
  },
});

export const { categoriesChanged } = categoriesSlice.actions;

export default categoriesSlice.reducer;
