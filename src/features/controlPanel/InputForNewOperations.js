import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import PaymentsIcon from '@mui/icons-material/Payments';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Button, Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewOperation, operationsChanged } from '../operations/operationsSlice';
import CategoriesButtons from '../categories/CategoriesButtons';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';
import CircularProgress from '@mui/material/CircularProgress';

function validateAmount(amount) {
  if (isNaN(amount) || amount <= 0) {
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

export default function InputForNewOperations() {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.filters.type);

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

  const handlePick = (categoryId) => {
    setCategory(categoryId);
  };
  useEffect(() => setCategory(''), [type]);

  const addNewOpeartion = () => {
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
        <Grid2
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
          columnSpacing={0}
        >
          <CategoriesButtons clickHandler={handlePick} pickedCat={category} />

          <Card
            sx={{
              px: 1,
              mt: 1,
              backgroundImage: 'linear-gradient(330deg, #1c2536 50%, #3a4150 50%)',
            }}
          >
            <Grid2 item display='flex' flexWrap='wrap'>
              <Grid2 item xs={6} sx={{ textAlign: 'left' }}>
                <TextField
                  variant='standard'
                  size='small'
                  label='Amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={amountError}
                  helperText={amountError ? 'Invalid amount' : ' '}
                  sx={{
                    paddingRight: '1rem',
                    input: {
                      color: '#fff',
                    },
                    label: {
                      color: '#dcdcdc',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PaymentsIcon sx={{ color: amountError ? 'red' : '#1876d2' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid2>

              <Grid2 item xs={6} sx={{ textAlign: 'left' }}>
                <MobileDatePicker
                  label='Date'
                  value={operationDate}
                  onChange={(newDate) => {
                    setOperationDate(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      variant='standard'
                      sx={{ label: { color: '#dcdcdc' }, input: { color: '#fff' } }}
                      {...params}
                    />
                  )}
                />
              </Grid2>

              <Grid2 item xs={12} sx={{ textAlign: 'left' }}>
                <TextField
                  fullWidth
                  size='small'
                  variant='standard'
                  label='Comment'
                  value={text}
                  sx={{
                    input: { color: '#fff' },
                    label: {
                      color: '#dcdcdc',
                    },
                  }}
                  onChange={(e) => setText(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CreateIcon sx={{ color: '#1876d2' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid2>

              <Grid2 item xs={6} sx={{ margin: 'auto' }}>
                <Button
                  color='secondary'
                  onClick={addNewOpeartion}
                  variant='contained'
                  sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                  endIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : null}
                >
                  Add
                </Button>
              </Grid2>
            </Grid2>

            <Grid2 item xs={12} sx={{ minHeight: '2.5rem' }}>
              {categoryError && (
                <Typography component='span' sx={{ color: 'red', fontSize: 12 }}>
                  Please choose category
                </Typography>
              )}
            </Grid2>
          </Card>
        </Grid2>
      )}
    </LocalizationProvider>
  );
}
