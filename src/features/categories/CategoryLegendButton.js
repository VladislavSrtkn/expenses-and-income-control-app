import { Typography } from '@mui/material';

export default function CategoryLegendButton({ category, currencyLabel, clickHandler }) {
  const { name, value, color } = category;

  return (
    <>
      <Typography
        component='span'
        sx={{ bgcolor: color, borderRadius: '0.2rem', px: '0.5rem', height: 'max-content' }}
        onClick={() => clickHandler(name)}
      >
        {name} {value} {currencyLabel}
      </Typography>
    </>
  );
}
