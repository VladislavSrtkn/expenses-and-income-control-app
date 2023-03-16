import DateFilter from './DateFilter';
import TypeFilter from './TypeFilter';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import InputForNewOperations from './InputForNewOperations';
import MonthlySummary from './MonthlySummary';

export default function ControlPanel() {
  return (
    <Grid2 container rowSpacing={2} textAlign='center' alignContent='center' direction='column'>
      <Grid2 item>
        <DateFilter />
      </Grid2>
      <Grid2 item>
        <MonthlySummary />
      </Grid2>
      <Grid2 item sx={{ width: '100%' }}>
        <TypeFilter />
      </Grid2>
      <Grid2 item>
        <InputForNewOperations />
      </Grid2>
    </Grid2>
  );
}
