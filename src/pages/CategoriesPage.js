import { useSelector } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoriesList from '../features/categories/CategoriesList';
import { Typography } from '@mui/material';

export default function CategoriesPage() {
  const categories = useSelector((state) => state.categories.entities);
  const income = Object.values(categories).filter((cat) => cat.type === 'income');
  const expense = Object.values(categories).filter((cat) => cat.type === 'expense');

  return (
    <Grid2 container flexDirection='column' textAlign='center'>
      <Typography component={'h3'} sx={{ fontWeight: 'bold', py: 3 }}>
        Choose the categories you want to use:
      </Typography>
      <CategoriesList title='Income' categories={income} />
      <CategoriesList title='Expenses' categories={expense} />
    </Grid2>
  );
}
