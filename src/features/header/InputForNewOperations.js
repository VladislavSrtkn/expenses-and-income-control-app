import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import PaymentsIcon from '@mui/icons-material/Payments';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { operationAdded, saveNewOperation } from '../operations/operationsSlice';
import CategoriesButtons from './CategoriesButtons';

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
  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

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

  const handlePick = (category) => {
    setCategory(category);
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
    const fixedAmount = Number(amount).toFixed(2);
    const operationObj = saveNewOperation(text, fixedAmount, type, category, year, month);
    dispatch(operationAdded(operationObj));
    setText('');
    setAmount('');
    setCategory('');
  };

  return (
    type !== 'all' && (
      <Grid2
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        columnSpacing={0}
      >
        <CategoriesButtons clickHandler={handlePick} pickedCat={category} />

        <Grid2 item display='flex'>
          <Grid2 item xs={5}>
            <TextField
              variant='standard'
              label='Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={amountError}
              helperText={amountError ? 'Invalid amount' : ''}
              sx={{ paddingRight: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PaymentsIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
          <Grid2 item xs={6}>
            <TextField
              variant='standard'
              label='Comment'
              value={text}
              onChange={(e) => setText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CreateIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 item xs={1}>
            <IconButton
              color='success'
              onClick={addNewOpeartion}
              sx={{ paddingX: 0, paddingTop: '1rem' }}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid2>
        </Grid2>
        <Grid2 item xs={12} sx={{ minHeight: '2.2rem' }}>
          {categoryError && <span style={{ color: 'red' }}>Please choose category</span>}
        </Grid2>
      </Grid2>
    )
  );
}
