import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { typeFilterChanged } from '../filters/filtersSlice';

export default function TypeFilter() {
  const type = useSelector((state) => state.filters.type);

  const dispatch = useDispatch();
  const switchTypeFilter = (e) => dispatch(typeFilterChanged(e.target.value));

  const style = {
    width: '33.33%',
    p: 0.3,
    fontWeight: 600,
    color: '#fff',
    '&.Mui-selected': { color: '#1876d2' },
  };

  return (
    <ToggleButtonGroup
      size='small'
      sx={{ bgcolor: '#1c2536de', boxShadow: (theme) => theme.shadows[5] }}
      value={type}
      exclusive
      fullWidth
      onChange={switchTypeFilter}
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
