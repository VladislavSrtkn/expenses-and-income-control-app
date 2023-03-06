import { List, Typography } from '@mui/material';
import CategoriesListItem from './CategoriesListItem';

export default function CategoriesList({ title, categories }) {
  const input = categories.map((category) => (
    <CategoriesListItem key={category.id} category={category} />
  ));

  return (
    <>
      <Typography component={'h3'} sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <List>{input}</List>
    </>
  );
}
