import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { useSelector } from 'react-redux';

import CategoriesList from '../features/categories/CategoriesList';
import { selectAllCategories } from '../features/categories/categoriesSlice';

export default function CategoriesPage() {
  const categories = useSelector(selectAllCategories);
  const income = categories.filter((cat) => cat.type === 'income');
  const expense = categories.filter((cat) => cat.type === 'expense');

  return (
    <Grid2 container flexDirection='column' textAlign='center'>
      <CategoriesList title='Income' categories={income} />
      <CategoriesList title='Expenses' categories={expense} />
    </Grid2>
  );
}
