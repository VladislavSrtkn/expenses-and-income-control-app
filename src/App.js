import PageHeader from './features/pageHeader/PageHeader';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

// localStorage.clear();

function App() {
  return (
    <Box sx={{ m: 'auto' }}>
      <PageHeader />
      <Outlet />
    </Box>
  );
}

export default App;
