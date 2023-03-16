import {
  Alert,
  Button,
  Card,
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

  const toggleBtnStyle = {
    width: '50%',
    p: 0.3,
    fontWeight: 600,
    border: 0,
    color: '#fff !important',
    '&.Mui-selected': { color: '#1876d2 !important' },
  };

  const cardStyle = {
    my: 2,
    py: 3,
    px: 1,
    color: '#dcdcdc',
    bgcolor: '#1c2536',
    width: '100%',
    backgroundImage: 'linear-gradient(168deg, #1c2536 65%, #3a4150 50%)',
  };

  return (
    <Grid2 container alignContent='center' textAlign='center' direction='column' rowSpacing={2}>
      <Card sx={cardStyle}>
        <Typography sx={{ fontWeight: 600 }}>Choose a type:</Typography>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={type}
          sx={{
            bgcolor: '#1c2536de',
            width: '100%',
            mt: 1,
            boxShadow: (theme) => theme.shadows[5],
          }}
          onChange={(e) => setType(e.target.value)}
        >
          <ToggleButton sx={toggleBtnStyle} value='expense'>
            expense
          </ToggleButton>
          <ToggleButton sx={toggleBtnStyle} value='income'>
            income
          </ToggleButton>
        </ToggleButtonGroup>
      </Card>

      <Card
        sx={{ ...cardStyle, backgroundImage: 'linear-gradient(168deg, #3a4150 65%, #1c2536 50%)' }}
      >
        <Typography sx={{ fontWeight: 600 }}>Enter name :</Typography>
        <TextField
          variant='standard'
          size='small'
          value={name}
          label='Name'
          sx={{ label: { color: '#dcdcdc', fontSize: 14 }, input: { color: '#fff' } }}
          fullWidth
          error={Boolean(nameError)}
          helperText={nameError ? nameError.toString() : ' '}
          onChange={(e) => handleNameChange(e)}
        />
      </Card>

      <Card sx={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600 }}>Pick a color:</Typography>
        <HexColorPicker
          style={{
            width: '80%',
            marginTop: '0.8rem',
            boxShadow: '9px -9px 0px 0px #3a404f',
            borderRadius: '9px',
          }}
          color={color}
          onChange={setColor}
        />
      </Card>

      <Button
        variant='contained'
        color='secondary'
        sx={{ marginY: '2rem', maxWidth: '8rem', alignSelf: 'center' }}
        endIcon={<PlaylistAddCheckIcon />}
        onClick={handleSubmit}
      >
        Add
      </Button>

      <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
          Category has been successfully created!
        </Alert>
      </Snackbar>
    </Grid2>
  );
}
