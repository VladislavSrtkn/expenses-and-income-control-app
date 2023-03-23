import { Card, List, Typography } from '@mui/material';
import CategoriesListItem from './CategoriesListItem';

export default function CategoriesList({ title, categories }) {
  const input = categories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => <CategoriesListItem key={category.id} category={category} />);

  return (
    <Card
      sx={{
        mb: 3,
        backgroundImage: (theme) =>
          `linear-gradient(330deg, ${theme.palette.customBg.dark} 50%, ${theme.palette.customBg.light} 50%)`,
      }}
    >
      <Typography
        component={'h3'}
        sx={{ fontWeight: 600, pt: 1, textAlign: 'center', color: 'primary.main' }}
      >
        {title}
      </Typography>
      <List>{input}</List>
    </Card>
  );
}
