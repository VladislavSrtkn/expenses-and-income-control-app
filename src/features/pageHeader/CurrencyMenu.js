import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencies } from '../filters/currencies';
import { currencyChanged } from '../filters/filtersSlice';

export default function CurrencyMenu() {
  const currentCurrency = useSelector((state) => state.filters.currency);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handlePick = (currency) => {
    dispatch(currencyChanged(currency));
    setAnchorEl(null);
  };

  const currenciesList = Object.values(currencies).map((currency) => {
    if (currency.name !== currentCurrency.name) {
      const uppercaseName = currency.name.toUpperCase();
      return (
        <MenuItem key={currency.name} onClick={() => handlePick(currency)}>
          {uppercaseName}
        </MenuItem>
      );
    }
    return undefined;
  });

  return (
    <div>
      <Button
        id='currency-button'
        aria-controls={open ? 'currency-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: '#fff' }}
      >
        {currentCurrency.name}
      </Button>
      <Menu
        id='currency-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {currenciesList}
      </Menu>
    </div>
  );
}
