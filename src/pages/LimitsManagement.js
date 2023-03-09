import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
  Button,
  FormHelperText,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategoryLimit } from '../features/categories/categoriesSlice';
import { categoriesChanged } from '../features/categories/categoriesSlice';

function validateLimit(limit) {
  if (limit <= 0) {
    return false;
  }
  return true;
}

function validateCategory(category) {
  if (category === '') {
    return false;
  }
  return true;
}

export default function LimitsManagement() {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [limit, setLimit] = useState('');
  const [limitError, setLimitError] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const currencyLabel = useSelector((state) => state.filters.currency.label);

  const categories = useSelector((state) => state.categories.entities);
  const filteredCategories = Object.values(categories).filter((cat) => cat.type === 'expense');

  const categoryOptions = filteredCategories.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.name}
    </MenuItem>
  ));

  const showRemoveButton = Boolean(categories[category]?.limit);

  const handleSetLimit = () => {
    if (!validateCategory(category)) {
      setCategoryError(true);
      return;
    }
    if (!validateLimit(limit)) {
      setLimitError(true);
      return;
    }

    changeCategoryLimit(category, Number(limit).toFixed(2));
    dispatch(categoriesChanged());
    setCategory('');
    setLimit('');
    setMessage('The limit has been successfully set!');
    setsnackBarOpen(true);
  };

  const handleChangeCategory = (e) => {
    setCategoryError(false);
    const category = e.target.value;
    setCategory(category);
    setLimit(categories[category].limit);
  };

  const handleChangeLimit = (e) => {
    setLimitError(false);
    setLimit(e.target.value);
  };

  const handleRemoveLimit = () => {
    changeCategoryLimit(category, 0);
    dispatch(categoriesChanged());
    setCategory('');
    setLimit('');
    setMessage('The limit has been successfully removed!');
    setsnackBarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  return (
    <Grid2 container flexDirection='column' rowSpacing={3} columnSpacing={1} alignItems='center'>
      <Grid2 item>
        <Typography component={'h3'} sx={{ py: 3 }}>
          Create or change your limits!
        </Typography>
      </Grid2>

      <Grid2 item xs={7}>
        <FormControl fullWidth error={categoryError}>
          <InputLabel htmlFor='category-select'>Category</InputLabel>
          <Select
            id='category-select'
            value={category}
            label='Category'
            onChange={handleChangeCategory}
          >
            {categoryOptions}
          </Select>
          <FormHelperText>{categoryError ? 'Select category' : ' '}</FormHelperText>
        </FormControl>
      </Grid2>
      <Grid2 item xs={7}>
        <FormControl fullWidth error={limitError}>
          <InputLabel htmlFor='limit'>Limit</InputLabel>
          <OutlinedInput
            id='limit'
            type='number'
            label='Limit'
            value={limit}
            error={limitError}
            startAdornment={<InputAdornment position='start'>{currencyLabel}</InputAdornment>}
            onChange={handleChangeLimit}
          />
          <FormHelperText>{limitError ? 'Invalid amount' : ' '}</FormHelperText>
        </FormControl>
      </Grid2>
      <Grid2 item xs={5}>
        <Button variant='contained' size='large' onClick={handleSetLimit}>
          Set limit
        </Button>
      </Grid2>
      {showRemoveButton && (
        <Grid2 item xs={5}>
          <Button variant='contained' size='large' onClick={handleRemoveLimit}>
            Remove
          </Button>
        </Grid2>
      )}
      <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid2>
  );
}
