import {
  Alert,
  Button,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useDispatch, useSelector } from 'react-redux';
import { createNewCategory, categoriesChanged } from '../features/categories/categoriesSlice';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function checkIsNameInvalid(input, names) {
  if (input === '' || input.length > 20) {
    return 'Please enter a name (max 20 characters)';
  }
  if (names.includes(input)) {
    return 'A category with this name already exists';
  }
  return false;
}

export default function CategoriesCreation() {
  const [type, setType] = useState('expense');
  const [color, setColor] = useState('#485edd');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const categories = useSelector((state) => Object.values(state.categories.entities));
  const categoriesNames = categories.map((cat) => cat.name);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (checkIsNameInvalid(trimmedName, categoriesNames)) {
      setNameError(checkIsNameInvalid(trimmedName, categoriesNames));
      return;
    }

    createNewCategory(trimmedName, color, type);
    dispatch(categoriesChanged());
    setName('');
    setsnackBarOpen(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  return (
    <Grid2 container alignContent='center' textAlign='center' direction='column' rowSpacing={2}>
      <Typography component={'h4'} fontWeight='bold'>
        Create your own categories!
      </Typography>
      <Grid2 item>
        <Typography py={2}>1. Choose a type:</Typography>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <ToggleButton sx={{ py: 0, px: 2 }} value='expense'>
            expense
          </ToggleButton>
          <ToggleButton sx={{ py: 0, px: 2 }} value='income'>
            income
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>

      <Grid2 item sx={{ minHeight: '10rem', width: '100%' }}>
        <Typography py={2}>2. Enter name :</Typography>
        <TextField
          variant='standard'
          size='small'
          value={name}
          label='Name'
          fullWidth
          error={Boolean(nameError)}
          helperText={nameError ? nameError.toString() : null}
          onChange={(e) => handleNameChange(e)}
        />
      </Grid2>

      <Grid2 item display='flex' flexDirection='column' alignItems='center'>
        <Typography py={2}>3. Pick a color:</Typography>
        <HexColorPicker color={color} onChange={setColor} />
        <Button
          variant='contained'
          sx={{ marginY: '2rem' }}
          endIcon={<PlaylistAddCheckIcon />}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Grid2>

      <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Category has been successfully created!
        </Alert>
      </Snackbar>
    </Grid2>
  );
}
