import { Card, Collapse, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/system';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { calculateExpenses } from './calculateExpenses';
import { calculateLimitPercentage } from './calclulateLimitPercentage';
import { selectAllOperations } from '../operations/operationsSlice';
import { selectFilterCurrencyLabel, selectFilterDate } from '../filters/filtersSlice';

export default function LimitsListItem({ item }) {
  const [open, setOpen] = useState(true);

  const { id, name, color, limit } = item;

  const filterDate = useSelector(selectFilterDate);
  const { year, month } = filterDate;

  const currencyLabel = useSelector(selectFilterCurrencyLabel);

  const operations = useSelector(selectAllOperations);

  const filteredOperations = operations.filter((operation) => {
    const matchedYear = operation.year === year;
    const matchedMonth = operation.month === month;
    const matchedCategory = operation.category === id;

    return matchedYear && matchedMonth && matchedCategory;
  });

  const expenses = calculateExpenses(filteredOperations);

  const limitPercent = calculateLimitPercentage(limit, expenses);
  const percent = `${limitPercent < 100 ? limitPercent : 100}%`;

  const balance = (limit - expenses).toFixed(2);
  const displayedBalance =
    balance > 0
      ? `Left: ${balance}${currencyLabel}`
      : `Overspending: ${balance * -1}${currencyLabel}`;

  return (
    <>
      <Card
        sx={{
          width: '100%',
          backgroundImage: (theme) =>
            `linear-gradient(160deg, ${theme.palette.customBg.light} 90px, ${theme.palette.customBg.dark} 90px)`,
          my: 2,
        }}
      >
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemText
            primary={name}
            sx={{
              width: '50%',
              '& .MuiListItemText-primary': {
                fontWeight: 600,
                fontSize: 15,
              },
            }}
          />
          <ListItemText
            sx={{
              '& .MuiListItemText-primary': {
                fontWeight: 600,
                fontSize: 15,
              },
            }}
            primary={`${limit}${currencyLabel}`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout='auto' unmountOnExit sx={{ paddingX: '1rem' }}>
          <Typography textAlign='start' sx={{ my: 1, fontSize: 15 }}>
            Spent: {expenses}
            {currencyLabel}
          </Typography>

          <Typography
            textAlign='start'
            sx={{ my: 1, fontSize: 15, fontWeight: 600, color: 'primary.main' }}
          >
            {displayedBalance}
          </Typography>
          <Box
            component='div'
            height='1rem'
            my={3}
            boxSizing='content-box'
            borderRadius='0.5rem'
            bgcolor='#d9d9d9ba'
            overflow='hidden'
          >
            <Box
              component='div'
              height='1rem'
              borderRadius='0.5rem'
              sx={{
                width: percent,
                bgcolor: color,
              }}
              className='show-percent-box'
            />
          </Box>
        </Collapse>
      </Card>
    </>
  );
}
