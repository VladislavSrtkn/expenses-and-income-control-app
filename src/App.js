import PageHeader from './features/pageHeader/PageHeader';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './customTheme';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid2
        container
        flexDirection='column'
        sx={{ m: 'auto' }}
        px={2}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        pb={5}
      >
        <PageHeader />
        <Outlet />
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
