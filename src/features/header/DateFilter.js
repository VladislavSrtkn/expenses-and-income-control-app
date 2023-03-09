import ButtonGroup from '@mui/material/ButtonGroup';
import { IconButton, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { useDispatch, useSelector } from 'react-redux';
import { dateFilterChanged, dateFilterReseted } from '../filters/filtersSlice';
import { useEffect } from 'react';

export default function DateFilter() {
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  useEffect(() => {
    dispatch(dateFilterReseted());
  }, [dispatch]);

  const setPreviousMonth = () => dispatch(dateFilterChanged(month - 1));
  const setNextMonth = () => dispatch(dateFilterChanged(month + 1));

  const parsedDate = parse(`${year}-${month + 1}`, 'yyyy-M', new Date());
  const displayedDate = format(parsedDate, 'MMMM y');

  return (
    <ButtonGroup variant='contained'>
      <IconButton onClick={setPreviousMonth}>
        <ArrowBackIosIcon />
      </IconButton>
      <Paper
        elevation={0}
        sx={{ minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span>{displayedDate}</span>
      </Paper>
      <IconButton onClick={setNextMonth}>
        <ArrowForwardIosIcon />
      </IconButton>
    </ButtonGroup>
  );
}
