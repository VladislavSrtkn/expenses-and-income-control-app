import HomeIcon from '@mui/icons-material/Home';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SavingsIcon from '@mui/icons-material/Savings';

import { SvgIcon } from '@mui/material';

export const navLinks = [
  {
    title: 'Main page',
    path: '/',
    icon: (
      <SvgIcon fontSize='small'>
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'My categories',
    path: '/categories',
    icon: (
      <SvgIcon fontSize='small'>
        <ViewStreamIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Create category',
    path: '/categoriesCreation',
    icon: (
      <SvgIcon fontSize='small'>
        <AddBoxIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Monthly statistics',
    path: '/monthlyStatistics',
    icon: (
      <SvgIcon fontSize='small'>
        <CalendarMonthIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Limits',
    path: '/limits',
    icon: (
      <SvgIcon fontSize='small'>
        <SavingsIcon />
      </SvgIcon>
    ),
  },
];
