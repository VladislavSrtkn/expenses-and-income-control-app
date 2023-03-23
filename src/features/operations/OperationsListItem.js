import { Box, Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { format } from 'date-fns';

import { useDispatch, useSelector } from 'react-redux';

import { removeOperation, operationsChanged } from './operationsSlice';
import { selectAllCategories } from '../categories/categoriesSlice';
import { selectFilterCurrencyLabel } from '../filters/filtersSlice';

export default function OperationsListItem({ item }) {
  const { id, text, amount, type, category, year, month, date } = item;

  const dispatch = useDispatch();
  const currencyLabel = useSelector(selectFilterCurrencyLabel);
  const categories = useSelector(selectAllCategories);

  const { name, color } = categories.find((cat) => cat.id === category);

  const displayedAmount = type === 'income' ? `+${amount}` : `-${amount}`;

  const handleRemoveOperation = () => {
    removeOperation(id);
    dispatch(operationsChanged());
  };

  const formattedDate = format(new Date(year, month, date), 'do MMM');
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${displayedAmount}${currencyLabel}`}
          sx={{
            overflow: 'overlay',
            '& .MuiListItemText-primary': {
              fontWeight: 600,
            },
          }}
          secondary={formattedDate}
        />

        <ListItemText
          primary={name}
          secondary={text}
          sx={{
            width: '40%',
            overflow: 'overlay',
            fontSize: '0.7rem',
            '& .MuiListItemText-primary': {
              fontWeight: 600,
              fontSize: 13,
            },
            '& .MuiListItemText-secondary': {
              fontSize: 12,
            },
          }}
        />

        <Box
          component='div'
          sx={{
            width: '1rem',
            height: '0.5rem',
            borderRadius: '1rem',
            mx: 1,
            bgcolor: color,
          }}
        ></Box>

        <IconButton size='small' color='primary' onClick={handleRemoveOperation}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
}
