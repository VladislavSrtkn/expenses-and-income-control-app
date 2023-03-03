import { Box, Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { operationDeleted } from './operationsSlice';
import { format } from 'date-fns';

export default function OperationsListItem({ itemObj }) {
  const { id, text, amount, type, category, year, month, date } = itemObj;
  const dispatch = useDispatch();
  const currencyLabel = useSelector((state) => state.filters.currency.label);
  const categories = useSelector((state) => state.categories.categories);

  const handleDelete = () => dispatch(operationDeleted(id));

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
          <Grid2 item xs={1}>
            <Box sx={{ width: '1rem', height: '1rem', borderRadius: '50%' }} className={type}></Box>
          </Grid2>

          <Grid2 item xs={3}>
            <ListItemText
              primary={`${amount}${currencyLabel}`}
              sx={{ overflow: 'overlay' }}
              secondary={formattedDate}
            />
          </Grid2>

          <Grid2 item xs={6}>
            <ListItemText
              primary={text}
              secondary={category}
              sx={{ overflow: 'overlay', fontSize: '0.7rem' }}
            />
          </Grid2>
          <Grid2 item xs={1}>
            <Box
              component='div'
              sx={{
                width: '1rem',
                height: '1rem',
                borderRadius: '0.3rem',
                bgcolor: categories[category].color,
              }}
            ></Box>
          </Grid2>
          <Grid2 item xs={1}>
            <IconButton color='warning' onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider />
    </>
  );
}
