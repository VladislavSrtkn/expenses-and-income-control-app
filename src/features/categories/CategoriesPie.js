import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoryLegendButton from './CategoryLegendButton';
import { useState } from 'react';
import OperationShortItem from '../operations/OperationShortItem';
import { List } from '@mui/material';

function addSumForCategories(year, month, type, operations, categories) {
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

  return categoriesCopy;
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

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;
  const operations = useSelector((state) => Object.values(state.operations.entities));
  const categories = useSelector((state) => state.categories.entities);
  const currencyLabel = useSelector((state) => state.filters.currency.label);

  const noOperationsText =
    operationsType === 'expense'
      ? 'No expenses data for this month'
      : 'No income data for this month';

  const categoriesWithAmount = addSumForCategories(
    year,
    month,
    operationsType,
    operations,
    categories
  );

  const data = Object.values(categoriesWithAmount)
    .filter((cat) => cat.value)
    .sort((a, b) => b.value - a.value);

  const cells = data.map((cat) => (
    <Cell
      visibility={cat}
      onClick={() => handleSwitchPickedCat(cat.id)}
      key={cat.id}
      fill={cat.color}
    />
  ));

  const legend = data.map((cat) => (
    <CategoryLegendButton
      key={cat.id}
      category={cat}
      currencyLabel={currencyLabel}
      clickHandler={handleSwitchPickedCat}
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

  return (
    <Grid2 item display='flex' flexDirection='column' alignItems='center'>
      {Boolean(data.length) && (
        <>
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

          <Grid2 item display='flex' gap={1} flexWrap='wrap' sx={{ marginY: '1.5rem' }}>
            {legend}
          </Grid2>
          <Grid2 item sx={{ width: '100%' }}>
            <List>{listInput}</List>
          </Grid2>
        </>
      )}
      {!data.length && <p>{noOperationsText}</p>}
    </Grid2>
  );
}
