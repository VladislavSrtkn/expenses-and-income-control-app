import {
  Alert,
  Box,
  Button,
  Card,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import { HexColorPicker } from 'react-colorful';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkIsNameInvalid } from '../features/validation/validation';
import {
  createNewCategory,
  categoriesChanged,
  selectAllCategories,
} from '../features/categories/categoriesSlice';

export default function CategoriesCreation() {
  const [type, setType] = useState('expense');
  const [color, setColor] = useState('#485edd');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const categories = useSelector(selectAllCategories);
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
    setSnackBarOpen(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const cardStyle = {
    my: 3,
    py: 3,
    px: 1,
    backgroundImage: (theme) =>
      `linear-gradient(168deg, ${theme.palette.customBg.dark} 65%, ${theme.palette.customBg.light} 50%)`,
  };

  const toggleBtnStyle = {
    p: 0.3,
    fontWeight: 600,
    border: 0,
    color: 'text.primary',
    '&.Mui-selected': { color: 'primary.main' },
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Card sx={cardStyle}>
        <Typography sx={{ fontWeight: 600 }}>Choose a type</Typography>
        <ToggleButtonGroup
          fullWidth
          size='small'
          value={type}
          sx={{
            bgcolor: 'customBg.dark',
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
        sx={{
          ...cardStyle,
          backgroundImage: (theme) =>
            `linear-gradient(168deg, ${theme.palette.customBg.light} 65%, ${theme.palette.customBg.dark} 50%)`,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Enter the name</Typography>
        <TextField
          variant='standard'
          size='small'
          value={name}
          label='Name'
          sx={{ label: { fontSize: 14 } }}
          fullWidth
          error={Boolean(nameError)}
          helperText={nameError ? nameError.toString() : ' '}
          onChange={(e) => handleNameChange(e)}
        />
      </Card>

      <Card sx={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600 }}>Pick a color</Typography>
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
    </Box>
  );
}
