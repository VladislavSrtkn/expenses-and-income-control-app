import { useSelector } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoriesList from './CategoriesList';

export default function CategoriesPage() {
  const categories = useSelector((state) => state.categories.categories);
  const income = Object.values(categories).filter((cat) => cat.type === 'income');
  const expense = Object.values(categories).filter((cat) => cat.type === 'expense');

  return (
    <Grid2 container flexDirection='column' xs={10} md={3} margin='auto' textAlign='center'>
      <h3> Your categories:</h3>
      <CategoriesList title='Income' categories={income} />
      <CategoriesList title='Expenses' categories={expense} />
    </Grid2>
  );
}
