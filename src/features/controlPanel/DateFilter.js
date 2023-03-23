import ButtonGroup from '@mui/material/ButtonGroup';
import { IconButton, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { useDispatch, useSelector } from 'react-redux';
import { dateFilterChanged, dateFilterReseted, selectFilterDate } from '../filters/filtersSlice';
import { useEffect } from 'react';

export default function DateFilter() {
  const dispatch = useDispatch();

  const filterDate = useSelector(selectFilterDate);
  const { year, month } = filterDate;

  useEffect(() => {
    dispatch(dateFilterReseted());
  }, [dispatch]);

  const setPreviousMonth = () => dispatch(dateFilterChanged(month - 1));
  const setNextMonth = () => dispatch(dateFilterChanged(month + 1));

  const parsedDate = parse(`${year}-${month + 1}`, 'yyyy-M', new Date());
  const displayedDate = format(parsedDate, 'MMMM y');

  return (
    <ButtonGroup variant='text' sx={{ my: 2 }}>
      <IconButton onClick={setPreviousMonth}>
        <ArrowBackIosIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <Paper
        sx={{
          mx: 2,
          minWidth: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          backgroundImage: (theme) =>
            `linear-gradient(to right, ${theme.palette.customBg.light} 0%, ${theme.palette.customBg.dark} 51%)`,
          backgroundSize: '200% auto',
          color: 'text.primary',
          borderRadius: '4px',
        }}
      >
        {displayedDate}
      </Paper>
      <IconButton onClick={setNextMonth}>
        <ArrowForwardIosIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    </ButtonGroup>
  );
}
