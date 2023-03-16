import { useSelector } from 'react-redux';
import { Button, Card } from '@mui/material';

export default function CategoriesButtons({ clickHandler, pickedCat }) {
  const type = useSelector((state) => state.filters.type);
  const categories = useSelector((state) => state.categories.entities);
  const visibleCategories = Object.values(categories).filter((cat) => cat.visibility);

  const categoriesButtons = visibleCategories.map((cat, i) => {
    const selected = pickedCat === cat.id ? 'selectedCategory' : null;
    if (cat.type === type) {
      return (
        <Button
          key={cat.id}
          className={selected}
          component='span'
          sx={{
            color: '#fff',
            borderRadius: '0.9rem',
            px: 2,
            py: 0.1,
            m: 0.5,
            bgcolor: cat.color,
            fontSize: 11,
            fontWeight: 600,
            ':hover': { cursor: 'pointer' },
          }}
          onClick={() => clickHandler(cat.id)}
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
        backgroundImage: 'linear-gradient(45deg, #1c2536 50%, #3a4150 50%)',
      }}
    >
      {categoriesButtons}
    </Card>
  );
}
