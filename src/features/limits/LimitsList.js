import { List } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectAllCategories } from '../categories/categoriesSlice';

import LimitsListItem from './LimitsListItem';

export default function LimitsList() {
  const categories = useSelector(selectAllCategories);
  const categoriesWithLimits = categories.filter((cat) => cat.limit > 0);

  const limits = categoriesWithLimits.map((cat, index) => (
    <LimitsListItem key={cat.id} item={cat} />
  ));

  return <List sx={{ my: '2rem' }}>{limits}</List>;
}
