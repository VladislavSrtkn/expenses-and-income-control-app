import { createSlice } from '@reduxjs/toolkit';
import { categories } from './categories';

function getCategoriesFromStorage() {
  return JSON.parse(localStorage.getItem('categories'));
}

function setCategoriesToStorage(categoriesObj) {
  const json = JSON.stringify(categoriesObj);
  localStorage.setItem('categories', json);
}

if (!localStorage.getItem('categories')) {
  setCategoriesToStorage(categories);
}

const initialState = {
  categories: getCategoriesFromStorage(),
};

export function createNewCategory(name, color, type) {
  const categories = getCategoriesFromStorage();
  categories[name] = { name, color, type, visibility: true, limit: 0 };
  setCategoriesToStorage(categories);
}

export function changeCategoryVisibility(name) {
  const categories = getCategoriesFromStorage();
  categories[name].visibility = !categories[name].visibility;
  setCategoriesToStorage(categories);
}

export function changeCategoryLimit(name, limit) {
  const categories = getCategoriesFromStorage();
  categories[name].limit = limit;
  setCategoriesToStorage(categories);
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesChanged(state, action) {
      state.categories = getCategoriesFromStorage();
    },
  },
});

export const { categoriesChanged } = categoriesSlice.actions;

export default categoriesSlice.reducer;
