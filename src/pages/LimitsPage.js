import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function LimitsPage() {
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  const style = {
    p: 0.3,
    fontWeight: 600,
    border: 0,
    color: 'text.primary',
    '&.Mui-selected': { color: 'primary.main' },
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <ToggleButtonGroup
        color='primary'
        size='small'
        value={currentPage}
        fullWidth
        exclusive
        onChange={(e) => navigate(e.target.value)}
        sx={{ bgcolor: 'customBg.dark', boxShadow: (theme) => theme.shadows[5] }}
      >
        <ToggleButton value='' onClick={(e) => setCurrentPage(e.target.value)} sx={style}>
          Limits
        </ToggleButton>
        <ToggleButton value='manage' onClick={(e) => setCurrentPage(e.target.value)} sx={style}>
          Manage
        </ToggleButton>
      </ToggleButtonGroup>

      <Outlet />
    </Box>
  );
}
