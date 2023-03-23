import { Box, Typography } from '@mui/material';

import CategoriesPie from '../features/categories/CategoriesPie';
import DateFilter from '../features/controlPanel/DateFilter';

export default function MonthlyStatisticsPage() {
  const style = { py: 3, fontWeight: 'bold', color: 'primary.main' };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <DateFilter />

      <Typography component={'h3'} sx={style}>
        Expenses
      </Typography>
      <CategoriesPie operationsType='expense' />

      <Typography component={'h3'} sx={style}>
        Income
      </Typography>
      <CategoriesPie operationsType='income' />
    </Box>
  );
}
