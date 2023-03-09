import { Collapse, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { calculateExpenses } from './calculateExpenses';
import { calculateLimitPercentage } from './calclulateLimitPercentage';

export default function LimitsListItem({ item, isOpen }) {
  const [open, setOpen] = useState(isOpen);

  const { id, name, color, limit } = item;

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  const currencyLabel = useSelector((state) => state.filters.currency.label);

  const operations = useSelector((state) => Object.values(state.operations.entities));

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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={name} sx={{ width: '50%' }} />
        <ListItemText primary={`${limit}${currencyLabel}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit sx={{ paddingX: '1rem' }}>
        <Typography textAlign='start' my='1rem'>
          Spent: {expenses}
          {currencyLabel}
        </Typography>

        <Typography textAlign='start' my='1rem' fontWeight='bold'>
          {displayedBalance}
        </Typography>
        <Box
          component='div'
          height='1rem'
          my={3}
          boxSizing='content-box'
          borderRadius='0.5rem'
          bgcolor='#d9d9d9ba'
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
    </>
  );
}
