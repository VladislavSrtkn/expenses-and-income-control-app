import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import LimitsListItem from './LimitsListItem';

export default function LimitsList() {
  const categories = useSelector((state) => Object.values(state.categories.entities));
  const categoriesWithLimits = categories.filter((cat) => cat.limit > 0);

  const input = categoriesWithLimits.map((cat, index) => (
    <LimitsListItem key={cat.id} item={cat} isOpen={Boolean(!index)} />
  ));

  return <List sx={{ my: '2rem' }}>{input}</List>;
}
