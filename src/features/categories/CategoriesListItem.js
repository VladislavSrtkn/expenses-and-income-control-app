import { Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { categoriesChanged, deleteCategory } from './categoriesSlice';
import { useDispatch } from 'react-redux';

export default function CategoriesListItem({ category }) {
  const { name, color } = category;
  const dispatch = useDispatch();

  const handleDelete = (name) => {
    deleteCategory(name);
    dispatch(categoriesChanged());
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={name} />
        <span
          style={{ backgroundColor: color, width: '15%', height: '1rem', borderRadius: '0.2rem' }}
        ></span>
        <IconButton color='default' onClick={() => handleDelete(name)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
}
