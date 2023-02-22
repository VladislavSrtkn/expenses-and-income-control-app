import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';

import store from './store';
import CategoriesCreation from './features/categories/categoriesCreation';
import CategoriesPage from './features/categories/CategoriesPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import MonthlyStatisticsPage from './pages/MonthlyStatisticsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<MainPage />} />
            <Route path='categoriesCreation' element={<CategoriesCreation />} />
            <Route path='categories' element={<CategoriesPage />} />
            <Route path='monthlyStatistics' element={<MonthlyStatisticsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
