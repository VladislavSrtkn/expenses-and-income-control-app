import { indigo, lightGreen } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo.A200,
    },
    secondary: {
      main: lightGreen[700],
    },
  },
});

export default theme;
