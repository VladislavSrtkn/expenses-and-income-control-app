import { createSelector, createSlice } from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';

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
  entities: getCategoriesFromStorage(),
};

function createNewCategory(name, color, type) {
  const categories = getCategoriesFromStorage();
  const id = nanoid(15);
  categories[id] = { id, name, color, type, visibility: true, limit: 0 };
  setCategoriesToStorage(categories);
}

export function changeCategoryVisibility(id) {
  const categories = getCategoriesFromStorage();
  categories[id].visibility = !categories[id].visibility;
  setCategoriesToStorage(categories);
}

export function changeCategoryLimit(id, limit) {
  const categories = getCategoriesFromStorage();
  categories[id].limit = limit;
  setCategoriesToStorage(categories);
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesChanged(state) {
      state.entities = getCategoriesFromStorage();
    },
  },
});

export { createNewCategory };

export const { categoriesChanged } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectAllCategories = createSelector([(state) => state.categories], (categories) =>
  Object.values(categories.entities)
);
