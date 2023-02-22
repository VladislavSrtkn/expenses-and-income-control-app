import { Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { operationDeleted } from './operationsSlice';

export default function OperationsListItem({ itemObj }) {
  const { id, text, amount, type, category } = itemObj;
  const dispatch = useDispatch();
  const currencyLabel = useSelector((state) => state.filters.currency.label);
  const categories = useSelector((state) => state.categories.categories);

  const handleDelete = () => dispatch(operationDeleted(id));

  const displayedCategory = category !== '' ? category : null;

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
            <div
              className={type}
              style={{ width: '1rem', height: '1rem', borderRadius: '50%' }}
            ></div>
          </Grid2>
          <Grid2 item xs={3}>
            <ListItemText primary={`${amount}${currencyLabel}`} sx={{ overflow: 'overlay' }} />
          </Grid2>
          <Grid2 item xs={6}>
            <ListItemText
              primary={text}
              secondary={displayedCategory}
              sx={{ overflow: 'overlay' }}
            />
          </Grid2>
          <Grid2 item xs={1}>
            <div
              style={{
                width: '100%',
                height: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.3em',
                backgroundColor: displayedCategory ? categories[category].color : null,
              }}
            ></div>
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
