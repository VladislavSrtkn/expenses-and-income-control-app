import CategoriesCreation from './features/categories/categoriesCreation';
import CategoriesPage from './features/categories/CategoriesPage';
import Header from './features/header/Header';
import OperationsList from './features/operations/OperationsList';

import PageHeader from './features/pageHeader/PageHeader';

function App() {
  return (
    <div style={{ margin: 'auto' }}>
      <button onClick={() => localStorage.clear()}>clear storage</button>
      <PageHeader />
      <Header />
      <OperationsList />
      <CategoriesCreation />
      <CategoriesPage />
    </div>
  );
}

export default App;
