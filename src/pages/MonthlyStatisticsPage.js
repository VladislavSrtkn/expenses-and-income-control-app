import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoriesPie from '../features/categories/CategoriesPie';
import DateFilter from '../features/header/DateFilter';

export default function MonthlyStatisticsPage() {
  const style = { py: 3, fontWeight: 'bold' };

  return (
    <Grid2 container direction='column' xs={12} px={2} md={3} textAlign='center' margin='auto'>
      <Grid2 item>
        <DateFilter />
      </Grid2>
      <Typography component={'h3'} sx={style}>
        Expenses:
      </Typography>
      <CategoriesPie operationsType='expense' />

      <Typography component={'h3'} sx={style}>
        Income:
      </Typography>
      <CategoriesPie operationsType='income' />
    </Grid2>
  );
}
