import { Box, Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
      <ListItem
        sx={{
          '& .MuiTypography-root': {
            color: '#dfdfdf',
          },
        }}
      >
        <Grid2
          container
          columnSpacing={1}
          alignItems='center'
          justifyContent='space-between'
          xs={12}
        >
          <Grid2 item xs={4}>
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
          </Grid2>

          <Grid2 item xs={6}>
            <ListItemText
              primary={text}
              secondary={name}
              sx={{
                overflow: 'overlay',
                fontSize: '0.7rem',
                '& .MuiListItemText-primary': {
                  fontSize: 12,
                },
                '& .MuiListItemText-secondary': {
                  fontWeight: 600,
                  fontSize: 13,
                },
              }}
            />
          </Grid2>
          <Grid2 item xs={1}>
            <Box
              component='div'
              sx={{
                width: '1rem',
                height: '0.5rem',
                borderRadius: '1rem',
                bgcolor: color,
              }}
            ></Box>
          </Grid2>
          <Grid2 item xs={1}>
            <IconButton size='small' sx={{ color: '#dcdcdc' }} onClick={handleRemoveOperation}>
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider />
    </>
  );
}
