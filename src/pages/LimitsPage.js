import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function LimitsPage() {
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  return (
    <Grid2 container flexDirection='column' xs={10} md={3} margin='auto' textAlign='center'>
      <Grid2 item>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={currentPage}
          exclusive
          onChange={(e) => navigate(e.target.value)}
          aria-label="Operation's status"
          sx={{ width: '-webkit-fill-available' }}
        >
          <ToggleButton
            value=''
            onClick={(e) => setCurrentPage(e.target.value)}
            sx={{ flex: 1, py: 0 }}
          >
            Limits
          </ToggleButton>
          <ToggleButton
            value='manage'
            onClick={(e) => setCurrentPage(e.target.value)}
            sx={{ flex: 1, py: 0 }}
          >
            Manage
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>

      <Outlet />
    </Grid2>
  );
}
