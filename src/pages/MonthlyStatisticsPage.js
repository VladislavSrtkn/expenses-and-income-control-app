import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoriesPie from '../features/categories/CategoriesPie';
import DateFilter from '../features/header/DateFilter';

export default function MonthlyStatisticsPage() {
  return (
    <Grid2 container direction='column' xs={10} md={3} textAlign='center' margin='auto'>
      <Grid2 item>
        <DateFilter />
      </Grid2>
      <h3>Expenses:</h3>
      <CategoriesPie operationsType='expense' />
    </Grid2>
  );
}
