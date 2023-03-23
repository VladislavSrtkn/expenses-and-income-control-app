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
import { Box } from '@mui/system';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { validateAmount, validateCategory } from '../features/validation/validation';
import { changeCategoryLimit } from '../features/categories/categoriesSlice';
import { categoriesChanged } from '../features/categories/categoriesSlice';
import { selectFilterCurrencyLabel } from '../features/filters/filtersSlice';

export default function LimitsManagement() {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [limit, setLimit] = useState('');
  const [limitError, setLimitError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const currencyLabel = useSelector(selectFilterCurrencyLabel);

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
    if (!validateAmount(limit)) {
      setLimitError(true);
      return;
    }

    changeCategoryLimit(category, Number(limit).toFixed(2));
    dispatch(categoriesChanged());
    setCategory('');
    setLimit('');
    setMessage('The limit has been successfully set!');
    setSnackBarOpen(true);
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
    setSnackBarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          p: 3,
          my: 4,
          backgroundImage: (theme) =>
            `linear-gradient(166deg, ${theme.palette.customBg.light} 90px, ${theme.palette.customBg.dark} 90px)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            rowGap: 2,
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <FormControl error={categoryError}>
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

          <FormControl error={limitError}>
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button variant='contained' size='large' onClick={handleSetLimit}>
            Set limit
          </Button>

          {showRemoveButton && (
            <Button variant='contained' size='large' onClick={handleRemoveLimit}>
              Remove
            </Button>
          )}
        </Box>
      </Card>

      <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
