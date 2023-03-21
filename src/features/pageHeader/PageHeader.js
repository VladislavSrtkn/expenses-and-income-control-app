import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Stack } from '@mui/material';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { navLinks } from './navLinks';
import CurrencyMenu from './CurrencyMenu';
import SideNavItem from './SideNavItem';

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

  const location = useLocation().pathname;

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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='static'
        open={open}
        sx={{ backgroundColor: '#1C2536', color: '#dcdcdc', mb: 3 }}
      >
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
            sx={{ cursor: 'pointer', fontWeight: 600 }}
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
            backgroundColor: '#1C2536',
            color: '#9DA4AE',
          },
        }}
        variant='temporary'
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#dcdcdc',
            }}
          >
            Navigation
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon color='primary' />
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
          <Stack
            component='ul'
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {navLinks.map((item) => {
              const active = item.path ? location === item.path : false;

              return (
                <SideNavItem
                  key={item.title}
                  active={active}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  onClick={handleChangePage}
                />
              );
            })}
          </Stack>

          <Typography sx={{ fontSize: 14, p: 1 }}>
            Made by{' '}
            <Link
              color='#1976d2'
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
    </Box>
  );
}
