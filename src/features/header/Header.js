import DateFilter from './DateFilter';
import StatusFilter from './SatusFilter';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import InputForNewOperations from './InputForNewOperations';

export default function Header() {
  return (
    <Grid2 container alignContent='center' textAlign='center' direction='column' rowSpacing={2}>
      <Grid2 item>
        <DateFilter />
      </Grid2>
      <Grid2 item>
        <StatusFilter />
      </Grid2>
      <Grid2 item>
        <InputForNewOperations />
      </Grid2>
    </Grid2>
  );
}
