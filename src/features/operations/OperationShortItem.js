import { Divider, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { format } from 'date-fns';

export default function OperationShortItem({ operation, currency }) {
  const { year, month, date, amount, comment } = operation;
  const formattedDate = format(new Date(year, month, date), 'do MMM');

  return (
    <>
      <ListItem sx={{ columnGap: 1, alignItems: 'flex-start' }}>
        <Grid2
          container
          columnSpacing={1}
          alignItems='center'
          justifyContent='space-between'
          xs={12}
        >
          <Grid2 item xs={6}>
            <ListItemText
              sx={{ minWidth: 'fit-content' }}
              secondary={formattedDate}
              primary={`${amount}${currency}`}
            ></ListItemText>
          </Grid2>
          <Grid2 item xs={6}>
            <ListItemText sx={{ overflow: 'overlay' }} primary={comment}></ListItemText>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider />
    </>
  );
}
