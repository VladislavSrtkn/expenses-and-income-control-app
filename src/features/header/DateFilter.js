import ButtonGroup from '@mui/material/ButtonGroup';
import { IconButton, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import format from 'date-fns/format';

import { useDispatch, useSelector } from 'react-redux';
import { dateFilterChanged } from '../filters/filtersSlice';

export default function DateFilter() {
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  const setPreviousMonth = () => dispatch(dateFilterChanged(month - 1));
  const setNextMonth = () => dispatch(dateFilterChanged(month + 1));

  const displayedDate = format(new Date(year, month), 'MMMM y');

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
