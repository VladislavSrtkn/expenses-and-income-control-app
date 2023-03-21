import { Card, List } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSelector } from 'react-redux';
import { selectFilterDate, selectFilterType } from '../filters/filtersSlice';
import OperationsListItem from './OperationsListItem';
import { selectAllOperations } from './operationsSlice';

export default function OperationsList() {
  const filterType = useSelector(selectFilterType);
  const filterDate = useSelector(selectFilterDate);
  const { year, month } = filterDate;

  const operations = useSelector(selectAllOperations);

  const filteredOperations = operations
    .filter((operation) => {
      const matchedYear = operation.year === year;
      const matchedMonth = operation.month === month;
      const matchedType = operation.type === filterType || filterType === 'all';

      return matchedYear && matchedMonth && matchedType;
    })
    .sort((a, b) => (a.date >= b.date ? -1 : 1));

  const input = filteredOperations.map((item) => <OperationsListItem key={item.id} item={item} />);

  return (
    <Grid2 container sx={{ m: 'auto', mt: 1, width: '100%', justifyContent: 'center' }}>
      <List sx={{ width: '100%' }}>
        <Card sx={{ backgroundImage: 'linear-gradient(150deg, #1c2536 50%, #3a4150 50%)' }}>
          {input}
        </Card>
      </List>
    </Grid2>
  );
}
