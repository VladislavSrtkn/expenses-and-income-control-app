import { Grid, ThemeProvider } from '@mui/material';

import { Outlet } from 'react-router-dom';

import PageHeader from './features/pageHeader/PageHeader';
import theme from './customTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageHeader />
      <Grid container sx={{ justifyContent: 'center', px: 2, pb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
