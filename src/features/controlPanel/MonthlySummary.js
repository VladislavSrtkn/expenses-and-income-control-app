import { Card, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import {
  selectFilterCurrencyLabel,
  selectFilterDate,
  selectFilterType,
} from '../filters/filtersSlice';
import { selectAllOperations } from '../operations/operationsSlice';

export default function MonthlySummary() {
  const filterType = useSelector(selectFilterType);
  const filterDate = useSelector(selectFilterDate);
  const { year, month } = filterDate;

  const operations = useSelector(selectAllOperations);
  const currencyLabel = useSelector(selectFilterCurrencyLabel);

  let monthlyTotal = 0;
  let header =
    filterType === 'all' ? 'Total: ' : filterType === 'income' ? 'Income: ' : 'Expense: ';

  operations.forEach((operation) => {
    if (operation.year === year && operation.month === month) {
      const amount = +operation.amount;

      switch (filterType) {
        case 'all':
          operation.type === 'income' ? (monthlyTotal += amount) : (monthlyTotal -= amount);
          break;
        case 'income':
          if (operation.type === 'income') monthlyTotal += amount;
          break;
        case 'expense':
          if (operation.type === 'expense') monthlyTotal += amount;
          break;
        default:
          return;
      }
    }
  });

  return (
    <Card sx={{ p: 1, mb: 1, bgcolor: '#1c2536', color: '#dcdcdc' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {header} {monthlyTotal} {currencyLabel}
      </Typography>
    </Card>
  );
}
