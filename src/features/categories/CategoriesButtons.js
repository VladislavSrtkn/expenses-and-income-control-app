import { Box } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSelector } from 'react-redux';

export default function CategoriesButtons({ clickHandler, pickedCat }) {
  const type = useSelector((state) => state.filters.type);
  const categories = useSelector((state) => state.categories.entities);
  const visibleCategories = Object.values(categories).filter((cat) => cat.visibility);

  const categoriesButtons = visibleCategories.map((cat, i) => {
    const selected = pickedCat === cat.id ? 'selectedCategory' : null;
    if (cat.type === type) {
      return (
        <Box
          key={cat.id}
          className={selected}
          component='span'
          sx={{
            opacity: 0.7,
            color: '#fff',
            borderRadius: '0.9rem',
            px: 2,
            py: 0.3,
            m: 0.4,
            bgcolor: cat.color,
            fontSize: '0.8rem',
            ':hover': { cursor: 'pointer' },
          }}
          onClick={() => clickHandler(cat.id)}
        >
          {cat.name}
        </Box>
      );
    }
    return null;
  });

  return (
    <Grid2 item display='flex' flexWrap='wrap' justifyContent='flex-start'>
      {categoriesButtons}
    </Grid2>
  );
}
