import { Button } from '@mui/material';

export default function CategoryLegendButton({ category, currencyLabel, onClick, className }) {
  const { id, name, value, color } = category;

  return (
    <>
      <Button
        component='span'
        className={className}
        sx={{
          bgcolor: color,
          borderRadius: '0.9rem',
          px: 2,
          py: 0.3,
          m: 0.3,
          height: 'max-content',
          fontSize: 11,
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
          ':hover': {
            bgcolor: color,
          },
        }}
        onClick={() => onClick(id)}
      >
        {name} {value} {currencyLabel}
      </Button>
    </>
  );
}
