import { Box, Card, List, Typography } from '@mui/material';

import { PieChart, Pie, Cell } from 'recharts';

import { useSelector } from 'react-redux';
import { useState } from 'react';

import CategoryLegendButton from './CategoryLegendButton';
import OperationShortItem from '../operations/OperationShortItem';
import { selectAllOperations } from '../operations/operationsSlice';
import { selectFilterCurrencyLabel, selectFilterDate } from '../filters/filtersSlice';

function addAmountForCategories(year, month, type, operations, categories) {
  const categoriesCopy = { ...categories };

  operations.forEach((operation) => {
    if (operation.type === type && operation.year === year && operation.month === month) {
      const category = operation.category;
      const amount = +operation.amount;

      categoriesCopy[category] = {
        ...categoriesCopy[category],
        value: categoriesCopy[category].value ? (categoriesCopy[category].value += amount) : amount,
      };
    }
  });
  return Object.values(categoriesCopy);
}

export default function CategoriesPie({ operationsType }) {
  const [pickedCat, setPickedCat] = useState(null);

  const handleSwitchPickedCat = (catId) => {
    if (catId === pickedCat) {
      setPickedCat(null);
      return;
    }

    setPickedCat(catId);
  };

  const filterDate = useSelector(selectFilterDate);
  const { year, month } = filterDate;
  const operations = useSelector(selectAllOperations);
  const categories = useSelector((state) => state.categories.entities);
  const currencyLabel = useSelector(selectFilterCurrencyLabel);

  const noOperationsText =
    operationsType === 'expense'
      ? 'No expenses data for this month'
      : 'No income data for this month';

  const categoriesWithAmount = addAmountForCategories(
    year,
    month,
    operationsType,
    operations,
    categories
  );

  const data = categoriesWithAmount.filter((cat) => cat.value).sort((a, b) => b.value - a.value);

  const cells = data.map((cat) => (
    <Cell
      visibility={cat}
      onClick={() => handleSwitchPickedCat(cat.id)}
      key={cat.id}
      fill={cat.color}
      stroke={null}
    />
  ));

  const legend = data.map((cat) => (
    <CategoryLegendButton
      className={cat.id === pickedCat ? 'selectedCategory' : null}
      key={cat.id}
      category={cat}
      currencyLabel={currencyLabel}
      onClick={handleSwitchPickedCat}
    />
  ));

  const operationsWithSelectedCat = operations
    .filter((operation) => {
      const matchedCat = pickedCat === operation.category;
      const matchedYear = year === operation.year;
      const matchedMonth = month === operation.month;

      return matchedCat && matchedYear && matchedMonth;
    })
    .sort((a, b) => (a.date >= b.date ? -1 : 1));

  const listInput = operationsWithSelectedCat.map((operation) => (
    <OperationShortItem key={operation.id} operation={operation} currency={currencyLabel} />
  ));

  if (!data.length) {
    return <Typography sx={{ fontSize: 14 }}>{noOperationsText}</Typography>;
  }

  return (
    <Card
      sx={{
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: (theme) =>
          `linear-gradient(158deg, ${theme.palette.customBg.light} 200px, ${theme.palette.customBg.dark} 200px)`,
      }}
    >
      <PieChart width={280} height={200}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
          nameKey='name'
          labelLine={false}
        >
          {cells}
        </Pie>
      </PieChart>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginY: '1.5rem' }}>{legend}</Box>
      <List sx={{ width: '100%' }}>{listInput}</List>
    </Card>
  );
}
