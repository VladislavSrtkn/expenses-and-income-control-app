import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useSelector, useDispatch } from 'react-redux';

import { selectFilterType, typeFilterChanged } from '../filters/filtersSlice';

export default function TypeFilter() {
  const dispatch = useDispatch();

  const type = useSelector(selectFilterType);

  const switchTypeFilter = (e) => dispatch(typeFilterChanged(e.target.value));

  const style = {
    p: 0.3,
    fontWeight: 600,
    border: 0,
    color: 'text.primary',
    '&.Mui-selected': { color: 'primary.main' },
  };

  return (
    <ToggleButtonGroup
      size='small'
      sx={{ bgcolor: 'customBg.dark', boxShadow: (theme) => theme.shadows[5] }}
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
