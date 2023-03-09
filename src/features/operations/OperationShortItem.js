import { Divider, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { format } from 'date-fns';

export default function OperationShortItem({ operation, currency }) {
  const { year, month, date, type, amount, text } = operation;
  const formattedDate = format(new Date(year, month, date), 'do MMM');
  const displayedAmount = type === 'income' ? `+${amount}` : `-${amount}`;

  return (
    <>
      <ListItem sx={{ columnGap: 1, alignItems: 'flex-start' }}>
        <Grid2 container columnSpacing={1} alignItems='center' justifyContent='space-between'>
          <Grid2 item xs={6}>
            <ListItemText
              sx={{ minWidth: 'fit-content' }}
              secondary={formattedDate}
              primary={`${displayedAmount}${currency}`}
            ></ListItemText>
          </Grid2>
          <Grid2 item xs={6}>
            <ListItemText sx={{ overflow: 'overlay' }} primary={text}></ListItemText>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider />
    </>
  );
}
