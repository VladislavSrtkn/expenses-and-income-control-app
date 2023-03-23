import { Box, Typography } from '@mui/material';

import DateFilter from '../features/controlPanel/DateFilter';
import LimitsList from '../features/limits/LimitsList';

export default function LimitsStatistics() {
  return (
    <Box>
      <Typography component='h3' sx={{ mt: 5, fontWeight: 600, color: 'primary.main' }}>
        Limits Statistics
      </Typography>
      <DateFilter />
      <LimitsList />
    </Box>
  );
}
