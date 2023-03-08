import { Box } from '@mui/material';

export default function CategoryLegendButton({ category, currencyLabel, clickHandler }) {
  const { id, name, value, color } = category;

  return (
    <>
      <Box
        component='span'
        sx={{
          bgcolor: color,
          borderRadius: '0.9rem',
          px: 2,
          py: 0.3,
          m: 0.3,
          height: 'max-content',
          fontSize: '0.8rem',
          cursor: 'pointer',
        }}
        onClick={() => clickHandler(id)}
      >
        {name} {value} {currencyLabel}
      </Box>
    </>
  );
}
