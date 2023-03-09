import PageHeader from './features/pageHeader/PageHeader';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import theme from './customTheme';

// localStorage.clear();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 'auto' }}>
        <PageHeader />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
