import { List } from '@mui/material';
import CategoriesListItem from './CategoriesListItem';

export default function CategoriesList({ title, categories }) {
  const input = categories.map((category) => (
    <CategoriesListItem key={category.name} category={category} />
  ));

  return (
    <>
      <h4>{title}</h4>
      <List>{input}</List>
    </>
  );
}
