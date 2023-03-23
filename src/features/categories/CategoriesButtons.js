import { Button, Card } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectFilterType } from '../filters/filtersSlice';
import { selectAllCategories } from './categoriesSlice';

export default function CategoriesButtons({ onClick, pickedCat }) {
  const type = useSelector(selectFilterType);
  const categories = useSelector(selectAllCategories);
  const visibleCategories = categories.filter((cat) => cat.visibility);

  const categoriesButtons = visibleCategories.map((cat, i) => {
    const selected = pickedCat === cat.id ? 'selectedCategory' : null;
    if (cat.type === type) {
      return (
        <Button
          key={cat.id}
          className={selected}
          component='span'
          sx={{
            color: 'white',
            borderRadius: '0.9rem',
            px: 2,
            py: 0.1,
            m: 0.5,
            bgcolor: cat.color,
            fontSize: 11,
            fontWeight: 600,
            ':hover': { cursor: 'pointer' },
          }}
          onClick={() => onClick(cat.id)}
        >
          {cat.name}
        </Button>
      );
    }
    return null;
  });

  return (
    <Card
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        px: 1,
        py: 2,
        my: 1,
        backgroundImage: (theme) =>
          `linear-gradient(45deg, ${theme.palette.customBg.dark} 50%, ${theme.palette.customBg.light} 50%)`,
      }}
    >
      {categoriesButtons}
    </Card>
  );
}
