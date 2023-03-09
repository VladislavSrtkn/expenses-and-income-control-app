import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import CurrencyMenu from './CurrencyMenu';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SavingsIcon from '@mui/icons-material/Savings';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PageHeader() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangePage = (ref) => {
    navigate(ref);
    setOpen(false);
  };

  const theme = useTheme();
  const iconsStyle = { color: theme.palette.primary.main };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open navigation'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ cursor: 'pointer' }}
            variant='h6'
            noWrap
            component='div'
            onClick={() => navigate('/')}
          >
            My Budget
          </Typography>
          <CurrencyMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        anchor='left'
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Typography>Navigation</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 'auto',
          }}
        >
          <List>
            <ListItem disablePadding onClick={() => handleChangePage('/')}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={iconsStyle} />
                </ListItemIcon>
                <ListItemText primary='Main page' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => handleChangePage('categories')}>
              <ListItemButton>
                <ListItemIcon>
                  <ViewStreamIcon sx={iconsStyle} />
                </ListItemIcon>
                <ListItemText primary='My categories' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => handleChangePage('categoriesCreation')}>
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxIcon sx={iconsStyle} />
                </ListItemIcon>
                <ListItemText primary='Create category' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => handleChangePage('monthlyStatistics')}>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon sx={iconsStyle} />
                </ListItemIcon>
                <ListItemText primary='Monthly statistics' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => handleChangePage('limits')}>
              <ListItemButton>
                <ListItemIcon>
                  <SavingsIcon sx={iconsStyle} />
                </ListItemIcon>
                <ListItemText primary='Limits' />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>

          <Typography sx={{ fontSize: 14, p: 1 }}>
            Made by{' '}
            <Link
              color='#000'
              target='_blank'
              href='https://github.com/VladislavSrtkn'
              underline='hover'
            >
              Vladislav Sirotkin
            </Link>{' '}
            , 2023.
          </Typography>
        </Box>
      </Drawer>
      <div style={{ height: '5rem' }}></div>
    </Box>
  );
}
