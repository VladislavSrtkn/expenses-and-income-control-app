import { Divider, ListItem, ListItemText } from '@mui/material';

import { format } from 'date-fns';

export default function OperationShortItem({ operation, currency }) {
  const { year, month, date, type, amount, text } = operation;
  const formattedDate = format(new Date(year, month, date), 'do MMM');
  const displayedAmount = type === 'income' ? `+${amount}` : `-${amount}`;

  return (
    <>
      <ListItem>
        <ListItemText
          sx={{
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

        <ListItemText
          sx={{
            overflow: 'overlay',
            '& .MuiListItemText-primary': {
              fontSize: 14,
            },
          }}
          primary={text}
        ></ListItemText>
      </ListItem>
      <Divider />
    </>
  );
}
