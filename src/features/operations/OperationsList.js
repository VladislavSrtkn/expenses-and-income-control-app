import { List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function OperationsList() {
  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  const operations = useSelector((state) => Object.values(state.operations.entities));

  const selectedMonthOperations = operations.filter((operation) => {
    const matchedYear = operation.year === year;
    const matchedMonth = operation.month === month;

    return matchedYear && matchedMonth;
  });

  const input = selectedMonthOperations.map((item) => (
    <ListItem disablePadding key={item.id}>
      <ListItemText primary={`${item.text}. ${item.amount}`} />
    </ListItem>
  ));
  return <List>{input}</List>;
}
