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
          size='small'
          checked={visibility}
          onChange={() => handleChangeVisibility(id)}
        />

        <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }} primary={name} />
        <Box
          component='span'
          sx={{ bgcolor: color, width: '15%', height: '0.5rem', borderRadius: '1rem' }}
        ></Box>
      </ListItem>
      <Divider />
    </>
  );
}
