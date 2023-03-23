import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, Button, Card, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { saveNewOperation, operationsChanged } from '../operations/operationsSlice';
import { validateAmount, validateCategory } from '../validation/validation';
import CategoriesButtons from '../categories/CategoriesButtons';
import { selectFilterType } from '../filters/filtersSlice';

export default function InputForNewOperations() {
  const dispatch = useDispatch();
  const type = useSelector(selectFilterType);

  const [loading, setLoading] = useState(false);

  const [operationDate, setOperationDate] = useState(new Date());
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => setAmountError(false), 2000);
    return () => clearTimeout(timerId);
  }, [amountError]);

  const [categoryError, setCategoryError] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => setCategoryError(false), 2000);
    return () => clearTimeout(timerId);
  }, [categoryError]);

  useEffect(() => setCategory(''), [type]);

  const handleAddNewOpeartion = () => {
    if (!validateAmount(amount)) {
      setAmountError(true);
      return;
    }
    if (!validateCategory(category)) {
      setCategoryError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const fixedAmount = Number(amount).toFixed(2);
      const year = operationDate.getFullYear();
      const month = operationDate.getMonth();
      const date = operationDate.getDate();

      saveNewOperation(text, fixedAmount, type, category, year, month, date);
      dispatch(operationsChanged());
      setText('');
      setAmount('');
      setCategory('');
      setLoading(false);
    }, 1000);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {type !== 'all' && (
        <Box sx={{ width: '100%' }}>
          <CategoriesButtons onClick={setCategory} pickedCat={category} />

          <Card
            sx={{
              p: 2,
              mt: 3,
              backgroundImage: (theme) =>
                `linear-gradient(330deg, ${theme.palette.customBg.dark} 50%, ${theme.palette.customBg.light} 50%)`,
            }}
          >
            <Box sx={{ display: 'flex', rowGap: 2, flexDirection: 'column', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  variant='standard'
                  size='small'
                  type='tel'
                  label='Amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={amountError}
                  helperText={amountError ? 'Invalid amount' : ' '}
                  sx={{
                    width: '50%',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PaymentsIcon sx={{ color: amountError ? 'error.main' : 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <MobileDatePicker
                  label='Date'
                  value={operationDate}
                  onChange={(newDate) => {
                    setOperationDate(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField size='small' variant='standard' sx={{ width: '50%' }} {...params} />
                  )}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  size='small'
                  variant='standard'
                  label='Comment'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CreateIcon sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Button
                  onClick={handleAddNewOpeartion}
                  variant='contained'
                  size='medium'
                  sx={{
                    flex: 0,
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                  endIcon={
                    loading ? <CircularProgress size={20} sx={{ color: 'text.primary' }} /> : null
                  }
                >
                  Add
                </Button>
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center', minHeight: '1.5rem' }}>
              {categoryError && (
                <Typography component='span' sx={{ color: 'error.main', fontSize: 12 }}>
                  Please choose category
                </Typography>
              )}
            </Box>
          </Card>
        </Box>
      )}
    </LocalizationProvider>
  );
}
