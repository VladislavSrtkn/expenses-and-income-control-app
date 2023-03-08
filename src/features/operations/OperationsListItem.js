import { Box, Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeOperation, operationsChanged } from './operationsSlice';
import { format } from 'date-fns';

export default function OperationsListItem({ itemObj }) {
  const { id, text, amount, type, category, year, month, date } = itemObj;

  const dispatch = useDispatch();
  const currencyLabel = useSelector((state) => state.filters.currency.label);
  const categories = useSelector((state) => state.categories.entities);

  const catName = categories[category].name;
  const color = categories[category].color;

  const displayedAmount = type === 'income' ? `+${amount}` : `-${amount}`;

  const handleDelete = () => {
    removeOperation(id);
    dispatch(operationsChanged());
  };

  const formattedDate = format(new Date(year, month, date), 'do MMM');
  return (
    <>
      <ListItem>
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
              sx={{ overflow: 'overlay' }}
              secondary={formattedDate}
            />
          </Grid2>

          <Grid2 item xs={6}>
            <ListItemText
              primary={text}
              secondary={catName}
              sx={{ overflow: 'overlay', fontSize: '0.7rem' }}
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
            <IconButton color='default' onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider />
    </>
  );
}
