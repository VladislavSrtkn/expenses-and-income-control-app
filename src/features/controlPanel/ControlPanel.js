import { Box } from '@mui/material';

import DateFilter from './DateFilter';
import TypeFilter from './TypeFilter';
import InputForNewOperations from './InputForNewOperations';
import MonthlySummary from './MonthlySummary';

export default function ControlPanel() {
  return (
    <Box sx={{ gap: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DateFilter />
      <MonthlySummary />
      <TypeFilter />
      <InputForNewOperations />
    </Box>
  );
}
