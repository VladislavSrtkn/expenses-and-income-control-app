import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function MonthlySummary() {
  const filterType = useSelector((state) => state.filters.type);
  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;
  const operations = useSelector((state) => Object.values(state.operations.entities));
  const currencyLabel = useSelector((state) => state.filters.currency.label);

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
    <Typography>
      {header} {monthlyTotal} {currencyLabel}
    </Typography>
  );
}
