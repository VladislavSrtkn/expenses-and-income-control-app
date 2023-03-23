import { Card, List, Typography } from '@mui/material';

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
    <Card
      sx={{
        backgroundImage: (theme) =>
          `linear-gradient(150deg, ${theme.palette.customBg.dark} 50%, ${theme.palette.customBg.light} 50%)`,
      }}
    >
      {Boolean(filteredOperations.length) && <List>{input}</List>}
      {Boolean(!filteredOperations.length) && (
        <Typography sx={{ py: 4, px: 2, fontSize: 15 }}>
          {`Add operations and they will be displayed here \u{1F609}`}
        </Typography>
      )}
    </Card>
  );
}
