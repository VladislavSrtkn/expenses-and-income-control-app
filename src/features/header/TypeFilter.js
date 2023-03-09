import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { typeFilterChanged } from '../filters/filtersSlice';

export default function TypeFilter() {
  const type = useSelector((state) => state.filters.type);

  const dispatch = useDispatch();
  const switchTypeFilter = (e) => dispatch(typeFilterChanged(e.target.value));

  const style = { width: '33.33%', p: 0.1 };

  return (
    <ToggleButtonGroup
      color='primary'
      value={type}
      exclusive
      onChange={switchTypeFilter}
      aria-label="Operation's status"
      sx={{ width: '100%' }}
    >
      <ToggleButton value='expense' sx={style}>
        Expense
      </ToggleButton>
      <ToggleButton value='income' sx={style}>
        Income
      </ToggleButton>
      <ToggleButton value='all' sx={style}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
