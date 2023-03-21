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
        <ArrowBackIosIcon sx={{ color: '#dcdcdc' }} />
      </IconButton>
      <Paper
        sx={{
          mx: 2,
          minWidth: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          bgcolor: '#1c2536',
          backgroundImage: 'linear-gradient(to right, #3b4150 0%, #1c2536 51%, #3a404f 100%)',
          backgroundSize: '200% auto',
          color: '#dcdcdc',
          borderRadius: '4px',
        }}
      >
        {displayedDate}
      </Paper>
      <IconButton onClick={setNextMonth}>
        <ArrowForwardIosIcon sx={{ color: '#dcdcdc' }} />
      </IconButton>
    </ButtonGroup>
  );
}
