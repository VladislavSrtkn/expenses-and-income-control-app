import { Divider, ListItem, ListItemText } from '@mui/material';
import { categoriesChanged, changeCategoryVisibility } from './categoriesSlice';
import { useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';

export default function CategoriesListItem({ category }) {
  const { name, color, visibility } = category;
  const dispatch = useDispatch();

  const handleChangeVisibility = (name) => {
    changeCategoryVisibility(name);
    dispatch(categoriesChanged());
  };

  return (
    <>
      <ListItem>
        <Checkbox
          color='success'
          checked={visibility}
          onChange={() => handleChangeVisibility(name)}
        />

        <ListItemText primary={name} />
        <span
          style={{ backgroundColor: color, width: '15%', height: '1rem', borderRadius: '0.2rem' }}
        ></span>
      </ListItem>
      <Divider />
    </>
  );
}
