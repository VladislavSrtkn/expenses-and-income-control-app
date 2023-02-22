import PageHeader from './features/pageHeader/PageHeader';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div style={{ margin: 'auto' }}>
      <PageHeader />
      <Outlet />
    </div>
  );
}

export default App;
