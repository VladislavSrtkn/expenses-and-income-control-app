import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import LimitsListItem from './LimitsListItem';

export default function LimitsList() {
  const categories = useSelector((state) => Object.values(state.categories.categories));
  const categoriesWithLimits = categories.filter((cat) => cat.limit > 0);

  const input = categoriesWithLimits.map((cat, i) => (
    <LimitsListItem key={cat.name} item={cat} isOpen={Boolean(!i)} />
  ));

  return <List sx={{ my: '2rem' }}>{input}</List>;
}
