import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function LimitsPage() {
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  const style = {
    width: '50%',
    p: 0.3,
    fontWeight: 600,
    border: 0,
    color: '#fff',
    '&.Mui-selected': { color: '#1876d2' },
  };

  return (
    <Grid2 container flexDirection='column' textAlign='center'>
      <Grid2 item>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={currentPage}
          exclusive
          onChange={(e) => navigate(e.target.value)}
          aria-label="Operation's status"
          sx={{ width: '100%', bgcolor: '#1c2536de', boxShadow: (theme) => theme.shadows[5] }}
        >
          <ToggleButton value='' onClick={(e) => setCurrentPage(e.target.value)} sx={style}>
            Limits
          </ToggleButton>
          <ToggleButton value='manage' onClick={(e) => setCurrentPage(e.target.value)} sx={style}>
            Manage
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>

      <Outlet />
    </Grid2>
  );
}
