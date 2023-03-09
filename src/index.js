import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';

import store from './store';
import CategoriesCreation from './pages/categoriesCreation';
import CategoriesPage from './pages/CategoriesPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import MonthlyStatisticsPage from './pages/MonthlyStatisticsPage';
import LimitsPage from './pages/LimitsPage';
import LimitsManagement from './pages/LimitsManagement';
import LimitsStatistics from './pages/LimitsStatistics';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<MainPage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='categoriesCreation' element={<CategoriesCreation />} />
            <Route path='categories' element={<CategoriesPage />} />
            <Route path='monthlyStatistics' element={<MonthlyStatisticsPage />} />
            <Route path='limits' element={<LimitsPage />}>
              <Route index element={<LimitsStatistics />} />
              <Route path='manage' element={<LimitsManagement />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
