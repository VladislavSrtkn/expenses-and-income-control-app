import { Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useDispatch } from 'react-redux';
import { createNewCategory, categoriesChanged } from '../features/categories/categoriesSlice';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function validateName(name) {
  if (name === '' || name.length > 20) {
    return false;
  }
  return true;
}

export default function CategoriesCreation() {
  const [type, setType] = useState('expense');
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsCreated(false);
    const trimmedName = name.trim();
    if (!validateName(trimmedName)) {
      setNameError(true);
      return;
    }

    createNewCategory(trimmedName, color, type);
    dispatch(categoriesChanged());
    setName('');
    setIsCreated(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  return (
    <Grid2
      container
      alignContent='center'
      textAlign='center'
      direction='column'
      rowSpacing={2}
      md={3}
      xs={10}
      margin='auto'
    >
      <h4>Create your own categories!</h4>
      <Grid2 item>
        <Typography py={3}>Choose a type:</Typography>
        <ToggleButtonGroup color='primary' value={type} onChange={(e) => setType(e.target.value)}>
          <ToggleButton value='expense'>expense</ToggleButton>
          <ToggleButton value='income'>income</ToggleButton>
        </ToggleButtonGroup>
      </Grid2>

      <Grid2 item xs={12} sx={{ minHeight: '10rem' }}>
        <Typography py={3}>Choose a name :</Typography>
        <TextField
          variant='standard'
          value={name}
          label='Name'
          fullWidth
          error={nameError}
          helperText={nameError ? 'Please enter a name (max 20 characters)' : ''}
          onChange={(e) => handleNameChange(e)}
        />
      </Grid2>

      <Grid2 item display='flex' flexDirection='column' alignItems='center'>
        <Typography py={3}>Pick a color:</Typography>
        <HexColorPicker color={color} onChange={setColor} />
        <Button
          variant='outlined'
          sx={{ marginY: '2rem' }}
          endIcon={<PlaylistAddCheckIcon />}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Grid2>

      {isCreated && (
        <Typography sx={{ borderRadius: '0.3rem', p: 1, mb: 3, bgcolor: '#4eaf3d', color: '#fff' }}>
          You have successfully added a new category!
        </Typography>
      )}
    </Grid2>
  );
}
