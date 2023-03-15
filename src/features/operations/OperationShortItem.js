import { Divider, ListItem, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { format } from 'date-fns';

export default function OperationShortItem({ operation, currency }) {
  const { year, month, date, type, amount, text } = operation;
  const formattedDate = format(new Date(year, month, date), 'do MMM');
  const displayedAmount = type === 'income' ? `+${amount}` : `-${amount}`;

  return (
    <>
      <ListItem
        sx={{
          columnGap: 1,
          alignItems: 'flex-start',
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
          sx={{ width: '100%' }}
        >
          <Grid2>
            <ListItemText
              sx={{
                minWidth: 'fit-content',
                color: '#dcdcdc',
                '& .MuiListItemText-primary': {
                  fontWeight: 600,
                  fontSize: 15,
                },
                '& .MuiListItemText-secondary': {
                  fontSize: 12,
                },
              }}
              secondary={formattedDate}
              primary={`${displayedAmount}${currency}`}
            ></ListItemText>
          </Grid2>
          <Grid2>
            <ListItemText
              sx={{
                overflow: 'overlay',
                '& .MuiListItemText-primary': {
                  fontSize: 14,
                },
              }}
              primary={text}
            ></ListItemText>
          </Grid2>
        </Grid2>
      </ListItem>
      <Divider sx={{ '&.MuiDivider-root': { borderColor: '#605d5d8c' } }} />
    </>
  );
}
