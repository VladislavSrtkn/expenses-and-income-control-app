import { useState } from 'react';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import PaymentsIcon from '@mui/icons-material/Payments';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { categories } from '../filters/categories';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { operationAdded, saveNewOperation } from '../operations/operationsSlice';

export default function InputForNewOperations() {
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const handleSwitchType = () => (type === 'expense' ? setType('income') : setType('expense'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handlePick = (cat) => {
    setAnchorEl(null);
    setCategory(cat);
  };

  const addNewOpeartion = () => {
    const operationObj = saveNewOperation(text, amount, type, year, month);
    dispatch(operationAdded(operationObj));
    setText('');
    setAmount('');
    setCategory('');
    setType('expense');
  };

  const categoryOptions = categories.map((category, i) => (
    <MenuItem key={i} onClick={() => handlePick(category)}>
      {category}
    </MenuItem>
  ));

  return (
    <Grid2 container direction='row' alignItems='center' justifyContent='center' columnSpacing={1}>
      <Grid2 item>
        <TextField
          variant='standard'
          label='Comment'
          sx={{ maxWidth: '12rem' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          helperText={2 === 3 ? 'Please enter a comment' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CreateIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid2>
      <Grid2 item>
        <TextField
          variant='standard'
          label='Amount'
          sx={{ maxWidth: '6rem' }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          helperText={2 === 3 ? 'Please enter an amount' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PaymentsIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid2>
      <Grid2 item>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ display: 'inline-block', textTransform: 'none' }}
        >
          Category
          <div
            className={category}
            style={{
              width: '100%',
              height: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.3em',
            }}
          >
            <span style={{ color: '#fff' }}>{category}</span>
          </div>
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {categoryOptions}
        </Menu>
      </Grid2>

      <Grid2 item display='flex' alignItems='center'>
        <Switch onChange={handleSwitchType} />
        <label>{type}</label>
        <IconButton color='success' onClick={addNewOpeartion}>
          <AddCircleIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}
