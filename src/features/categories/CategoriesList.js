import { Card, List, Typography } from '@mui/material';
import CategoriesListItem from './CategoriesListItem';

export default function CategoriesList({ title, categories }) {
  const input = categories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => <CategoriesListItem key={category.id} category={category} />);

  return (
    <Card
      sx={{
        my: 1,
        backgroundImage: 'linear-gradient(330deg, #1c2536 50%, #3a4150 50%)',
        color: '#dcdcdc',
      }}
    >
      <Typography component={'h3'} sx={{ fontWeight: 600, pt: 1 }}>
        {title}
      </Typography>
      <List>{input}</List>
    </Card>
  );
}
