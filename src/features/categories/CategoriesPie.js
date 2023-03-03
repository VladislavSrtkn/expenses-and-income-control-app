import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CategoryLegendButton from './CategoryLegendButton';
import { useState } from 'react';
import OperationsList from '../operations/OperationsList';
import { Box } from '@mui/system';

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

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;
  const operations = useSelector((state) => Object.values(state.operations.entities));
  const categories = useSelector((state) => state.categories.categories);
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

  const cells = data.map((cat, index) => (
    <Cell onClick={() => setPickedCat(cat.name)} key={index} fill={cat.color} />
  ));

  const legend = data.map((cat, index) => (
    <CategoryLegendButton
      key={index}
      category={cat}
      currencyLabel={currencyLabel}
      clickHandler={setPickedCat}
    />
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
          <OperationsList />
        </>
      )}
      {!data.length && <p>{noOperationsText}</p>}
    </Grid2>
  );
}
