import { Box } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useSelector } from 'react-redux';

export default function CategoriesButtons({ clickHandler, pickedCat }) {
  const type = useSelector((state) => state.filters.type);
  const categories = useSelector((state) => state.categories.categories);

  const categoriesButtons = Object.values(categories).map((cat, i) => {
    const selected = pickedCat === cat.name ? 'selectedCategory' : null;
    if (cat.type === type) {
      return (
        <Box
          key={i}
          className={selected}
          component='span'
          sx={{
            color: '#fff',
            padding: '0.4em',
            minWidth: 'initial',
            borderRadius: '0.2em',
            margin: '0.2em',
            bgcolor: cat.color,
            ':hover': { cursor: 'pointer' },
          }}
          onClick={() => clickHandler(cat.name)}
        >
          {cat.name}
        </Box>
      );
    }
    return null;
  });

  return (
    <Grid2 item display='flex' flexWrap='wrap' justifyContent='flex-start' xs={12}>
      {categoriesButtons}
    </Grid2>
  );
}