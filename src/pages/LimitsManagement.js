import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
  Button,
  FormHelperText,
  Snackbar,
  Alert,
  Card,
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
      <Card
        sx={{
          width: '100%',
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(160deg, #3a4150 90px, #1c2536 90px)',
        }}
      >
        <Grid2 item xs={7} sx={{ mt: 2 }}>
          <FormControl fullWidth error={categoryError}>
            <InputLabel sx={{ color: '#dcdcdc' }} htmlFor='category-select'>
              Category
            </InputLabel>
            <Select
              id='category-select'
              value={category}
              label='Category'
              sx={{
                '& .MuiOutlinedInput-input': { color: '#fff' },
                '& fieldset': {
                  borderColor: '#dcdcdc',
                },
                '& svg': {
                  color: '#dcdcdc',
                },
              }}
              onChange={handleChangeCategory}
            >
              {categoryOptions}
            </Select>
            <FormHelperText>{categoryError ? 'Select category' : ' '}</FormHelperText>
          </FormControl>
        </Grid2>

        <Grid2 item xs={7}>
          <FormControl fullWidth error={limitError}>
            <InputLabel sx={{ color: '#dcdcdc' }} htmlFor='limit'>
              Limit
            </InputLabel>
            <OutlinedInput
              id='limit'
              type='number'
              label='Limit'
              value={limit}
              error={limitError}
              sx={{
                '& .MuiOutlinedInput-input': { color: '#fff' },
                '& fieldset': {
                  borderColor: '#dcdcdc',
                },
              }}
              startAdornment={
                <InputAdornment
                  sx={{ '& .MuiTypography-root': { color: '#1976d2' } }}
                  position='start'
                >
                  {currencyLabel}
                </InputAdornment>
              }
              onChange={handleChangeLimit}
            />
            <FormHelperText>{limitError ? 'Invalid amount' : ' '}</FormHelperText>
          </FormControl>
        </Grid2>

        <Grid2 item xs={5}>
          <Button variant='contained' color='secondary' size='large' onClick={handleSetLimit}>
            Set limit
          </Button>
        </Grid2>
        {showRemoveButton && (
          <Grid2 item xs={5}>
            <Button variant='contained' size='large' onClick={handleRemoveLimit} color='secondary'>
              Remove
            </Button>
          </Grid2>
        )}
      </Card>

      <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </Grid2>
  );
}
