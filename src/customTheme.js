import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6284d5',
    },
    secondary: {
      main: '#45515e',
    },
    text: {
      primary: '#c7c7cb',
      secondary: '#6284d5',
    },
    customBg: {
      light: '#3a4150',
      dark: '#1c2536',
    },
    mode: 'dark',
  },
});

export default theme;
