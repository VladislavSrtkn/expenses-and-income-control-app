import { Box, Divider, ListItem, ListItemText } from '@mui/material';
import { categoriesChanged, changeCategoryVisibility } from './categoriesSlice';
import { useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';

export default function CategoriesListItem({ category }) {
  const { id, name, color, visibility } = category;
  const dispatch = useDispatch();

  const handleChangeVisibility = (id) => {
    changeCategoryVisibility(id);
    dispatch(categoriesChanged());
  };

  return (
    <>
      <ListItem sx={{ alignItems: 'center' }}>
        <Checkbox
          color='success'
          checked={visibility}
          onChange={() => handleChangeVisibility(id)}
        />

        <ListItemText primary={name} />
        <Box
          component='span'
          sx={{ bgcolor: color, width: '15%', height: '1rem', borderRadius: '0.2rem' }}
        ></Box>
      </ListItem>
      <Divider />
    </>
  );
}
