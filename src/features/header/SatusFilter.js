import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { typeFilterChanged } from '../filters/filtersSlice';

export default function StatusFilter() {
  const status = useSelector((state) => state.filters.type);

  const dispatch = useDispatch();
  const switchStatusFilter = (e) => dispatch(typeFilterChanged(e.target.value));

  return (
    <ToggleButtonGroup
      color='primary'
      value={status}
      exclusive
      onChange={switchStatusFilter}
      aria-label="Operation's status"
      sx={{ width: '-webkit-fill-available' }}
    >
      <ToggleButton value='all' sx={{ width: '33.33%' }}>
        All
      </ToggleButton>
      <ToggleButton value='income' sx={{ width: '33.33%' }}>
        Income
      </ToggleButton>
      <ToggleButton value='expense' sx={{ width: '33.33%' }}>
        Expense
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
