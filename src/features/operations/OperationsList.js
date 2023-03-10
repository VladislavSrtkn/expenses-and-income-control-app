import { List } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSelector } from 'react-redux';
import OperationsListItem from './OperationsListItem';

export default function OperationsList() {
  const filterType = useSelector((state) => state.filters.type);
  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  const operations = useSelector((state) => Object.values(state.operations.entities));

  const filteredOperations = operations
    .filter((operation) => {
      const matchedYear = operation.year === year;
      const matchedMonth = operation.month === month;
      const matchedType = operation.type === filterType || filterType === 'all';

      return matchedYear && matchedMonth && matchedType;
    })
    .sort((a, b) => (a.date >= b.date ? -1 : 1));

  const input = filteredOperations.map((item) => (
    <OperationsListItem key={item.id} itemObj={item} />
  ));

  return (
    <Grid2 container sx={{ m: 'auto', width: '100%', justifyContent: 'center' }}>
      <List sx={{ width: '100%' }}>{input}</List>
    </Grid2>
  );
}
