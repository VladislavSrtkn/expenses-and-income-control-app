import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DateFilter from '../features/header/DateFilter';
import LimitsList from '../features/limits/LimitsList';

export default function LimitsStatistics() {
  return (
    <Grid2 container flexDirection='column' rowSpacing={3} columnSpacing={1} alignItems='center'>
      <Typography component='h3' py='1rem' mt='1rem' fontWeight='bold'>
        Limits Statistics
      </Typography>
      <Grid2 item sx={{ width: '100%' }}>
        <DateFilter />
        <LimitsList />
      </Grid2>
    </Grid2>
  );
}
