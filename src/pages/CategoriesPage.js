import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import CategoriesList from '../features/categories/CategoriesList';
import { selectAllCategories } from '../features/categories/categoriesSlice';

export default function CategoriesPage() {
  const categories = useSelector(selectAllCategories);
  const income = categories.filter((cat) => cat.type === 'income');
  const expense = categories.filter((cat) => cat.type === 'expense');

  return (
    <Box sx={{ mt: 3 }}>
      <CategoriesList title='Income' categories={income} />
      <CategoriesList title='Expenses' categories={expense} />
    </Box>
  );
}
